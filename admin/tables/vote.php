<?php
// no direct access
defined('_JEXEC') or die;

/**
 * Vote table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */
class TableVote extends PVliveresultsTable
{

    public $id = null;
    public $vote_type_id = null;
    public $election_id = null;
    public $office_id = null;
    public $candidate_id = null;
    public $ward = null;
    public $division = null;
    public $votes = null;
    public $order = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_votes', 'id', $db);
    }
}

