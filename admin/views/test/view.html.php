<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Elections View for PVLiveresults Component.
 *
 * @license        GNU/GPL
 */
class PvliveresultsViewTest extends JView
{
    /**
     * Elections view display method.
     **/
    public function display($tpl = null)
    {
        JToolBarHelper::title(JText::_('PVLiveresults Test'), 'generic.png');

        // Get data from the model
        $model = $this->getModel();

        $election = $this->getModel('election');
        $candidate = $this->getModel('candidate');
        $office = $this->getModel('office');
        $party = $this->getModel('party');
        $vote = $this->getModel('vote');
        $votetype = $this->getModel('votetype');

        dd($model, $this, $election,
            $election->getData(),
            $candidate, $candidate->getData(),
            $office, $office->getData(),
            $party, $party->getData(),
            $vote, $vote->getData(),
            $votetype, $votetype->getData());

        parent::display($tpl);
    }
}
