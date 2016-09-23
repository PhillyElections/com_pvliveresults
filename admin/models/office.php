<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Office Model.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsModelOffice extends PvliveresultsModel
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
    public $_fields = ' `o`.* ';

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
    public $_table = ' `#__pv_live_offices` `o`, `#__pv_live_votes` `v` ';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'office';

    /**
     * default sort order.
     *
     * @var string
     */
    public $_where = ' `o`.`id` = `v`.`offices_id` ';

    public function publishOffices($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id) {
            $row = JTable::getInstance($this->tableName['s'], 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }

    public function unpublishOffices($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id) {
            $row = JTable::getInstance($this->tableName['s'], 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }

     /**
     * Returns the query. -- OVERRIDDING that in PvliveresultsModel
     *
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT DISTINCT ' . $this->_fields . ' '.' FROM ' . $this->_table . ' ' . $this->_where . ' ' . $this->_order . ' ';

        return $query;
    }
}
