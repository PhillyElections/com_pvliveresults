<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Votetype Model.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsModelVotetype extends PvliveresultsModel
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
    public $_table = '#__pv_live_vote_types';

    /**
     * table class name ref.
     *
     * @var string
     */
    public $_tableRef = 'votetype';

    /*
     * default sort order
     *
     * @var string
     */
    //public $_where = '';

    /**
     * public key field for FK deletes
     * 
     * @var string
     */
    //public $_fk = '';
}
