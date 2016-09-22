<?php
/**
 * Bootstrap file for PVLiveResults.
 *
 * @license        GNU/GPL
 */
ini_set('display_errors', 1);
// No direct access
defined('_JEXEC') or die('Restricted access');
jimport('kint.kint');
// Uzer
jimport('uzer.Uzer');
Uzer::blok(JFactory::getUser(), 'Administrator');

$language = JFactory::getLanguage();
$language->load(JRequest::getCmd('option'), JPATH_SITE);

// Require the base model, table, and controller
require_once JPATH_COMPONENT.DS.'models/model.php';
require_once JPATH_COMPONENT.DS.'tables/table.php';
require_once JPATH_COMPONENT.DS.'controller.php';

// Require specific controller if requested
if ($controller = JRequest::getWord('controller', 'elections')) {
    $path = JPATH_COMPONENT.DS.'controllers'.DS.$controller.'.php';
    if (file_exists($path)) {
        require_once $path;
    } else {
        $controller = '';
    }
}

// Create the controller
$classname = 'PvliveresultsController'.ucfirst($controller);
$controller = new $classname();

// Perform the Request task
$controller->execute(JRequest::getVar('task'));

// Redirect if set by the controller
$controller->redirect();

