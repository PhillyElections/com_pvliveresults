<?php
/**
 * Vote table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// no direct access
defined('_JEXEC') or die;

public class TableVote extends JTable
{

    public $id = null;
    public $date_created = null;
    public $e_year = null;
    public $office = null;
    public $ward = null;
    public $division = null;
    public $vote_type = null;
    public $name = null;
    public $party = null;
    public $votes = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_votes', 'id', $db);
    }
}