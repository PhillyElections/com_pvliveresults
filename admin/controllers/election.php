<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Election Controller.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsControllerElection extends PvliveresultsController
{
    /**
     * constructor (registers additional tasks to methods).
     */
    public function __construct()
    {
        parent::__construct();

        // Register Extra tasks
        $this->registerTask('add', 'edit');
    }

    /**
     * display the edit form.
     */
    public function edit()
    {
        $view = $this->getView('election', 'html');
        $view->setModel($this->getModel('election'), true);
        //JRequest::setVar('hidemainmenu', 1);

        $view->display();
    }

    /**
     * delete the election.
     */
    public function delete()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $electionofficeModel = $this->getModel('electionoffice');
        $voteModel           = $this->getModel('vote');

        $cids = JRequest::getVar('cid', 0, '', 'array');

        foreach ($cids as $cid) {
            // reset model properties (loop reset) and get by election_id
            $electionofficeModel->_data  = null;
            $electionofficeModel->_where = ' `election_id` = ' . $cid . ' ';
            $electionoffices             = $electionofficeModel->getData();

            foreach ($electionoffices as $electionoffice) {
                // delete votes
                d('hey, i\'m deleting votes');

                $voteModel->deleteByFk($electionoffice->id);
            }

            // votes are gone, lets delete the EO link
            d('votes are gone, let\'s delete the EO link');
            $electionofficeModel->deleteByFk($cid);

            // delete election
            d('hey, i\'m deleting the election');
            $election = $this->getModel('election');
            $election->delete(array($cid));

            // we do not delete candidates, offices, parties, or votetypes -- all the bindings are in 'votes', so there's no reason
        }
    }

    public function save()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $t=array();
        array_push($t, microtime(1));
        $editLink = "index.php?option=com_pvliveresults&controller=election&task=edit&cid[]=";
        $baseLink = "index.php?option=com_pvliveresults";

        $oldFileName = $_FILES['results_file']['name'];
        $newFileName = JString::str_ireplace(" ", "_", JString::strtolower(JFile::makeSafe($post['name']))) . ".csv";

        $uploads = JPATH_COMPONENT . DS . 'uploads';
        $src     = $_FILES['results_file']['tmp_name'];
        $dest    = $uploads . DS . $oldFileName;

        $excludeHeader = isset($post['exclude_header']) ? true : false;

        if (!($move = move_uploaded_file($src, $dest))) {
            // failed file.  No need to go on.  Warn the user
            return $this->setRedirect($editLink . $electionId, 'Failed file uploaded. You might want to delete this election and start over');
        }

        // since the copy was completed, we need to make sure we have time to process the file
        ini_set('memory_limit', '200M');
        ini_set('max_execution_time', 360);

        $path_parts = pathinfo($dest);
        // if this is one of the extensions JArchive handles, lets extract it
        if (in_array($path_parts['extension'], array('zip', 'tar', 'tgz', 'gz', 'gzip', 'bz2', 'bzip2', 'tbz2'))) {
            // we have an archive.  pull in JArchive to handle it
            jimport('joomla.filesystem.archive');

            // when unzipping a 50MB text file, you take up a crapload of memory
            $extracted = JArchive::extract($dest, $path_parts['dirname']);
            // drop the archive now
            //@unlink($dest);
            // reset the filename
            $dest = $uploads . DS . strtolower($path_parts['filename']);
            
            if ($path_parts['extension'] === 'zip') {
                $dest = $uploads . DS . $path_parts['filename'] . ".txt";
            }
        }

        if (!$inputFile = fopen($dest, 'r')) {
            dd($path_parts, $extracted, $dest);
            return $this->setRedirect($baseLink, 'unable to open file!');
        }

        $storagePath = JPATH_SITE . DS . 'files' . DS . 'raw-data';
        $outputFile  = fopen($storagePath . DS . $newFileName, 'w');

        $delimChecked = false;
        $delim = ','; // default
        // 7 column import
        // [0]ward    [1]division    [2]type    [3]office  [4]candidate   [5]party   [6]votes

        $line = fgets($inputFile);

        if (count(str_getcsv($line, '@')) > 1) {
            $delim = "@"; // option 2
            // 8 column import
            // Precinct_Name@Office/Prop Name@Tape_Text@Vote_Count@Last_Name@First_Name@Middle_Name@Party_Name@
            // [0]Precinct_Name   [1]Office/Prop Name   [2]Tape_Text   [3]Vote_Count   [4]Last_Name   [5]First_Name   [6]Middle_Name   [7]Party_Name
        }
        fclose($outputFile);
        fclose($inputFile);

        $ignore = "";
        if ($excludeHeader) {
//            $ignore = 1;
            $ignore = "    IGNORE 1 LINES \n";
        }

        switch ($delim) {
            case "@":
                $sFields = "ward_division,office,candidate,votes,lname,fname,mname,party";
                $fields = " (ward_division, office, candidate, votes, lname, fname, mname, party) ";
                break;
            default:
                $sFields = "ward,division,type,office,candidate,party,votes";
                $fields = " (ward, division, type, office, candidate, party, votes) ";
                break;
        }

        array_push($t, microtime(1));
        d('before loadfile ', $t[count($t)-1]-$t[count($t)-2]);
        $db = &JFactory::getDBO();

        $db->setQuery("ALTER TABLE #__pv_live_import DISABLE KEYS");
        $db->query();
        move_uploaded_file($dest, $uploads . DS . "jos_pv_live_import.txt");
        $file = $uploads . DS . "jos_pv_live_import.txt";

        $config =JFactory::getConfig();
        $host = $config->getValue('config.host');
        $user = $config->getValue('config.user');
        $pass = $config->getValue('config.password');

