<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Vote Model.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
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
     * default (agnostic) delete record(s).
     *
     * @param      boolean  $cids   The cids
     *
     * @return     bool     True on success
     */
    public function deleteByElectionOfficeId($id = false)
    {
        // delete by electionOfficeId
        if (is_numeric($id)) {
            $this->_db->seQuery("DELETE * FROM " . $this->_db->nameQuote($this->_tableRef) . " WHERE election_office_id = " . $id . " ");
            $this->_db->query();
        }
        return true;
    }
}
