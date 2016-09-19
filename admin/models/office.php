<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Office Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelOffice extends PVModel
{
    //public $_data;
    //public $_lookup;
    public $tableName = array('s'=>'office','p'=>'offices');
    //public $tableOrder = 'order';


    function publish_offices($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id)
        {
            $row = JTable::getInstance($this->tableName['s'], 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }


    function unpublish_offices($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id)
        {
            $row = JTable::getInstance($this->tableName['s'], 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }
}