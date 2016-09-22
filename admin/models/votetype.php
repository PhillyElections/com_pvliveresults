<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Votetype Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelVotetype extends PvliveresultsModel
{
    /**
     * data array
     * @var array
     */
    //public $_data;

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * actual table name
     * @var string
     */
    public $_table = '#__pv_live_vote_types';

    /**
     * table class name ref
     * @var string
     */
    public $_tableRef = 'votetype';

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_where = ' WHERE `published` = 1 ';


}