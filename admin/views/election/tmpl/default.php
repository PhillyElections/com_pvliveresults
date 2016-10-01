<?php
defined('_JEXEC') or die('Restricted access');
jimport('joomla.html.html');
$election = $this->election;
$offices = $this->offices;
?>
<script>

</script>
<form action="index.php" method="post" name="adminForm">
<div id="editcell">
    <table class="adminform">
        <tr>
            <td>Election Name</td>
            <td><input type="text" name="name" value="<?=$election->name; ?>"></td>
        </tr>
        <tr>
            <td>Published</td>
            <td><input type="checkbox" name="published" <?= $election->published ? "checked='checked'" : '' ?>></td>
        </tr>
        <tr>
            <td>Election Date</td>
            <td class="paramlist_value">
                <?=JHTML::calendar($election->date, 'date', 'date', '%Y-%m-%d', 'class="inputbox" size="25" maxlength="19"'); ?>
            </td>
        </tr>
     *
    </table>
    <table class="adminlist">
    <thead>
        <tr>
            <th width="1">
                <?=JText::_('ID'); ?>
            </th>
            <th width="1">
                <input type="checkbox" name="toggle" value="" onclick="checkAll(<?=count($offices); ?>);" />
            </th>
            <th width="0">
                <?=JText::_('NAME'); ?>
            </th>
            <th width="15">
                <?=JText::_('PUBLISHED'); ?>
            </th>     *
            <th width="20">`
                <?=JText::_('ORDER'); ?>
            </th>
        </tr>
    </thead>
    <?php
    $k = 0;
    $election_year_id = 0;
    for ($i = 0, $n = count($offices); $i < $n; ++$i) {
        $row = &$offices[$i];
        $link = JRoute::_('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$row->id);
        $election_year_id = $row->election_id;
        ?>
        <tr class="<?="row$k";
        ?>">
            <td>
                <?=$i + 1;
        ?>
            </td>
            <td>
                <?=JHTML::_('grid.id', $i, $row->id);
        ?>
            </td>
            <td>
                <?=html_entity_decode($row->name, ENT_QUOTES);
        ?>
                <input type="hidden" name="office_publish[<?=$row->id;
        ?>]" value="<?=$row->published;
        ?>" />
                <input type="hidden" name="office_id[<?=$row->id;
        ?>]" value="<?=$row->id;
        ?>" />
                <input type="hidden" name="office_name[<?=$row->id;
        ?>]" value="<?=html_entity_decode($row->name, ENT_QUOTES);
        ?>" />
            </td>
            <td>
                <?=JHTML::_('grid.published', $row, $i);
        ?>
            </td>
            <td>
                <input type="text" name="ordering[<?=$row->id;
        ?>]" value="<?=$row->ordering ?>" />
            </td>
        </tr>
        <?php
        $k = 1 - $k;
    }
    ?>
    </table>
</div>

<input type="hidden" name="option" value="com_pvliveresults" />
<input type="hidden" name="id" value="<?=$election->id; ?>" />
<input type="hidden" name="task" value="update" />
<input type="hidden" name="boxchecked" value="0" />
<input type="hidden" name="controller" value="election" />
<?php echo JHTML::_('form.token');?>
</form>
