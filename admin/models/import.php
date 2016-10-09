<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Import Model.
 *
 * @license    GNU/GPL
 */
class PvliveresultsModelImport extends PvliveresultsModel
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
    //public $_fields = ' * ';

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
    public $_table = '#__pv_live_imports';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'import';

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

    /**
     * disinct array of candidates
     *
     * @return array()
     */
    public function addNewCandidates()
    {
        $table = "#__pv_live_candidates";
        $field = 'candidate';
        $query = " SELECT DISTINCT " . $this->_db->nameQuote($field) . " as `name`, 1 as `published`, '" . $this->getNow() . "' as `created` from " . $this->_db->nameQuote($this->_table) . " WHERE " . $this->_db->nameQuote($field) . " NOT IN (SELECT `name` FROM " . $this->_db->nameQuote($table) . " )";

        return $this->_getList($query);
    }

    /**
     * disinct array of offices
     *
     * @return array()
     */
    public function addNewOffices()
    {
        $table = "#__pv_live_offices";
        $field = 'office';
        $query = " SELECT DISTINCT " . $this->_db->nameQuote($field) . " as `name`, 1 as `published`, '" . $this->getNow() . "' as `created` from " . $this->_db->nameQuote($this->_table) . " WHERE " . $this->_db->nameQuote($field) . " NOT IN (SELECT `name` FROM " . $this->_db->nameQuote($table) . " )";

        return $this->_getList($query);
    }

    /**
     * disinct array of parties
     *
     * @return array()
     */
    public function addNewParties()
    {
        $table = "#__pv_live_parties";
        $field = 'party';
        $this->_db->setQuery(" INSERT INTO " . $this->_db->nameQuote($table) . " SELECT DISTINCT " . $this->_db->nameQuote($field) . " as `name`, 1 as `published`, '" . $this->getNow() . "' as `created` from " . $this->_db->nameQuote($this->_table) . " WHERE " . $this->_db->nameQuote($field) . " NOT IN (SELECT `name` FROM " . $this->_db->nameQuote($table) . " )");
        d(" INSERT INTO " . $this->_db->nameQuote($table) . " SELECT DISTINCT " . $this->_db->nameQuote($field) . " as `name`, 1 as `published`, '" . $this->getNow() . "' as `created` from " . $this->_db->nameQuote($this->_table) . " WHERE " . $this->_db->nameQuote($field) . " NOT IN (SELECT `name` FROM " . $this->_db->nameQuote($table) . " )");
        $this->_db->query();
    }
}
