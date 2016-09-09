<?php
/**
 * Pvliveresults default controller
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Component Controller
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsController extends JController
{
	/**
	 * Method to display the view
	 *
	 * @access	public
	 */
	function display()
	{
		parent::display();
	}
	function step_next(){
		parent::display();
		die("nono babrrr");
	}
}