<?php
/**
 * Elections View for PVLiveresults Component
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Elections View
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsViewTest extends JView
{
    
    /**
     * Elections view display method
     * @return void
     **/
    function display($tpl = null)
    {
        JToolBarHelper::title(   JText::_( 'PVLiveresults Test' ), 'generic.png' );

        // Get data from the model
        $election = $this->getModel('election');
        $candidate = $this->getModel('candidate');
        $office = $this->getModel('office');
        $party = $this->getModel('party');
        $vote = $this->getModel('vote');
        $votetype = $this->getModel('votetype');

        dd($this, $election, $election->get('Data'), $candidate, $candidate->get('Data'), $office, $office->get('Data'), $party, $party->get('Data'), $vote, $vote->get('Data'), $votetype, $votetype->get('Data'));

        parent::display($tpl);
    }
}