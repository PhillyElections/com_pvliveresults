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
    //public $_data;
    //public $_lookup;
    public $tableName = array('s'=>'votetype','p'=>'#__pv_live_vote_types');
    public $tableOrder = '';

}