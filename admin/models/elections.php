<?php
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Election Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelElection extends PvliveresultsModel
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
     * Pagination object
     * @var object
     */
    public $_pagination;

    /**
     * actual table name
     * @var string
     */
    public $_table = '#__pv_live_elections';

    /**
     * table class name ref
     * @var string
     */
    public $_tableRef = 'election';

    /**
     * Items total
     * @var integer
     */
    public $_total;

    /**
     * default sort order
     * @var string
     */
    // default is:
    //public $_where = '';


    public function __construct()
    {
        parent::__construct();

        $mainframe = JFactory::getApplication();

        // Get pagination request variables
        $limit      = $mainframe->getUserStateFromRequest('global.list.limit', 'limit', $mainframe->getCfg('list_limit'), 'int');
        $limitstart = JRequest::getVar('limitstart', 0, '', 'int');

        // In case limit has been changed, adjust it
        $limitstart = ($limit != 0 ? (floor($limitstart / $limit) * $limit) : 0);

        $this->setState('limit', $limit);
        $this->setState('limitstart', $limitstart);
    }

    /**
     * Method to set the Liveresult identifier
     *
     * @access  public
     * @param   int Liveresult identifier
     * @return  void
     */
    public function setId($id)
    {
        // Set id and wipe data
        $this->_id      = $id;
        $this->_data    = null;
    }

    /**
     * Returns the query
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
        // added order by -- id desc for a defacto recent date sort
        $query = 'SELECT * ' . ' FROM `' . $this->_table . '` ' . $this->_where . ' ' . $this->_order;
        return $query;
    }

    /**
     * Retrieves the Pvnews data
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // if data hasn't already been obtained, load it
        if (empty($this->_data)) {
            $query       = $this->_buildQuery();
            $this->_data = $this->_getList($query, $this->getState('limitstart'), $this->getState('limit'));
        }

        return $this->_data;
    }

    public function getTotal()
    {
        // Load the content if it doesn't already exist
        if (empty($this->_total)) {
            $query        = $this->_buildQuery();
            $this->_total = $this->_getListCount($query);
        }

        return $this->_total;
    }

    public function getPagination()
    {
        // Load the content if it doesn't already exist
        if (empty($this->_pagination)) {
            jimport('joomla.html.pagination');
            $this->_pagination = new JPagination($this->getTotal(), $this->getState('limitstart'), $this->getState('limit'));
        }

        return $this->_pagination;
    }
}
