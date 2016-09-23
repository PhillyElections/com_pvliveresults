<?php
defined('_JEXEC') or die('Restricted access');

$pagination = &$this->pagination;
$elections = &$this->elections;
d($pagination);

jimport( 'joomla.html.pagination' );
jimport( 'joomla.html.html' );

?>
<form action="index.php" method="post" name="adminForm">
<div id="editcell">
    <table class="adminlist">
        <thead>
            <tr>
                <th width="5">
                    <?=JText::_('ID'); ?>
                </th>
                <th width="5">
                    <input type="checkbox" name="toggle" value="" onclick="checkAll(<?=count($elections); ?>);" />
                </th>
                <th width="5">
                    <?=JText::_('ORDER'); ?>
                    <?=JHTML::_('grid.order',  $elections ); ?>
                </th>
                <th>
                    <?=JText::_('NAME'); ?>
                </th>
                <th width="30">
                    <?=JText::_('DATE'); ?>
                </th>
                <th width="20">
                    <?=JText::_('PUBLISHED'); ?>
                </th>
                <th width="20">
                    <?=JText::_('CREATED'); ?>
                </th>
                <th width="20">
                    <?=JText::_('MODIFIED'); ?>
                </th>
            </tr>
        </thead>
        <tbody>
    <?php
    $k = 0;
    for ($i = 0, $n = count($elections); $i < $n; ++$i) {
        $row = &$elections[$i];
        $link = JRoute::_('index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='.$row->id); ?>
            <tr class="<?="row$k"; ?>">
                <td>
                    <?=$row->id; ?>
                </td>
                <td>
                    <?=JHTML::_('grid.id', $i, $row->id); ?>
                </td>
                <td>
                    <input size="2" type="text" name="order[<?=$row->id ;?>]" value="<?=$row->ordering ?>" />
                </td>
                <td>
                    <a href="<?=$link; ?>"><?=$row->name; ?></a>
                </td>
                <td>
                    <?=$row->date; ?>
                </td>
                <td>
                    <?=JHTML::_('grid.published', $row, $i );?>
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
<?php echo JHTML::_( 'form.token' ); ?>
</form>