<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Party Model.
 *
 * @license    GNU/GPL
 */
class PvliveresultsModelParty extends PvliveresultsModel
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
    public $_table = '#__pv_live_parties';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'party';

    /*
     * default sort order
     *
     * @var string
     */
    //public $_where = '';

    /*
     * public key field for FK deletes
     *
     * @var string
     */
    //public $_fk = '';

    /**
     * pull distinct new parties from the import
     *
     * @return array()
     */
    public function populate()
    {
        $table = "#__pv_live_imports";
        $field = 'party';
        $query = " INSERT INTO " . $this->_db->nameQuote($this->_table) . " (`name`, `published`, `created`) SELECT DISTINCT " . $this->_db->nameQuote($field) . " as `name`, 1 as `published`, '" . $this->getNow() . "' as `created` from " . $this->_db->nameQuote($table) . " WHERE " . $this->_db->nameQuote($field) . " NOT IN (SELECT `name` FROM " . $this->_db->nameQuote($this->_table) . " ) ";

        $this->_db->setQuery($query);
        $this->_db->query();
        return true;
    }
}
