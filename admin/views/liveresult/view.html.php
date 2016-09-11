<?php
/**
 * Liveresult View for PVLiveresults Component
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Liveresult View
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsViewLiveresult extends JView
{
	/**
	 * display method of Liveresult view
	 * @return void 
	 **/
	function display($tpl = null)
	{
		d('in view');
		//get the election
		$election		=& $this->get('Data');
		$isNew		= ($election[0][0]->id < 1);

		$tpl = $isNew ? 'add' : '';
		$text = $isNew ? JText::_( 'New' ) : JText::_( 'Edit' );
		JToolBarHelper::title(   JText::_( 'PVLiveresults App' ).': <small><small>[ ' . $text.' ]</small></small>' );

		if ($isNew)  {
			JToolBarHelper::save();
			JToolBarHelper::cancel();
		} else {
			// for existing items the button is renamed `close`
			JToolBarHelper::publish();
			JToolBarHelper::unpublish();
			JToolBarHelper::save('save_step2', 'Save');
			JToolBarHelper::cancel( 'cancel', 'Close' );
			
		}

		$this->assignRef('election', $election);

		parent::display($tpl);
	}
}