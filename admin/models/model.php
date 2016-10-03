<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults PVModel (parent) Model.
 *
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
     * id of loaded record (if any).
     *
     * @var string
     */
    public $_id;

    /**
     * default sort order.
     *
     * @var string
     */
    public $_order = ' ORDER BY `ordering` ASC, `id` DESC ';

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
    public $_where = ' 1 ';

    /**
     * public key field for FK deletes.
     * 
     * @var string
     */
    public $_fk = '';

    /**
     * default constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $cids = JRequest::getVar('cid', 0, '', 'array');
        $id = JRequest::getInt('id');
        if ($id) {
            // in case we're updating and check() failed
            $this->setId((int) $id);
        } else {
            $this->setId((int) $cids[0]);
        }
    }

    /**
     * default (agnostic) set the Liveresult identifier.
     *
     * @param <type> $id The identifier
     * @param      int   Liveresult  identifier
     */
    public function setId($id)
    {
        // Set id and wipe data
        $this->_id = $id;
        $this->_data = null;
    }

    /**
     * default (agnostic) delete record(s).
     *
     * @param bool $cids The cids
     *
     * @return bool True on success
     */
    public function delete($cids = false)
    {
        $row = JTable::getInstance($this->_tableRef, 'Table');

        if (!$cids) {
            $cids = JRequest::getVar('cid', array(0), 'post', 'array');
        }

        foreach ($cids as $cid) {
            if (!$row->delete($cid)) {
                $this->setError($row->getErrorMsg());

                return false;
            }
        }

        return true;
    }

    /**
     * default (agnostic) publish.
     *
     * @param <type> $ids The identifiers
     */
    public function publish($ids)
    {
        foreach ($ids as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }
    }

    /**
     * default (agnostic) unpublish.
     *
     * @param <type> $ids The identifiers
     */
    public function unpublish($ids)
    {
        foreach ($ids as $id) {
            $row = JTable::getInstance($this->_tableRef, 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }
    }

    /**
     * default (agnostic) method to return the query.
     *
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT '.$this->_fields.' '.' FROM '.$this->_db->nameQuote($this->_table).' WHERE '.$this->_where.' '.$this->_order.' ';

        return $query;
    }

    /**
     * Default (agnostic) data retrieval.
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
     * Default (agnostic) record store.
     *
     * @param bool $data The data
     *
     * @return bool True on success
     */
    public function store($data = false)
    {
        $row = JTable::getInstance($this->_tableRef, 'Table');

        if (!$data) {
            $data = JRequest::get('post');
        }

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

        return $this->_db->insertid();
    }

    /**
     * default (agnostic) get record(s) by name.
     *
     * @param <type> $name The name
     *
     * @return <type> The by name.
     */
    public function getByName($name)
    {
        $query = 'SELECT * FROM '.$this->_db->nameQuote($this->_table).' WHERE `name` = '.$this->_db->Quote($name).' ';
        $this->_data = $this->_getList($query);

        return $this->_data;
    }

    /**
     * (agnostic) Gets the name identifier associated.
     *
     * @param string $key The key
     *
     * @return <type> The name identifier associated.
     */
    public function getIdAssocByName($key = 'name')
    {
        $query = 'SELECT `id` FROM '.$this->_db->nameQuote($this->_table).' ORDER BY `name` ASC ';

        $this->_db->setQuery($query);
        $this->_assoc = $this->_db->loadAssocList($key);

        return $this->_assoc;
    }

    /**
     * load a date usable in a DB query.
     *
     * @return <type> The now.
     */
    public function getNow()
    {
        $dateNow = &JFactory::getDate();

        return $dateNow->toMySQL();
    }

    /**
     * default (agnostic) push down of ordering (whole set).
     *
     * @return bool
     */
    public function bumpOrdering()
    {
        $query = 'UPDATE '.$this->_db->nameQuote($this->_table).' set `ordering`=(`ordering` + 1) ';
        $this->_db->setQuery($query);
        if (!$this->_db->query()) {
            $this->setError($this->_db->getErrorMsg());

            return false;
        }

        return true;
    }

    public function squinchOrdering()
    {
        $table = $this->getTable($_this->_tableRef);

        $table->reorder();
    }

    /**
     * default (agnostic) delete record(s) by FK.
     *
     * @param bool $cids The cids
     *
     * @return bool True on success
     */
    public function deleteByFk($id = false)
    {
        // delete by electionOfficeId
        if (is_numeric($id)) {
            $this->_db->setQuery('DELETE * FROM '.$this->_db->nameQuote($this->_table).' WHERE '.$this->_db->nameQuote($this->_fk).' = '.$id.' ');
            $this->_db->query();

            return true;
        }

        return false;
    }
}
