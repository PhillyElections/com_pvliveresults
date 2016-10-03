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

        $electionOfficeModel = $this->getModel('electionoffice');
        $voteModel           = $this->getModel('vote');

        $cids = JRequest::getVar('cid', 0, '', 'array');

        foreach ($cids as $cid) {
            // reset model properties (loop reset) and get by election_id
            $electionOfficeModel->_data  = null;
            $electionOfficeModel->_where = ' `election_id` = ' . $cid . ' ';
            $electionOffices             = $electionOfficeModel->getData();

            foreach ($electionOffices as $electionOffice) {
                // delete votes
                d('hey, i\'m deleting votes');

                $voteModel->deleteByFk($electionOffice->id);
            }

            // votes are gone, lets delete the EO link
            d('votes are gone, let\'s delete the EO link');
            $electionOfficeModel->deleteByFk($cid);

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
        $editLink = "index.php?option=com_pvliveresults&controller=election&task=edit&cid[]=";
        $baseLink = "index.php?option=com_pvliveresults";

        // let's get our 'name' models
        $candidateModel  = $this->getModel('candidate');
        $candidatesIndex = $candidateModel->getIdAssocByName();

        $electionModel  = $this->getModel('election');
        $electionsIndex = $electionModel->getIdAssocByName();
        $electionModel->bumpOrdering();
        $created = $electionModel->getNow();

        $officeModel  = $this->getModel('office');
        $officesIndex = $officeModel->getIdAssocByName();

        $partyModel  = $this->getModel('party');
        $partiesIndex = $partyeModel->getIdAssocByName();

        $votetypeModel  = $this->getModel('votetype');
        $votetypesIndex = $votetypeModel->getIdAssocByName();
        $votetypes = array('A'=>'ABSENTEE', 'M'=>'MACHINE', 'P'=>'PROVISIONAL');

        $voteModel  = $this->getModel('vote');
        //$votesIndex = $voteModel->getVoteEOid();

        // shape and save election data
        $post = JRequest::get('post');

        $data            = array();
        $data['name']    = $post['name'];
        $data['date']    = $post['date'];
        $data['created'] = $created;

        // capure the id as you s ave
        $electionId = $electionModel->store($data);
        $electionModel->squinchOrdering();

        // verify we have an upload
        if (!$_FILES['results_file']) {
            // no file.  No need to go on.  Warn the user
            return $this->setRedirect($editLink . $electionId, 'No file uploaded. You might want to delete this election and start over');
        }

        // since we have an upload, we need to make sure JFile is available
        jimport('joomla.fiesystem.file');
        $oldFileName = JString::strtolower($_FILES['results_file']['name']);
        $newFileName = JString::str_ireplace(" ", "_", JString::strtolower(JFile::makeSafe($post['name']))) . ".csv";

        $uploads = JPATH_COMPONENT . DS . 'uploads';
        $src     = $_FILES['results_file']['tmp_name'];
        $dest    = $uploads . DS . $oldFileName;

        $excludeHeader = isset($post['exclude_header']) ? true : false;

        if (!JFile::upload($src, $dest)) {
            // failed file.  No need to go on.  Warn the user
            return $this->setRedirect($editLink . $electionId, 'Failed file uploaded. You might want to delete this election and start over');
        }

        // since the copy was completed, we need to make sure we have time to process the file
        ini_set('max_execution_time', 360);

        $path_parts = pathinfo($dest);
        // if this is one of the extensions JArchive handles, lets extract it
        if (in_array($path_parts['extension'], array('zip', 'tar', 'tgz', 'gz', 'gzip', 'bz2', 'bzip2', 'tbz2'))) {
            // we have an archive.  pull in JArchive to handle it
            jimport('joomla.filesystem.archive');

            // when unzipping a 50MB text file, you take up a crapload of memory
            ini_set('memory_limit', '200M');
            JArchive::extract($dest, $path_parts['dirname']);
            // drop the archive now
            @unlink($dest);
            // reset the filename
            $dest = $uploads . DS . $path_parts['filename'] . ".txt";
        }

        $insert      = '';
        $counter     = 0;
        if (!$inputFile   = fopen($dest, 'r')) {
            return $this->setRedirect($baseLink, 'unable to open file!');
        }
        $storagePath = JPATH_SITE . DS . 'files' . DS . 'raw-data' . DS;
        $outputFile  = fopen($path_site . $newFileName, 'w');

        // detect delimiter
        $line  = fgets($inputFile);
        $delim = ','; // default
        // 7 column import
        // [0]ward    [1]division    [2]type    [3]office  [4]candidate   [5]party   [6]votes

        if (count(str_getcsv($line, '@')) > 1) {
            $delim = "@"; // option 2
            // 8 column import
            // Precinct_Name@Office/Prop Name@Tape_Text@Vote_Count@Last_Name@First_Name@Middle_Name@Party_Name@
            // [0]Precinct_Name   [1]Office/Prop Name   [2]Tape_Text   [3]Vote_Count   [4]Last_Name   [5]First_Name   [6]Middle_Name   [7]Party_Name
        }

        // do we have a header row?
        if ($excludeHeader) {
            //lets drop that first row
            $arr = str_getcsv($line, $delim);
            fputcsv($outputFile, $arr);
        }
        $msg = ""; // make sure we start with an empty msg
        while (($line = fgets($inputFile)) !== false) {
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
            //dd($arr);
            $ward = (int)$arr[0];
            $division = (int)$arr[1];
            $votetypeId = ($votetypesIndex[$votetypes[$arr[2]]]) ? $votetypesIndex[$votetypes[$arr[2]]] : $votetypesIndex['MACHINE'];
            $office = $arr[3];
            $candidate = $arr[4];
            $partyId = (int)$partiesIndex[$arr[5]];
            // is the office new? write it, index it, an save the id
            if ($officeId = $officesIndex[$office]) {
                // no more work needed
            } else {
                // wite new office, capturing id
                $officeId = $officeModel->store(
                    array(
                        'created'=>$created,
                        'name'=>$office,
                        'published'=>1
                    )
                );
                // index new office
                array_push($officesIndex, array($office=>$officeId));
            }

            // is the candidate new? write it, index it, and save the id
            if ($candidateId = $candidatesIndex[$candidate]) {
                // no more work needed
            } else {
                $candidateId = $candidateModel->store(
                    array(
                        'created'=>$created,
                        'name'=>$candidate,
                        'published'=>1,
                        'party_id'=>$partyId
                    )
                );
                array_push($candidatesIndex, array($candidate=>$candidateId));
            }

            // record the election_office link and save the id

            // record the votes

            $insert .= '("' . $arr[3] . '", ' . (int) $arr[0] . ', ' . (int) $arr[1] . ', "' . $arr[2] . '", "' . $arr[4] . '", "' . $arr[5] . '", ' . (int) $arr[6] . ', "' . $e_year . '", NOW()),';
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
            }
        }

        // catch the leftovers
        if ($counter) {
            $insert            = rtrim($insert, ',');
            $bulk_insert_array = $insertStart . $insert;
            $insert            = '';
            try {
                $model->bulk_insert($bulk_insert_array);
            } catch (Exception $e) {
                sd($e, $insert);
            }
        }

        fclose($handle);
        fclose($inputFile);
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

        @unlink($pathAndName);
        $msg .= JText::_('Data Saved');
        $link = 'index.php?option=com_ballotboxapp&controller=ballotboxapp&task=edit&cid[]=' . $electionId;

        $this->setRedirect($link, $msg);
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

        $electionOffice = $this->getModel('electionoffice');
        $electionOffice->publish($cid);

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election');
    }

    public function unpublish()
    {
        JRequest::checkToken() or jexit('Invalid Token');
        dd('need work here', JRequest::get());

        $electionOffice = $this->getModel('electionoffice');
        $cid            = JRequest::getVar('cid');

        $electionOffice->unpublish($cid, '');

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election');
    }
}
