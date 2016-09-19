<?php
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Candidate Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelCandidate extends PVModel
{
    public $tableName = (object)array('s'=>'candidate','p'=>'candidates');

    public function publish($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id)
        {
        	$row = JTable::getInstance($this->tableName->s, 'Table');
            $row->load($id);
            $row->publish($id, 1);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }


    public function unpublish($currentElection)
    {
        $mainframe = JFactory::getApplication();
        $cid = JRequest::getVar('cid');

        foreach ($cid as $id)
        {
        	$row = JTable::getInstance($this->tableName->s, 'Table');
            $row->load($id);
            $row->publish($id, 0);
        }

        $mainframe->redirect('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$currentElection);
    }
}