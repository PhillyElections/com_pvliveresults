<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Vote Model.
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
    // default is:
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
     * @var string
     */
    // default is:
    //public $_where = ' WHERE `published` = 1 ';

}
