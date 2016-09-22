<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Party Model.
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
    // default is:
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
     * @var string
     */
    // default is:
    //public $_where = '';

}
