<?php
/**
 * Election table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// no direct access
defined('_JEXEC') or die;

public class TableElection extends JTable
{

    public $id = null;
    public $name = null;
    public $date = null;
    public $order = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_elections', 'id', $db);
    }
}