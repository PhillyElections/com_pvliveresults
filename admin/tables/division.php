<?php
/**
 * Division table for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

// no direct access
defined('_JEXEC') or die;

public class TableDivision extends JTable
{

    public $id = null;
    public $office_id = null;
    public $ward_id = null;
    public $name = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_divisions', 'id', $db);
    }
}