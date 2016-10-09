<?php
// no direct access
defined('_JEXEC') or die;

/**
 * Import table for PVLiveResults.
 *
 * @license    GNU/GPL
 */
class TableImport extends JTable
{
    public $id            = null;
    public $ward          = null;
    public $division      = null;
    public $type          = null;
    public $office        = null;
    public $candidate     = null;
    public $party         = null;
    public $votes         = null;
    public $ward_division = null;
    public $lname         = null;
    public $fname         = null;
    public $mname         = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_imports', 'id', $db);
    }
}
