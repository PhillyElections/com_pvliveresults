<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Vote Model.
 *
 * @package    Philadelphia.votes
 * @subpackage Components
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

}
