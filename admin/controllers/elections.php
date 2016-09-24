<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Elections Controller.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsControllerElections extends PvliveresultsController
{
    public function display()
    {
        // if format isn't explicit, set to 'html'
        $view = $this->getView('elections', JRequest::getWord('format', 'html'));
        $view->setModel($this->getModel('elections'), true);

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

        $election->publish($cid);

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults');
    }

    public function unpublish()
    {
        JRequest::checkToken() or jexit('Invalid Token');

        $election = $this->getModel('election');
        $cid = JRequest::getVar('cid');

        $election->unpublish($cid, '');

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults');
    }

    public function saveorder()
    {
        JRequest::checkToken() or jexit('Invalid Token');
        $items = JRequest::getVar('ordering');

        foreach ($items as $key => $value) {
            if (is_numeric($key) && is_numeric($value)) {
                $data = array('id'=>(int)$key, 'ordering'=>(int)$value);
                $election = $this->getModel('election');
                $election->store($data);
            }
        }

        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults');
    }
}
