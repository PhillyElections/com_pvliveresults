<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults PVModel (parent) Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModel extends JModel
{
    public $_data;
    public $_lookup;
    public $tableName = array('s'=>'','p'=>'');
    public $tableOrder = ' ORDER BY `order` DESC, `id` DESC ';

    public function _buildLookupQuery()
    {
    }

    public function _buildNameLookupQuery()
    {
    }

    public function publish($ids)
    {
        foreach ($ids as $id)
        {
            $row = JTable::getInstance($this->tableName->s, 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }
    }

    public function unpublish($ids)
    {
        foreach ($ids as $id)
        {
            $row = JTable::getInstance($this->tableName->s, 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }
    }

    /**
     * Returns the query
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    { 
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT * ' . ' FROM `#__pv_live_' . $this->tableName['p'] . '` where published=1 ' . $this->tableOrder;
        return $query;
    }

    /**
     * Retrieves the Pvliveresults data
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // Lets load the data if it doesn't already exist
        if (empty( $this->_data )) {
            $query = $this->_buildQuery();
d($query);

            $this->_data = $this->_getList($query);
        }

        return $this->_data;
    }
}