/*        $loadFile = "LOAD DATA LOCAL INFILE '$dest' ";
        $loadFile .= "INTO TABLE `#__pv_live_import` ";
        $loadFile .= "FIELDS TERMINATED BY '$delim' ";
        $loadFile .= "OPTIONALLY ENCLOSED BY '\"' ";
        $loadFile .= "LINES TERMINATED BY '\\r\\n' ";
        $loadFile .= "$ignore ";
        $loadFile .= "$fields ";*/

        $command = <<<EOD
mysqlimport \
  --local \ 
  --compress \ 
  --user=$user \ 
  --password=$pass \ 
  --host=$host \ 
  --fields-terminated-by=',' \
  --fields-optionally-enclosed-by='"' \
  --columns='$sFields' \  
  '$file'
EOD;

        $return = system($command);

        $lastInsertId = $db->insertid();

        $db->setQuery($loadFile);
        $db->query();

        // transform data if needed here

        $db->setQuery("ALTER TABLE #_pv_live_import ENABLE KEYS");
        $db->query();

        array_push($t, microtime(1));
        d('loadfile ', $t[count($t)-1]-$t[count($t)-2], $loadFile);

        array_push($t, microtime(1));
        //d('indexFile ', $t[count($t)-1]-$t[count($t)-2], $indexTable, $inputFile, $outputFile);
        dd($config, $user, $command, $return, $lastInsertId, $path_parts, $t, $_FILES, $extracted);
        $arr = str_getcsv($line, $delim);

        // get rid of any articulated quotes witing array elements
        foreach ($arr as $key => $value) {
            $arr[$key] = str_replace('"', '', $value);
            $arr[$key] = trim($value);
        }

        $ward = (int)$arr[0];
        $division = (int)$arr[1];
        $votetypeId = ($votetypesIndex[$votetypes[$arr[2]]]) ? $votetypesIndex[$votetypes[$arr[2]]] : $votetypesIndex['MACHINE'];
        $office = $arr[3];
        $candidate = $arr[4];
        $party = JString::strtoupper(JString::trim($arr[5]));
        $votes = (int)$arr[6];

        $partyId = (int)$partiesIndex[$party];
        // is the office new? write it, index it, an save the id
        if ($partyId) {
        } else {
            // wite new office, capturing id
            $partyId = $partyModel->store(
                array(
                    'name'=>$party,
                    'published'=>1,
                    'created'=>$created,
                )
            );
            // index new office
            $partyIndex[$party] = $partyId;
        }

        $officeId = (int)$officesIndex[$office];
        // is the office new? write it, index it, an save the id
        if ($officeId) {
        } else {
            // wite new office, capturing id
            $officeId = $officeModel->store(
                array(
                    'name'=>$office,
                    'published'=>1,
                    'created'=>$created,
                )
            );
            // index new office
            $officesIndex[$office] = $officeId;
        }

        $candidateId = (int)$candidatesIndex[$candidate];
        // is the candidate new? write it, index it, and save the id
        if ($candidateId) {
        } else {
            $candidateId = $candidateModel->store(
                array(
                    'name'=>$candidate,
                    'published'=>1,
                    'party_id'=>$partyId,
                    'created'=>$created,
                )
            );
            $candidatesIndex[$candidate] = $candidateId;
        }

        $electionofficeId = $electionofficesIndex[$electionId][$officeId];
        // record the election_office link and save the id
        // is the candidate new? write it, index it, and save the id
        if ($electionofficeId) {
        } else {
            $electionofficeId = $electionofficeModel->store(
                array(
                    'election_id'=>$electionId,
                    'office_id'=>$officeId,
                    'published'=>0,
                    'created'=>$created,
                )
            );
            if (!is_array($electionofficesIndex[$electionId])) {
                $electionofficesIndex[$electionId] = array();
            }
            $electionofficesIndex[$electionId][$officeId] = (int)$electionofficeId;
        }

        fclose($outputFile);
        fclose($inputFile);

        @unlink($dest);
        $msg .= JText::_('Data Saved');
        return $this->setRedirect($editLink . $electionId, $msg);
    }

    public function save2()
    {

        $t=array();
        array_push($t, microtime(1));
        JRequest::checkToken() or jexit('Invalid Token');
        $editLink = "index.php?option=com_pvliveresults&controller=election&task=edit&cid[]=";
        $baseLink = "index.php?option=com_pvliveresults";
        $insertFields = "INSERT INTO #__pv_live_votes (`vote_type_id`, `election_office_id`, `candidate_id`, `ward`, `division`, `votes`, `published`, `created`) VALUES ";
        $insertValues = '';
        $limit = 100;

        // Let's make sure they're all arrays upfront
        foreach (array('electionsIndex', 'candidatesIndex', 'electionofficesIndex', 'officesIndex', 'partiesIndex', 'votetypesIndex', 'votesIndex') as $index) {
            if (!is_array($$index)) {
                $$index = array();
            }
        }

        // let's get our 'name' models
        $candidateModel  = $this->getModel('candidate');
        $candidatesIndex = $candidateModel->getIdAssocByName();

        $electionModel  = $this->getModel('election');
        $electionsIndex = $electionModel->getIdAssocByName();

        $electionofficeModel  = $this->getModel('electionoffice');

        $officeModel  = $this->getModel('office');
        $officesIndex = $officeModel->getIdAssocByName();

        $partyModel  = $this->getModel('party');
        $partiesIndex = $partyModel->getIdAssocByName();

        $votetypeModel  = $this->getModel('votetype');
        $votetypesIndex = $votetypeModel->getIdAssocByName();
        $votetypes = array('A'=>'ABSENTEE', 'M'=>'MACHINE', 'P'=>'PROVISIONAL');

        $voteModel  = $this->getModel('vote');

        // let's set a common 'created' for any new rows
        $created = $electionModel->getNow();

        $post = JRequest::get('post');
        $data = array();
        $data['name'] = $post['name'];
        $data['date'] = $post['date'];

        if (isset($electionsIndex[$post['name']])) {
            $electionId = $electionsIndex[$post['name']];
            $data['updated'] = $created;
            $data['id'] = (int)$electionId;
            // update
            $electionModel->store($data);
        } else {
            // shape and save election data
            $data['created'] = $created;

            // new row to the top: make room
            $electionModel->bumpOrdering();

            // capure the id as you s ave
            $electionId = $electionModel->store($data);
            $electionModel->squinchOrdering();
        }

        // now that we have an electionId, we can get an eoIndex
        $electionofficesIndex = $electionofficeModel->getIdAssocByKeys($electionId);

        $electionofficeIds = '';
        foreach ($electionofficesIndex as $e => $os) {
            foreach ($os as $o => $eo) {
                $electionofficeIds .= "$eo,";
            }
        }
        $electionofficeIds = count($electionofficeIds) ? trim($electionofficeIds, ',') : false;

        // now that we have all current eoIds, we can pull a votes index
        if ($electionofficeIds) {
            $votesIndex = $voteModel->getIdAssocByKeys($electionofficeIds);
        }

        // verify we have an upload
        if (!$_FILES['results_file']) {
            // no file.  No need to go on.  Warn the user
            return $this->setRedirect($editLink . $electionId, 'No file uploaded. You might want to delete this election and start over');
        }

        // since we have an upload, we need to make sure JFile is available
        jimport('joomla.fiesystem.file');
        $oldFileName = $_FILES['results_file']['name'];
        $newFileName = JString::str_ireplace(" ", "_", JString::strtolower(JFile::makeSafe($post['name']))) . ".csv";

        $uploads = JPATH_COMPONENT . DS . 'uploads';
        $src     = $_FILES['results_file']['tmp_name'];
        $dest    = $uploads . DS . $oldFileName;

        $excludeHeader = isset($post['exclude_header']) ? true : false;

        if (!($move = move_uploaded_file($src, $dest))) {
            // failed file.  No need to go on.  Warn the user
            dd($pathinfo($src), $_FILES);
            return $this->setRedirect($editLink . $electionId, 'Failed file transfer. You might want to delete this election and start over.');
        }

        // since the copy was completed, we need to make sure we have time to process the file
        ini_set('memory_limit', '200M');
        ini_set('max_execution_time', 360);

        $path_parts = pathinfo($dest);
        // if this is one of the extensions JArchive handles, lets extract it
        if (in_array($path_parts['extension'], array('zip', 'tar', 'tgz', 'gz', 'gzip', 'bz2', 'bzip2', 'tbz2'))) {
            // we have an archive.  pull in JArchive to handle it
            jimport('joomla.filesystem.archive');

            // when unzipping a 50MB text file, you take up a crapload of memory
            JArchive::extract($dest, $path_parts['dirname']);
            // drop the archive now
            @unlink($dest);
            // reset the filename
            $dest = $uploads . DS . $path_parts['filename'] . ".txt";
        }

        $insertRows      = '';
        $counter     = 0;
        if (!$inputFile = fopen($dest, 'r')) {
            return $this->setRedirect($baseLink, 'unable to open file!');
        }

        $storagePath = JPATH_SITE . DS . 'files' . DS . 'raw-data' . DS;
        $outputFile  = fopen($path_site . $newFileName, 'w');

        $delimChecked = false;
        $delim = ','; // default
        // 7 column import
        // [0]ward    [1]division    [2]type    [3]office  [4]candidate   [5]party   [6]votes

        $msg = ""; // make sure we start with an empty msg
        while (($line = fgets($inputFile)) !== false) {
            // do we have a header row?
            if ($excludeHeader) {
                $excludeHeader = false;
                //lets drop that first row
                $arr = str_getcsv($line, $delim);
                fputcsv($outputFile, $arr);
                continue;
            }

            if (!$delimChecked) {
                $delimChecked = true;
                if (count(str_getcsv($line, '@')) > 1) {
                    $delim = "@"; // option 2
                    // 8 column import
                    // Precinct_Name@Office/Prop Name@Tape_Text@Vote_Count@Last_Name@First_Name@Middle_Name@Party_Name@
                    // [0]Precinct_Name   [1]Office/Prop Name   [2]Tape_Text   [3]Vote_Count   [4]Last_Name   [5]First_Name   [6]Middle_Name   [7]Party_Name
                }
            }

            // is the office new? write it
            // capture the id
            // write the office_election link
            // is the

            $arr = str_getcsv($line, $delim);
            fputcsv($outputFile, $arr);

            // if the line is blank or unparsable, note it and skip to the next
            if (count($arr) === 1) {
                $msg .= 'Note, the following line was not processed: ' . $line . "\n";
                continue;
            }

            // get rid of any articulated quotes witing array elements
            foreach ($arr as $key => $value) {
                $arr[$key] = str_replace('"', '', $value);
                $arr[$key] = trim($value);
            }

            $ward = (int)$arr[0];
            $division = (int)$arr[1];
            $votetypeId = ($votetypesIndex[$votetypes[$arr[2]]]) ? $votetypesIndex[$votetypes[$arr[2]]] : $votetypesIndex['MACHINE'];
            $office = $arr[3];
            $candidate = $arr[4];
            $party = JString::strtoupper(JString::trim($arr[5]));
            $votes = (int)$arr[6];

            $partyId = (int)$partiesIndex[$party];
            // is the office new? write it, index it, an save the id
            if ($partyId) {
            } else {
                // wite new office, capturing id
                $partyId = $partyModel->store(
                    array(
                        'name'=>$party,
                        'published'=>1,
                        'created'=>$created,
                    )
                );
                // index new office
                $partyIndex[$party] = $partyId;
            }

            $officeId = (int)$officesIndex[$office];
            // is the office new? write it, index it, an save the id
            if ($officeId) {
            } else {
                // wite new office, capturing id
                $officeId = $officeModel->store(
                    array(
                        'name'=>$office,
                        'published'=>1,
                        'created'=>$created,
                    )
                );
                // index new office
                $officesIndex[$office] = $officeId;
            }

            $candidateId = (int)$candidatesIndex[$candidate];
            // is the candidate new? write it, index it, and save the id
            if ($candidateId) {
            } else {
                $candidateId = $candidateModel->store(
                    array(
                        'name'=>$candidate,
                        'published'=>1,
                        'party_id'=>$partyId,
                        'created'=>$created,
                    )
                );

                $candidatesIndex[$candidate] = $candidateId;
            }

            $electionofficeId = $electionofficesIndex[$electionId][$officeId];
            // record the election_office link and save the id
            // is the candidate new? write it, index it, and save the id
            if ($electionofficeId) {
            } else {
                $electionofficeId = $electionofficeModel->store(
                    array(
                        'election_id'=>$electionId,
                        'office_id'=>$officeId,
                        'published'=>0,
                        'created'=>$created,
                    )
                );
                if (!is_array($electionofficesIndex[$electionId])) {
                    $electionofficesIndex[$electionId] = array();
                }
                $electionofficesIndex[$electionId][$officeId] = (int)$electionofficeId;
            }

            // record the votes
            // is the vote entity new? write it, but don't index
            // if not, update
/*            if (isset($votesIndex[$votetypeId][$electionofficeId][$candidateId][$ward][$division])) {
                $voteId = $votesIndex[$votetypeId][$electionofficeId][$candidateId][$ward][$division]['id'];
                if ( (int)$votesIndex[$votetypeId][$electionofficeId][$candidateId][$ward][$division]['votes'] === (int)$votes ) {
                    // votes match, do nothing
                } else {
                    $voteModel->store(
                        array(
                            'id'=>$voteId,
                            'votes'=>$votes,
                            'updated'=>$created,
                        )
                    );
                }
                $updateQueries .= " UPDATE #__jos_live_votes"
                d('update', $voteId, array('id'=>$voteId, 'votes'=>$votes, 'updated'=>$created,));
            } else {*/
/*                $voteModel->store(
                    array(
                        'vote_type_id'=>$votetypeId,
                        'election_office_id'=>$electionofficeId,
                        'candidate_id'=>$candidateId,
                        'ward'=>$ward,
                        'division'=>$division,
                        'votes'=>$votes,
                        'published'=>1,
                        'created'=>$created,
                    )
                );*/
                // INSERT INTO #__pv_live_votes (`vote_type_id`, `election_office_id`, `candidate_id`, `ward`, `division`, `votes`, `published`, `created`) VALUES

/*                $insertValues .= " ($votetypeId, $electionofficeId, $candidateId, $ward, $division, $votes, 1, '$created') ";
                $insertRows++;

                if ($insertRows >= $limit) {
                    $this->_db->setQuery($insertFields . $insertValues);
                    $this->_db->query();
                    $insertRows = 0;
                } else {
                    $insertValues .= ', ';
                }
            }*/


//        dd('1', $msg, $candidatesIndex, $electionsIndex, $officesIndex, $electionofficesIndex, $partiesIndex, $votesIndex, $votetypesIndex);

            // record the votes

/*            $insert .= '("' . $arr[3] . '", ' . (int) $arr[0] . ', ' . (int) $arr[1] . ', "' . $arr[2] . '", "' . $arr[4] . '", "' . $arr[5] . '", ' . (int) $arr[6] . ', "' . $e_year . '", NOW()),';
            ++$counter;
            if ($counter > 1000) {
                $insert            = rtrim($insert, ',');
                $bulk_insert_array = $insertStart . $insert;
                $insert            = '';
                try {
                    $model->bulk_insert($bulk_insert_array);
                } catch (Exception $e) {
                    sd($e, $insert);
                }
                $counter = 0;
            }*/
        }

/*        if ($insertRows) {
            $this->_db->setQuery($insertFields . $insertValues);
            $this->_db->query();
        }*/
        // catch the leftovers
/*        if ($counter) {
            $insert            = rtrim($insert, ',');
            $bulk_insert_array = $insertStart . $insert;
            $insert            = '';
            try {
                $model->bulk_insert($bulk_insert_array);
            } catch (Exception $e) {
                sd($e, $insert);
            }
        }*/

        fclose($outputFile);
        fclose($inputFile);

        @unlink($dest);
        $msg .= JText::_('Data Saved');
        return $this->setRedirect($editLink . $electionId, $msg);
    }

    /**
     * save a record (and redirect to main page).
     */
    public function save1()
    {
/*        JRequest::checkToken() or jexit('Invalid Token');
// having timeout issues 2015.11.17
ini_set('max_execution_time', 360);
$e_year = JRequest::getVar('e_year');
$exclude_header = isset($_POST['header']) ? true : false;
$move_file = strtolower(str_replace(' ', '_', $e_year));
$move_file = preg_replace('/[^A-Za-z0-9\-]/', '_', $move_file).'.csv';
$model = $this->getModel('ballotboxapp');
$insertStart = 'INSERT into #__rt_cold_data (`office`,`ward`,`division`,`vote_type`,`name`,`party`,`votes`,`e_year`,`date_created`) VALUES ';

$path = JPATH_COMPONENT.DS.'uploads'.DS;
$fileName = $_FILES['fileToUpload']['name'];
$fileTmpLoc = $_FILES['fileToUpload']['tmp_name'];

// Path and file name
$pathAndName = $path.$fileName;
// Run the move_uploaded_file() function here
$moveResult = move_uploaded_file($fileTmpLoc, $pathAndName);
// Evaluate the value returned from the function if needed
if ($moveResult) {
$path_parts = pathinfo($pathAndName);
// if this is one of the extensions JArchive handles, lets extract it
if (in_array($path_parts['extension'], array('zip','tar','tgz','gz','gzip','bz2','bzip2','tbz2'))) {
// when unzipping a 50MB text file, you take up a crapload of memory
ini_set('memory_limit', '200M');
JArchive::extract($pathAndName, $path_parts['dirname']);
// drop the archive now
@unlink($pathAndName);
// reset the filename
$pathAndName=$path.$path_parts['filename'].".txt";
}

$insert = '';
$counter = 0;
$myfile = fopen($pathAndName, 'r') or die('update_election_nameble to open file!');
$path_site = JPATH_SITE.DS.'files'.DS.'raw-data'.DS;
$handle = fopen($path_site.$move_file, 'w');

if ($exclude_header) {
//lets drop that first row
$arr = str_getcsv(fgets($myfile));
fputcsv($handle, $arr);
}

// Output one line until end-of-file
while (($line = fgets($myfile)) !== false) {
$arr = str_getcsv($line);
fputcsv($handle, $arr);
// if the line is blank or unparsable...
if (count($arr) === 1) {
$msg .= 'Note, the following line was not processed: '.$line."\n";
continue;
}
foreach ($arr as $a_key => $a_value) {
$arr[$a_key] = str_replace('"', '', $a_value);
$arr[$a_key] = trim($a_value);
}
$insert .= '("'.$arr[3].'", '.(int) $arr[0].', '.(int) $arr[1].', "'.$arr[2].'", "'.$arr[4].'", "'.$arr[5].'", '.(int) $arr[6].', "'.$e_year.'", NOW()),';
++$counter;
if ($counter > 1000) {
$insert = rtrim($insert, ',');
$bulk_insert_array = $insertStart.$insert;
$insert = '';
try {
$model->bulk_insert($bulk_insert_array);
} catch (Exception $e) {
sd($e, $insert);
}
$counter = 0;
}
}

// catch the leftovers
if ($counter) {
$insert = rtrim($insert, ',');
$bulk_insert_array = $insertStart.$insert;
$insert = '';
try {
$model->bulk_insert($bulk_insert_array);
} catch (Exception $e) {
sd($e, $insert);
}
}

fclose($handle);
fclose($myfile);
if ($e_year) {
try {
$year_id = $model->insert_year($e_year);
} catch (Exception $e) {
sd($e, $model, $e_year);
}
try {
$office = $model->insert_office($e_year, $year_id);
} catch (Exception $e) {
sd($e, $model, $e_year);
}
}

/* $str = implode(",",$bulk_insert_array);
echo $str;die;
@unlink($pathAndName);
$msg .= JText::_('Data Saved');
$link = 'index.php?option=com_ballotboxapp&controller=ballotboxapp&task=edit&cid[]='.$year_id;
} else {
//echo "ERROR: File not moved correctly";
$link = 'index.php?option=com_ballotboxapp';
$msg .= JText::_('ERROR: File not moved correctly');
}

// Check the table in so it can be edited.... we are done with it anyway

$this->setRedirect($link, $msg);
 */
    }

    public function update()
    {
    }

    public function saveStep2()
    {
        JRequest::checkToken() or jexit('Invalid Token');
        // having timeout issues 2015.11.17
        ini_set('max_execution_time', 360);

        $election_year_id = JRequest::getVar('id');
        $ids              = JRequest::getVar('office_id');
        $publish          = JRequest::getVar('office_publish');
        $name             = JRequest::getVar('office_name');
        $order            = JRequest::getVar('publish_order');
        $election_name    = JRequest::getVar('election_name');
        $election_date    = JRequest::getVar('election_date');
        $model            = $this->getModel('Liveresult');
        if (JRequest::getVar('deleted')) {
            $model->delete_election($election_year_id);
            $model->delete_related($ids);
            $msg = JText::_('Record Deleted.');
        } else {
            $active_office    = array();
            $in_active_office = array();

            $model->update_election_name($election_name, $election_year_id, $election_date);

            //First Delete all wards and divisions from tables and then reinsert them. As it will save time and easy peasy task performance boost will occur by doing this.
            $model->delete_related($ids);

            $in_id = array();
            foreach ($ids as $id => $value) {
                if ($publish[$id]) {
                    $active_office[$id] = $name[$id];
                    $model->update_office($order[$id], $id);
                    $model->insert_office_ward($ids[$id], $name[$id], $election_year_id);
                } else {
                    $in_active_office[$id] = $name[$id];
                    $in_id[]               = $id;
                    $model->update_office($order[$id], $id);
                }
            }
            //$model->bulk_insert($bulk_insert_array);
            $msg = JText::_('Data Saved');
        }
        $link = 'index.php?option=com_pvliveresults';
        $this->setRedirect($link, $msg);
    }

    /**
     * remove record(s).
     */
    public function remove()
    {
        $model = $this->getModel('election');
        if (!$model->delete()) {
            $msg = JText::_('Error: One or More Greetings Could not be Deleted');
        } else {
            $msg = JText::_('Greeting(s) Deleted');
        }

        $this->setRedirect('index.php?option=com_pvliveresults', $msg);
    }

    /**
     * cancel editing a record.
     */
    public function cancel()
    {
        $msg = JText::_('Operation Cancelled');
        $this->setRedirect('index.php?option=com_pvliveresults', $msg);
    }

    public function publish()
    {
        JRequest::checkToken() or jexit('Invalid Token');
        dd('need work here', JRequest::get());

        $cid = JRequest::getVar('cid');

        $electionofficeModel = $this->getModel('electionoffice');
        $electionofficeModel->publish($cid);

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election');
    }

    public function unpublish()
    {
        JRequest::checkToken() or jexit('Invalid Token');
        dd('need work here', JRequest::get());

        $cid            = JRequest::getVar('cid');

        $electionofficeModel = $this->getModel('electionoffice');
        $electionofficeModel->unpublish($cid, '');

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election');
    }
}
