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
        // if 'raw' isn't explicit, set to 'html'
        $view = $this->getView('elections', JRequest::getWord('format', 'html'));
        $view->setModel($this->getModel('candidate'), true);
        $view->setModel($this->getModel('election'), true);
        $view->setModel($this->getModel('office'), true);
        $view->setModel($this->getModel('party'), true);
        $view->setModel($this->getModel('vote'), true);
        $view->setModel($this->getModel('votetype'), true);

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
