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
        //get the election
        $election = &$this->get('Data');
        $isNew = ((int)$election[0]->id < 1);
        $text = JText::_('Edit');

        if ($isNew) {
            $tpl = 'add';
            $text = JText::_('New');
        }

        JToolBarHelper::title(JText::_('PVLiveresults App').': <small>[ '.$text.' ]</small>');

        if ($isNew) {
            JToolBarHelper::save();
            JToolBarHelper::cancel();
        } else {
            // for existing items the button is renamed `close`
            JToolBarHelper::publish();
            JToolBarHelper::unpublish();
            JToolBarHelper::save('update', 'Save');
            JToolBarHelper::custom('delete', 'icon-32-delete', 'delete', 'delete', false, true);
            JToolBarHelper::cancel('cancel', 'Close');
        }

        $this->assignRef('election', $election[0]);

        parent::display($tpl);
    }
}
