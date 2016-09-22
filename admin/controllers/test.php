<?php
// No direct access
defined('_JEXEC') or die('Restricted access');

/**
 * Pvliveresults Elections Controller.
 */
class PvliveresultsControllerTest extends PvliveresultsController
{
    public function display()
    {
        // if 'raw' isn't explicit, set to 'html'
        $view = $this->getView('test', 'html');
        $view->setModel($this->getModel('candidate'), true);
/*        $view->setModel($this->getModel('election'), true);
        $view->setModel($this->getModel('office'), true);
        $view->setModel($this->getModel('party'), true);
        $view->setModel($this->getModel('vote'), true);*/
        $view->setModel($this->getModel('votetype'), true);

        $view->display();
    }
}
