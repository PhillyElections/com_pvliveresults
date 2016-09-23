<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults PVModel (parent) Model.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsModel extends JModel
{
    /**
     * data array.
     *
     * @var array
     */
    public $_data;

    /**
     * default sort order.
     *
     * @var string
     */
    public $_fields = ' * ';

    /**
     * id of loaded record (if any)
     *
     * @var string
     */
    public $_id;

    /**
     * default sort order.
     *
     * @var string
     */
    public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * actual table name.
     *
     * @var string
     */
    public $_table;

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef;

    /**
     * default sort order.
     *
     * @var string
     */
    public $_where = '';

    public function __construct()
    {
        parent::__construct();
        $array = JRequest::getVar('cid', 0, '', 'array');
        $this->setId((int) $array[0]);
    }

    /**
     * Method to set the Liveresult identifier.
     *
     * @param   int Liveresult identifier
     */
    public function setId($id)
    {
        // Set id and wipe data
        $this->_id = $id;
        $this->_data = null;
    }

    /**
     * Method to delete record(s).
     *
     * @return bool True on success
     */
    public function delete()
    {
        $cids = JRequest::getVar('cid', array(0), 'post', 'array');

        $row = JTable::getInstance($this->_tableRef, 'Table');

        if (count($cids)) {
            foreach ($cids as $cid) {
                if (!$row->delete($cid)) {
                    $this->setError($row->getErrorMsg());

                    return false;
                }
            }
        }

        return true;
    }

    public function publish($ids)
    {
        foreach ($ids as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }
    }

    public function unpublish($ids)
    {
        foreach ($ids as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }
    }

    /**
     * Returns the query.
     *
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT ' . $this->_fields . ' '.' FROM `'.$this->_table.'` '.$this->_where.' '.$this->_order;

        return $query;
    }

    /**
     * Retrieves the Pvliveresults data.
     *
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // Lets load the data if it doesn't already exist
        if (empty($this->_data)) {
            $query = $this->_buildQuery();
            $this->_data = $this->_getList($query);
        }

        return $this->_data;
    }

    /**
     * Method to store a record.
     *
     * @return bool True on success
     */
    public function store()
    {
        $row = JTable::getInstance($this->_tableRef, 'Table');

        $data = JRequest::get('post');

        // Bind the form fields to the  table
        if (!$row->bind($data)) {
            $this->setError($this->_db->getErrorMsg());

            return false;
        }

        // Make sure the  record is valid
        if (!$row->check()) {
            $this->setError($this->_db->getErrorMsg());

            return false;
        }

        // Store the web link table to the database
        if (!$row->store()) {
            $this->setError($row->getErrorMsg());

            return false;
        }

        return true;
    }

    public function getByName($name)
    {
        $query = "SELECT * FROM " . $this->_db->nameQuote($this->_table) . " WHERE `name` = " . $this->_db->Quote($name) . " ";
        $this->_db->setQuery($query);

        if ($result = $this->_db->loadResult() && count($result)) {
            return $result;
        }
        return false;
    }
}
