<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Office Model.
 *
 * @license    GNU/GPL
 */
class PvliveresultsModelElectionoffices extends PvliveresultsModel
{
    /**
     * data array.
     *
     * @var array
     */
    //public $_data;

    /**
     * default sort order.
     *
     * @var string
     */
    //public $_fields = '';

    /**
     * default sort order.
     *
     * @var string
     */
    //public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * actual table name.
     *
     * @var string
     */
    public $_table = '#__pv_live_election_offices';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'electionoffice';

    /**
     * default sort order.
     *
     * @var string
     */
    //public $_where = '';

    /**
     * public key field for FK deletes.
     *
     * @var string
     */
    //public $_fk = '';

    public function __construct()
    {
        // parent will setId(), which we don't need... so...
        parent::__construct();

        $mainframe = JFactory::getApplication();

        // Get pagination request variables
        $limit = $mainframe->getUserStateFromRequest('global.list.limit', 'limit', $mainframe->getCfg('list_limit'), 'int');
        $limitstart = $mainframe->getUserStateFromRequest('global.list.limitstart', 'limitstart', '', 'int');

        // In case limit has been changed, adjust it
        $limitstart = ($limit != 0 ? (floor($limitstart / $limit) * $limit) : 0);

        $this->setState('limit', $limit);
        $this->setState('limitstart', $limitstart);
    }

    /**
     * Returns the query. -- OVERRIDDING that in PvliveresultsModel.
     *
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT ` od.id as id, o.id as office_id, o.name as name, eo.published as published, eo.ordering as ordering '.
                    'FROM  `#__pv_live_offices` `o`, `#__pv_live_election_offices` `eo` '.
                    'WHERE `o`.`id` = `eo`.`offices_id` and `eo`.`election_id` = '.(int) $this->_id.' '.
                    $this->_order.' ';

        return $query;
    }

    /**
     * Retrieves the Pvnews data.
     *
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // if data hasn't already been obtained, load it
        if (empty($this->_data)) {
            $query = $this->_buildQuery();
            $this->_data = $this->_getList($query, $this->getState('limitstart'), $this->getState('limit'));
        }

        return $this->_data;
    }

    public function getTotal()
    {
        // Load the content if it doesn't already exist
        if (empty($this->_total)) {
            $query = $this->_buildQuery();
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

    public function publishOffices($eId)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$eId);
    }

    public function unpublishOffices($eId)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$eId);
    }

    public function getIdAssocByKeys($eId)
    {
        $t = array();
        array_push($t, microtime(true));

        $query = "SELECT * FROM " . $this->_db->nameQuote($this->_table)) . " WHERE `election_id` = " . $eId . " ";
        $data = $this->_getList($query);

        $tmp = array();

        for ($i = 0; $i<count($data); $i++) {
            $row = $data[$i];
            $oId = (int)$row['office_id'];
            if (!isset($tmp[$eId])) {
                $tmp[$eId] = array();
            }
            if (!isset($tmp[$eId][$oId])) {
                $tmp[$eId][$oId] = $row['id'];
            }
        }
        array_push($t, microtime(true));
        d($t[1]-$t[0]);

        return $tmp;
    }
}
