<?php
/**
 * Candidate table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// no direct access
defined('_JEXEC') or die;

public class TableCandidate extends JTable
{

    public $id = null;
    public $party_id = null;
    public $name = null;
    public $order = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_candidates', 'id', $db);
    }
}