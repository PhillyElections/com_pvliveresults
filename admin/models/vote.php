<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Vote Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelVote extends PvliveresultsModel
{
    //public $_data;
    //public $_lookup;
    public $tableName = array('s'=>'vote','p'=>'#__pv_live_votes');
    //public $tableOrder = 'order';

}