<?php

/**
 * Elections Controller for PVLiveresult Component.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Liveresult Controller.
 */
class PvliveresultsControllerElections extends PvliveresultsController
{
    public function display()
    {
        // if 'raw' isn't explicit, set to 'html'
        $view = $this->getView('elections', JRequest::getWord('format', 'html'));
        $view->setModel($this->getModel('elections'), true);

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
