<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Elections View for PVLiveresults Component.
 *
 * @license    GNU/GPL
 */
class PvliveresultsViewElections extends JView
{
    /**
     * Elections view display method.
     **/
    public function display($tpl = null)
    {
        d('in view');
        JToolBarHelper::title(JText::_('PVLiveresults App Manager'), 'generic.png');
        JToolBarHelper::deleteList();
        JToolBarHelper::editListX();
        JToolBarHelper::addNewX();

        // Get data from the model
        $elections = &$this->get('Data');
        $pagination = &$this->get('Pagination');

        $this->assignRef('elections', $elections);
        $this->assignRef('pagination', $pagination);

        parent::display($tpl);
    }
}
