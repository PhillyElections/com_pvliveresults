<?php
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Election Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelElection extends PvliveresultsModel
{
    /**
     * data array
     * @var array
     */
    //public $_data;

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * Pagination object
     * @var object
     */
    public $_pagination;

    /**
     * actual table name
     * @var string
     */
    public $_table = '#__pv_live_elections';

    /**
     * table class name ref
     * @var string
     */
    public $_tableRef = 'election';

    /**
     * Items total
     * @var integer
     */
    public $_total;

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_where = '';

    public function __construct()
    {
        parent::__construct();

        $mainframe = JFactory::getApplication();

        // Get pagination request variables
        $limit      = $mainframe->getUserStateFromRequest('global.list.limit', 'limit', $mainframe->getCfg('list_limit'), 'int');
        $limitstart = JRequest::getVar('limitstart', 0, '', 'int');

        // In case limit has been changed, adjust it
        $limitstart = ($limit != 0 ? (floor($limitstart / $limit) * $limit) : 0);

        $this->setState('limit', $limit);
        $this->setState('limitstart', $limitstart);
    }

    /**
     * Returns the query
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT * ' . ' FROM `' . $this->_table . '` ' . $this->_where . ' ' . $this->_order;
        return $query;
    }

    /**
     * Retrieves the Pvnews data
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // if data hasn't already been obtained, load it
        if (empty($this->_data)) {
            $query       = $this->_buildQuery();
            $this->_data = $this->_getList($query, $this->getState('limitstart'), $this->getState('limit'));
        }

        return $this->_data;
    }

    public function getTotal()
    {
        // Load the content if it doesn't already exist
        if (empty($this->_total)) {
            $query        = $this->_buildQuery();
            $this->_total = $this->_getListCount($query);
        }

        return $this->_total;
    }

    public function getPagination()
    {
        // Load the content if it doesn't already exist
        if (empty($this->_pagination)) {
            jimport('joomla.html.pagination');
            $this->_pagination = new JPagination($this->getTotal(), $this->getState('limitstart'), $this->getState('limit'));
        }

        return $this->_pagination;
    }

    public function bulkInsert($insert)
    {
        $db = &JFactory::getDBO();
        $db->setQuery($insert);
        $db->query();
        return true;
    }

    public function insertYear($year)
    {
        $db = &JFactory::getDBO();
        $year = htmlentities($year, ENT_QUOTES);
        $query = 'INSERT INTO #__pv_live_election_year (e_year ) values ("' . $year . '")';
        $db->setQuery($query);
        $db->query();
        return $db->insertid();
    }

    public function insertOffice($e_year, $year_id)
    {
        $db = &JFactory::getDBO();
        $year = htmlentities($year, ENT_QUOTES);
        $query = 'SELECT distinct office from #__pv_live_votes WHERE e_year="' . $e_year . '" and published = 1';
        $db->setQuery($query);
        $array = $db->loadObjectList();
        $len  =  count($array);
        if ($len > 0) {
            $query = 'INSERT INTO #__pv_live_offices (election_id , name , date_modified) VALUES ';
            $ar = array();
            $counter = 0;
            foreach ($array as $key => $value) {
                $office = htmlentities($value->office, ENT_QUOTES);
                $query .= '("' . $year_id . '" , "' . $office . '" , NOW())';
                $counter++;
                if ($counter < $len) {
                    $query .= " , ";
                }
            }
            $db->setQuery($query);
            $db->query();
        }
    }

    public function deleteRelated($ids)
    {
        if ($ids) {
            $db = &JFactory::getDBO();
            $str = "('" . implode("', '", $ids) . "')";
            $tables = array("candidate" , "ward" , "division");
            foreach ($tables as $index => $value) {
                $del_query = "DELETE FROM #__pv_live_" . $value . " where office_id in " . $str ;
                $db->setQuery($del_query);
                $db->query();
            }
        }
    }

    public function updateOffice($order, $id)
    {
        $db = &JFactory::getDBO();
        $query = "UPDATE #__pv_live_offices set publish_order = '" . $order . "' , date_modified=NOW() where published=1 and id='" . $id . "'";
        $db->setQuery($query);
        $db->query();
    }

    public function insertOfficeWard($office_id, $office_name, $year_id)
    {
        $office_name2 = htmlspecialchars($office_name, ENT_QUOTES, 'UTF-8');
        $db = &JFactory::getDBO();
        $query = "SELECT e_year from #__pv_live_election_year WHERE id ='" . $year_id . "' and published=1 LIMIT 0, 1";
        $db->setQuery($query);
        $row = $db->loadObject();

        if ($row->e_year) {
            $query = "SELECT distinct ward from #__pv_live_votes WHERE e_year ='" . $row->e_year . "' and published=1 and  office='" . $office_name2 . "'";
            $db->setQuery($query);
            $wards = $db->loadObjectList();

            $len = count($wards);
            if ($len > 0) {
                //Not doing bulk insert due to factor
                $wards_id = array();
                $div_insert = array();
                for ($i=0; $i < $len; $i++) {
                    $ward_query = "INSERT INTO #__pv_live_wards (office_id , name) VALUES ('" . $office_id . "' , '" . $wards[$i]->ward . "')";
                    $db->setQuery($ward_query);
                    $db->query();
                    $w_id = $db->insertid();
                    if ($w_id) {
                        $d_query = "SELECT distinct division from #__pv_live_votes WHERE e_year ='" . $row->e_year . "' and published=1 and  office='" . $office_name . "' and ward = '" . $wards[$i]->ward . "'";
                        $db->setQuery($d_query);
                        $divsions = $db->loadObjectList();
                        $len2 = count($divsions);
                        //Prepare bulk stuff to save db connections..office_id , ward_id , name
                        if ($len2) {
                            $d_counter = 0;
                            for ($k=0; $k < $len2; $k++) {
                                $d_counter++;
                                $div_insert[]="('" . $office_id . "' , '" . $w_id . "' , '" . $divsions[$k]->division . "')";
                            }
                        }
                    }
                }
                if (count($div_insert) > 0) {
                    $str = implode(" , ", $div_insert);
                    $div_query = "INSERT INTO #__pv_live_division (office_id , ward_id , name) VALUES " . $str;
                    //echo $div_query;
                    $db->setQuery($div_query);
                    $db->query();
                }
            }//end of wards stuff

            //Candidate stuff start
            $query = "SELECT distinct name from #__pv_live_votes WHERE e_year ='" . $row->e_year . "' and published=1 and  office='" . $office_name . "'";
            $db->setQuery($query);
            $candidates = $db->loadObjectList();
            $len = count($candidates);
            if ($len > 0) {
                $cand = array();
                for ($i=0; $i < $len; $i++) {
                    $cand[] = "('".$office_id."' , '".$candidates[$i]->name."')";
                }
                if (count($cand) > 0) {
                    $str = implode(" , ", $cand);
                    $cand_query = "INSERT INTO #__pv_live_candidate (office_id , name) VALUES ".$str;
                    $db->setQuery($cand_query);
                    $db->query();
                }
            }
        }
    }

    public function deleteElection($id)
    {
        $db = &JFactory::getDBO();

        $query = "SELECT e_year from #__pv_live_election_year WHERE  published=1 and id =  '" . $id . "' limit 0, 1" ;
        $db->setQuery($query);
        $e_year = $db->loadObjectList();

        if ($e_year[0]->e_year) {
            $query = "Update #__pv_live_votes set published=0 WHERE e_year ='" . $e_year[0]->e_year . "' and published=1 ";
            $db->setQuery($query);
            $db->query();
        }

        $del_query = "DELETE FROM #__pv_live_election_year where id =  '" . $id . "'" ;
        $db->setQuery($del_query);
        $db->query();
    }

    public function updateElectionName($name, $id, $election_date)
    {
        $db = &JFactory::getDBO();
        $query = "SELECT e_year from #__pv_live_election_year WHERE  published=1 and id =  '" . $id . "' limit 0, 1" ;
        $db->setQuery($query);
        $e_year = $db->loadObjectList();

        if ($e_year[0]->e_year) {
            $query = "Update #__pv_live_votes set e_year='" . $name . "'  WHERE e_year ='" . $e_year[0]->e_year . "' and published=1 ";
            $db->setQuery($query);
            $db->query();
            $path = JPATH_ROOT.DS.'files'.DS.'raw-data';
            $old_file = str_replace(' ', '_', JString::strtolower($e_year[0]->e_year.'.csv'));
            $new_file = str_replace(' ', '_', JString::strtolower($name.'.csv'));
//            if (JFile::exists($path.DS.$old_file)) {
                JFile::move($old_file, $new_file, $path);
//            }
        }
        $query = "Update   #__pv_live_election_year set e_year='" . $name . "' , election_date = '" . $election_date . "' WHERE  published=1 and id =  '" . $id . "'" ;
        $db->setQuery($query);
        $db->query();
    }
}
