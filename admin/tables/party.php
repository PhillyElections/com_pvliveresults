<?php
// no direct access
defined('_JEXEC') or die;

/**
 * Parties table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */
class TableParty extends PVliveresultsTable
{

    public $id = null;
    public $name = null;
    public $order = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_parties', 'id', $db);
    }
}

