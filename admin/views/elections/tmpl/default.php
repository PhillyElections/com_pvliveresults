<?php defined('_JEXEC') or die('Restricted access'); ?>
<form action="index.php" method="post" name="adminForm">
<div id="editcell">
	<table class="adminlist">
	<thead>
		<tr>
			<th width="5">
				<?=JText::_( 'ID' ); ?>
			</th>
			<th width="20">
				<input type="checkbox" name="toggle" value="" onclick="checkAll(<?=count( $this->items ); ?>);" />
			</th>
			<th>
				<?=JText::_( 'NAME' ); ?>
			</th>
			<th>
				<?=JText::_( 'DATE' ); ?>
			</th>
			<th>
				<?=JText::_( 'ORDER' ); ?>
			</th>
			<th>
				<?=JText::_( 'PUBLISHED' ); ?>
			</th>
			<th>
				<?=JText::_( 'CREATED' ); ?>
			</th>
			<th>
				<?=JText::_( 'MODIFIED' ); ?>
			</th>
		</tr>
	</thead>
	<?php
	$k = 0;
	for ($i=0, $n=count( $this->items ); $i < $n; $i++)	{
		$row = &$this->items[$i];
		$link = JRoute::_( 'index.php?option=com_pvliveresults&controller=election&task=edit&cid[]='. $row->id );
		?>
		<tr class="<?="row$k"; ?>">
			<td>
				<?=$row->id; ?>
			</td>
			<td>
				<?=JHTML::_('grid.id',   $i, $row->id ); ?>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->name; ?></a>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->date; ?></a>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->order; ?></a>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->published; ?></a>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->created; ?></a>
			</td>
			<td>
				<a href="<?=$link; ?>"><?=$row->modified; ?></a>
			</td>
		</tr>
		<?php
		$k = 1 - $k;
	}
	?>
	</table>
</div>

<input type="hidden" name="option" value="com_pvliveresults" />
<input type="hidden" name="task" value="" />
<input type="hidden" name="boxchecked" value="0" />
<input type="hidden" name="controller" value="elections" />
</form>
