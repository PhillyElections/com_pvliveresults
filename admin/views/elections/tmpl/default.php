<?php
defined('_JEXEC') or die('Restricted access');

$pagination = &$this->pagination;
$items = $this->items;

?>
<form action="index.php" method="post" name="adminForm">
<div id="editcell">
    <table class="adminlist">
        <thead>
            <tr>
                <th width="5">
                    <?=JText::_('ID'); ?>
                </th>
                <th width="20">
                    <input type="checkbox" name="toggle" value="" onclick="checkAll(<?=count($items); ?>);" />
                </th>
                <th>
                    <?=JText::_('NAME'); ?>
                </th>
                <th>
                    <?=JText::_('DATE'); ?>
                </th>
                <th>
                    <?=JText::_('ORDER'); ?>
                </th>
                <th>
                    <?=JText::_('PUBLISHED'); ?>
                </th>
                <th>
                    <?=JText::_('CREATED'); ?>
                </th>
                <th>
                    <?=JText::_('MODIFIED'); ?>
                </th>
            </tr>
        </thead>
        <tbody>
    <?php
    $k = 0;
    for ($i = 0, $n = count($items); $i < $n; ++$i) {
        $row = &$items[$i];
        $link = JRoute::_('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$row->id); ?>
            <tr class="<?="row$k"; ?>">
                <td>
                    <?=$row->id; ?>
                </td>
                <td>
                    <?=JHTML::_('grid.id', $i, $row->id); ?>
                </td>
                <td>
                    <a href="<?=$link; ?>"><?=$row->name; ?></a>
                </td>
                <td>
                    <a href="<?=$link; ?>"><?=$row->date; ?></a>
                </td>
                <td>
                    <?=$row->order; ?>
                </td>
                <td>
                    <?=$row->published; ?>
                </td>
                <td>
                    <?=$row->created; ?>
                </td>
                <td>
                    <?=$row->modified; ?>
                </td>
            </tr>
        <?php
        $k = 1 - $k;
    }
    ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="10"><?php echo $pagination->getListFooter(); ?></td>
            </tr>
        </tfoot>

    </table>
</div>
<input type="hidden" name="option" value="com_pvliveresults" />
<input type="hidden" name="task" value="" />
<input type="hidden" name="boxchecked" value="0" />
<input type="hidden" name="controller" value="elections" />
</form>
