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
     * @return     array   voteId associated by (descending) eoId, cId, ward, div.
     */
    public function getIdAssocByKeys($eoIds)
    {
        $query = "SELECT * FROM " . $this->_db->nameQuote($this->_table)) . " WHERE `election_office_id` in (" . $eoIds . ") ";
        $data = $this->_getList($query);

        $tmp = array();
        for ($i = 0; $i<count($data); $i++) {
            $row  = $data[$i];
            $cId  = (int)$row['candidate_id'];
            $ward = (int)$row['ward'];
            $div  = (int)$row['division'];

            if (!isset($tmp[$eoId])) {
                $tmp[$eoId] = array();
            }
            if (!isset($tmp[$eoId][$cId])) {
                $tmp[$eoId][$cId] = array();
            }
            if (!isset($tmp[$eoId][$cId][$div])) {
                $tmp[$eoId][$cId][$div] = array();
            }
            if (!isset($tmp[$eoId][$cId][$ward][$div])) {
                $tmp[$eoId][$cId][$ward][$div] = $row['id'];
            }
        }

        return $tmp;
    }
}
