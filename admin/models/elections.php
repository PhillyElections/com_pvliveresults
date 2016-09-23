<?php
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * Pvliveresults Election Model
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license    GNU/GPL
 */
class PvliveresultsModelElections extends PvliveresultsModel
{
    /**
     * data array.
     *
     * @var array
     */
    //public $_data;

    /**
     * default sort order.
     *
     * @var string
     */
    //public $_fields = ' * ';

    /**
     * default sort order.
     *
     * @var string
     */
    //public $_order = ' ORDER BY `order` DESC, `id` DESC ';

    /**
     * Pagination object
     *
     * @var object
     */
    public $_pagination;

    /**
     * actual table name
     *
     * @var string
     */
    public $_table = '#__pv_live_elections';

    /**
     * table class name ref
     *
     * @var string
     */
    public $_tableRef = 'election';

    /**
     * Items total
     *
     * @var integer
     */
    public $_total;

    /**
     * default sort order
     *
     * @var string
     */
    //public $_where = '';


    public function __construct()
    {
        // parent will setId(), which we don't need... so...
        parent::__construct();
        d('in elections model constructor');
        $mainframe = JFactory::getApplication();

        // Get pagination request variables
        $limit      = $mainframe->getUserStateFromRequest('global.list.limit', 'limit', $mainframe->getCfg('list_limit'), 'int');
        $limitstart = $mainframe->getUserStateFromRequest('global.list.limitstart', 'limitstart', '', 'int');
        d('set limit/limitstart in elections model constructor');

        // In case limit has been changed, adjust it
        $limitstart = ($limit != 0 ? (floor($limitstart / $limit) * $limit) : 0);
        d('about to setstate in elections model constructor', $this, $limit, $limitstart);
        $this->setState('limit', $limit);
        d('middle of setstate in elections model constructor');

        $this->setState('limitstart', $limitstart);
        d('setstate in elections model constructor');

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
