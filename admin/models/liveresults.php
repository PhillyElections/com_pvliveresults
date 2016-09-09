<?php
/**
 * Liveresults Model for PVLiveResults Component
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// No direct access
defined('_JEXEC') or die( 'Restricted access' );

jimport('joomla.application.component.model');

/**
 * Pvliveresults Model
 *
 * @package    Joomla.Tutorials
 * @subpackage Components
 */
class PvliveresultsModelLiveresults extends JModel
{
    /**
     * Pvliveresults data array
     *
     * @var array
     */
    public $_data;


    /**
     * Returns the query
     * @return string The query to be used to retrieve the rows from the database
     */
    public function _buildQuery()
    {
    	// added order by -- id desc for a defacto recent date sort
        $query = 'SELECT * ' . ' FROM #__pv_live_election_year where published=1 order by `election_date` DESC';
        return $query;
    }

    /**
     * Retrieves the Pvliveresults data
     * @return array Array of objects containing the data from the database
     */
    public function getData()
    {
        // Lets load the data if it doesn't already exist
        if (empty( $this->_data )) {
            $query = $this->_buildQuery();
            $this->_data = $this->_getList($query);
        }

        return $this->_data;
    }
}
