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
        $model = $this->getModel();
        $election = $this->getModel('election');
        $candidate = $this->getModel('candidate');
        $office = $this->getModel('office');
        $party = $this->getModel('party');
        $vote = $this->getModel('vote');
        $votetype = $this->getModel('votetype');

        dd($model,$election, $election->getData(), $candidate, $candidate->getData(), $office, $office->getData(), $party, $party->getData(), $vote, $vote->getData(), $votetype, $votetype->getData());

        parent::display($tpl);
    }
}