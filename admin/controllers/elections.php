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
        JRequest::checkToken() or jexit('Invalid Token');

        $mainframe = JFactory::getApplication();
        $cid       = JRequest::getVar('cid');
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid=' . $cid[0]);
    }

    public function add()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=add&&cid=' . $cid[0]);
    }

    public function delete()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=delete&&cid=' . $cid[0]);
    }

    public function publish()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $election = $this->getModel('election');
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id)
        {
            $election->publish($id);
        }
    }

    public function unpublish()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $election = $this->getModel('election');
        $cid = JRequest::getVar('cid');
dd($cid, JRequest::get());
        foreach ($cid as $id)
        {
            $election->unpublish($id);
        }
    }
}
