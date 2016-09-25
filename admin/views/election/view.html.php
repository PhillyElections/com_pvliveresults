<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Election View for PVLiveresults Component.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsViewElection extends JView
{
    /**
     * display method of Election view.
     **/
    public function display($tpl = null)
    {
        d('in view', $this);
        //get the election
        $election = &$this->get('Data');
        d($election);
        $isNew = ($election->id < 1);

        $tpl = $isNew ? 'add' : '';
        $text = $isNew ? JText::_('New') : JText::_('Edit');
        JToolBarHelper::title(JText::_('PVLiveresults App').': <small>[ '.$text.' ]</small>');

        if ($isNew) {
            JToolBarHelper::save();
            JToolBarHelper::cancel();
        } else {
            // for existing items the button is renamed `close`
            JToolBarHelper::publish();
            JToolBarHelper::unpublish();
            JToolBarHelper::save();
            JToolBarHelper::cancel('cancel', 'Close');
        }

        $this->assignRef('election', $election);

        parent::display($tpl);
    }
}
