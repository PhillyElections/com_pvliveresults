<?php
// No direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Office Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelOffice extends PvliveresultsModel
{
    /**
     * data array
     * @var array
     */
    //public $_data;

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * actual table name
     * @var string
     */
    public $_table = '#__pv_live_offices';

    /**
     * table class name ref
     * @var string
     */
    public $_tableRef = 'office';

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_where = ' WHERE `published` = 1 ';

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