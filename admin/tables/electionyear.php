<?php
/**
 * Electionyear table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// no direct access
defined('_JEXEC') or die;

public class TableElectionyear extends JTable
{

    public $id = null;
    public $e_year = null;
    public $election_date = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_election_years', 'id', $db);
    }
}