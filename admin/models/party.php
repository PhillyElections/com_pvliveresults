<?php
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Party Model.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
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

    /**
     * public key field for FK deletes
     * 
     * @var string
     */
    //public $_fk = '';
}
