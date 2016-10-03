<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Office Model.
 *
 * @license    GNU/GPL
 */
class PvliveresultsModelElectionoffice extends PvliveresultsModel
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
    public $_fk = 'election_id';


    public function getIdAssocByKeys($eId)
    {
        $t = array();
        array_push($t, microtime(true));

        $query = "SELECT * FROM " . $this->_db->nameQuote($this->_table) . " WHERE `election_id` = " . $eId . " ";
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
