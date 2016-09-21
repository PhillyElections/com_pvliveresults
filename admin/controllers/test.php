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

        $view->display();
    }
}
