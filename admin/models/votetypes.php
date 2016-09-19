<?php
/**
 * Office Model for Liveresult Component
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Office Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelVotetypes extends PVModel
{
    public $tableName = "Votetype";
    
    /**
     * Constructor that retrieves the ID from the request
     *
     * @access  public
     * @return  void
     */
    function __construct()
    {
        parent::__construct();
    }

}