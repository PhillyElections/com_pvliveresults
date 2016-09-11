<?php
/**
 * Liveresults View for PVLiveresults Component
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults View
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsViewLiveresults extends JView
{
	
	/**
	 * Pvliveresults view display method
	 * @return void
	 **/
	function display($tpl = null)
	{
		JToolBarHelper::title(   JText::_( 'PVLiveresults App Manager' ), 'generic.png' );
		//JToolBarHelper::deleteList();
		//JToolBarHelper::editListX();
		JToolBarHelper::addNewX();

		// Get data from the model
		$items		= & $this->get( 'Data');
		$this->assignRef('items', $items);

		parent::display($tpl);
	}

	function display_races($tpl = null)
	{

		parent::display($tpl);
	}
}