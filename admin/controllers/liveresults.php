<?php

/**
 * Liveresult Controller for Liveresult Component.
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined('_JEXEC') or die('Restricted access');

jimport('joomla.filesystem.archive');
/**
 * Pvliveresults Liveresult Controller.
 */
class PvliveresultsControllerLiveresults extends PvliveresultsController
{
    public function display()
    {
        // if 'raw' isn't explicit, set to 'html'
        $view = $this->getView('liveresults', JRequest::getWord('format', 'html'));
        $view->setModel($this->getModel('liveresults'), true);

        $view->display();
    }

    public function edit()
    {
        $mainframe = JFactory::getApplication();
        $cid       = JRequest::getVar('cid');
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=liveresult&task=edit&cid=' . $cid[0]);
    }

    public function add()
    {
        $mainframe = JFactory::getApplication();
        $mainframe->redirect('index.php?option=com_pvliveresults&controller=liveresult&task=add&&cid=' . $cid[0]);
    }
}
