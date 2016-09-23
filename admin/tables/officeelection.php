<?php
// no direct access
defined('_JEXEC') or die;

/**
 * Electionoffice table for PVLiveResults
 *
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */
class TableElectionoffice extends JTable
{

    public $id = null;
    public $election_id = null;
    public $office_id = null;
    public $ordering = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_election_offices', 'id', $db);
    }
}
