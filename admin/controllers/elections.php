<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Elections Controller.
 */
class PvliveresultsControllerElections extends PvliveresultsController
{
    public function display()
    {
        // if format isn't explicit, set to 'html'
        $view = $this->getView('elections', JRequest::getWord('format', 'html'));
        $view->setModel($this->getModel('election'), true);

        $view->display();
    }

    public function edit()
    {
        $mainframe = JFactory::getApplication();
        $cid       = JRequest::getVar('cid');
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid=' . $cid[0]);
    }

    public function add()
    {
        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=add&&cid=' . $cid[0]);
    }
}
