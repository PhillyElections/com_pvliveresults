<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Party Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelParty extends PvliveresultsModel
{
    //public $_data;
    //public $_lookup;
    public $tableName = array('s'=>'party','p'=>'#__pv_live_parties');
    //public $tableOrder = 'order';

}