<?php

defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Vote Model.
 *
 * @license    GNU/GPL
 */
class PvliveresultsModelVote extends PvliveresultsModel
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
    public $_table = '#__pv_live_votes';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'vote';

    /*
     * default sort order
     *
     * @var string
     */
    //public $_where = '';

    /**
     * public key field for FK deletes.
     *
     * @var        string
     */
    public $_fk = 'election_office_id';

    /**
     * Gets the identifier associated by true primary key.
     *
     * @param      string  $eoId   The electionoffice identifier
     *
     * @return     array   voteId associated by (descending) vtId, eoId, cId, ward, div.
     */
    public function getIdAssocByKeys($eoIds)
    {
        $t = array();
        $t[] = microtime(1);
        $query = "SELECT * FROM " . $this->_db->nameQuote($this->_table)) . " WHERE `election_office_id` in (" . $eoIds . ") ";
        $data = $this->_getList($query);
        $limit = count($data);

        $tmp = array();
        for ($i = 0; $i<$limit; $i++) {
            $row  = $data[$i];
            $vtId = (int)$row['vote_type_id'];
            $cId  = (int)$row['candidate_id'];
            $ward = (int)$row['ward'];
            $div  = (int)$row['division'];

            if (!isset($tmp[$vtId])) {
                $tmp[$vtId] = array();
            }
            if (!isset($tmp[$vtId][$eoId])) {
                $tmp[$vtId][$eoId] = array();
            }
            if (!isset($tmp[$vtId][$eoId][$cId])) {
                $tmp[$vtId][$eoId][$cId] = array();
            }
            if (!isset($tmp[$vtId][$eoId][$cId][$ward])) {
                $tmp[$vtId][$eoId][$cId][$ward] = array();
            }
            if (!isset($tmp[$vtId][$eoId][$cId][$ward][$div])) {
                $tmp[$vtId][$eoId][$cId][$ward][$div] = $row['id'];
            }
        }
        $t[] = microtime(1);
        d($t[1]-$t[0]);
        return $tmp;
    }
}
