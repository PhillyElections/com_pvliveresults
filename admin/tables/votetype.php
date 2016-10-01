<?php
// no direct access
defined('_JEXEC') or die;

/**
 * Votetype table for PVLiveResults.
 *
 * @license    GNU/GPL
 */
class TableVotetype extends JTable
{
    public $id = null;
    public $name = null;
    public $ordering = null;
    public $published = null;
    public $created = null;
    public $updated = null;

    public function __construct(&$db)
    {
        parent::__construct('#__pv_live_vote_types', 'id', $db);
    }
}
