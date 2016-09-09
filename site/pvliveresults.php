<?php
/**
 * Bootstrap file for PVLiveResults
 * 
 * @package    Philadelphia.Votes
 * @subpackage Components
 * @license        GNU/GPL
 */

$document = JFactory::getDocument();
$document->addStyleSheet('components/com_pvshareddata/map.css');
$document->addStyleSheet('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');

$document->addCustomTag('<!--[if lt IE 9]>
    <script src="components/com_pvshareddata/resources/js/jquery.1.0.10.js"></script>
    <![endif]-->
    <!--[if gte IE 9]><!-->
    <script src="//codeorigin.jquery.com/jquery-2.0.3.min.js"></script>
    <!--<![endif]-->');
	$document->addCustomTag('
    <script src="components/com_pvshareddata/resources/js/json2.js"></script>
   ');
	
$document->addCustomTag('<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>');
//$document->addStyleSheet('//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css');

/* 
	**
	** Adding css and JS files for fancy box 
	**
 */
	
	//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>');
	
	//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/fancybox/source/jquery.fancybox.js?v=2.1.5"></script>');
	
	//$document->addCustomTag('');
	$document->addStyleSheet('components/com_pvshareddata/resources/fancybox/source/jquery.fancybox.css?v=2.1.5');
	
	//Add Button helper (this is optional)
	//$document->addStyleSheet('components/com_pvshareddata/resources/fancybox/source/helpers/jquery.fancybox-buttons.css?v=1.0.5');
	//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/fancybox/source/helpers/jquery.fancybox-buttons.js?v=1.0.5"></script>');

	// Add Thumbnail helper (this is optional) -->
	//$document->addStyleSheet('components/com_pvshareddata/resources/fancybox/source/helpers/jquery.fancybox-thumbs.css?v=1.0.7');
	//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/fancybox/source/helpers/jquery.fancybox-thumbs.js?v=1.0.7"></script>');

require_once (JPATH_COMPONENT.DS.'helpers'.DS.'jsjtext'.'.php');
		jsJText::script('YOUR POLLING PLACE');
		jsJText::script('WARD');
		jsJText::script('DIVISION');
		jsJText::script('P_LOCATION');
		jsJText::script('P_ADDRESS');
		jsJText::script('P_ACCESSIBILITY');
		jsJText::script('P_PARKING');
		jsJText::script('DIRECTIONS');
		jsJText::script('WALKING');
		jsJText::script('BICYCLING');
		jsJText::script('DRIVING');
		jsJText::script('DISCLAIMER');
		jsJText::script('EMAIL');
		jsJText::script('WEBSITE');
		jsJText::script('MORE INFORMATION');
		jsJText::script('MAIN OFFICE');
		jsJText::script('LOCAL OFFICE');
		jsJText::script('PHONE');
		jsJText::script('FAX');
		jsJText::script('OFFICE_ADDRESS');
		jsJText::script('ALTERNATE ENTRANCE');
		jsJText::script('BUILDING SUBSTANTIALLY ACCESSIBLE');
		jsJText::script('ACCESSIBLE WITH RAMP');
		jsJText::script('BUILDING ACCESSIBILITY MODIFIED');
		jsJText::script('BUILDING FULLY ACCESSIBLE');
		jsJText::script('BUILDING NOT ACCESSIBLE');
		jsJText::script('NO PARKING');
		jsJText::script('HANDICAP PARKING');
		jsJText::script('LOADING ZONE');
		jsJText::script('GENERAL PARKING');
		jsJText::script('ELECTION RESULT');
		jsJText::script('ADVANCE ANALYSIS');
		jsJText::script('BAR CHART');
		jsJText::script('DISTRICT_WIDE_RESULTS');
		jsJText::script('CANDIDATE HEADER');
		jsJText::script('PARTY HEADER');
		jsJText::script('VOTES HEADER');
		jsJText::script('PERCENTAGE HEADER');
		jsJText::script('WARD_WIDE_RESULTS');
		jsJText::script('WARD_DIVISION_WIDE_RESULTS');
		jsJText::script('ELECTION RESULT HEADER');
		jsJText::script('EXPORT EMPTY');
		jsJText::script('RAW DATA');
		jsJText::script('SELECT CRITERIA ERROR MESSAGE');
		jsJText::script('BACK TO MAP');
		jsJText::script('VOTES TOOLTIP');
		jsJText::script('VOTES BARCHART LABEL');
		jsJText::script('MAP LEGEND TOOLTIP');
		jsJText::script('ADV ELECTION YEAR');
		jsJText::script('ADV ELECTION OFFICE');
		jsJText::script('ADV ELECTION CANDIDATE');
		jsJText::script('ADV ELECTION WARD');
		jsJText::script('ADV ELECTION DIVISION');
		jsJText::script('ADV ELECTION TYPE');
		jsJText::script('ADV ELECTION SELECT BTN');
		jsJText::script('ADV ELECTION CLEAR BTN');
		jsJText::script('ADVANCE ANALYSIS DATASET HEADER');
		jsJText::script('ADVANCE ANALYSIS LENGTH ERROR MSG');
		jsJText::script('COL WARD');
		jsJText::script('COL DIVISION');
		jsJText::script('DIVISION MAP HEADRE');
		jsJText::script('PLEASE UPDATE YOUR BROWSER');
		jsJText::script('DELETE CANDIDATE POPUP');
		jsJText::script('ADVANCE ANALYSIS CANDIDATE HEADER');
		jsJText::script('ADVANCE ANALYSIS INNER TEXT');
		jsJText::script('ADVANCE CLICK TO FIND CANDIDATE');
		jsJText::script('FANCYBOX SELECT CANDIDATE');
		jsJText::script('FANCYBOX SELECT CANDIDATE TEXT');
		jsJText::script('ATLEAST TWO CANDIDATES');
		jsJText::script('FANCYBOX DOWNLOAD TEXT');
		jsJText::script('GRAND TOTAL OF VOTES CAST');
		jsJText::script('VOTES CAST BY WARD');
		jsJText::script('VOTES CAST BY DIVISION');
	
	// after all the strings are listed, call jsJText::load()
	jsJText::load();
//$document->addStyleSheet('components/com_pvshareddata/lib/select2-3.4.3/select2.css');

//For Column Charts 
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/amcharts/amcharts.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/amcharts/serial.js"></script>');
//For Pie Charts
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/amcharts/pie.js"></script>');

//For Maps worldLow
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/wards.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/ammap.js"></script>');
/* $document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/state.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/franceLow.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/worldLow.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/ammaps/continentsLow.js"></script>'); */

$document->addStyleSheet('components/com_pvshareddata/resources/ammaps/ammap.css');
// FONT AWESOME CSS
//$document->addStyleSheet('components/com_pvshareddata/resources/css/font-awesome.min.css');

$document->addStyleSheet('//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');


// FUELUX CSS & Js
$document->addStyleSheet('components/com_pvshareddata/resources/css/bootstrap.min.css');
$document->addCustomTag('<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>');

// FUELUX CSS & JS
$document->addStyleSheet('components/com_pvshareddata/resources/css/fuelux.min.css');

$document->addStyleSheet('components/com_pvshareddata/resources/css/custom.css');
$document->addStyleSheet('components/com_pvshareddata/resources/css/iosOverlay.css');
$document->addStyleSheet('components/com_pvshareddata/resources/css/prettify.css');

$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/fuelux.min.js"></script>');

$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/jquery-ui.js"></script>');

//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/map.js"></script>');

//$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/worldLow.js"></script>');

$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/modernizr-2.0.6.min.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/iosOverlay.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/spin.min.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/prettify.js"></script>');
$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/resources/js/custom.js"></script>');



$document->addCustomTag('<script type="text/javascript" src="components/com_pvshareddata/voterApp.js"></script>');
?>
<?php //echo $document->language; die;?>
<?php
	$db = &JFactory::getDBO();
	$candidate_html = "";
	//Wards and Division Array Creation
	$query = "SELECT ward,ward_id,svg FROM #__division_svg ";
	$db->setQuery($query);
	$division_svgs = $db->loadAssocList();
	
	$query = "SELECT ward_no,svg FROM #__wards_svg ";
	$db->setQuery($query);
	$ward_svgs = $db->loadAssocList();
	
	$query = "SELECT introtext FROM #__content where alias='ballotbox-election-result-".$document->language."' ";
	$db->setQuery($query);
	$election_result_text = $db->loadAssocList();
	
	$query = "SELECT introtext FROM #__content where alias='ballotbox-advance-analysis-".$document->language."' ";
	$db->setQuery($query);
	$ballotbox_advance_analysis_text = $db->loadAssocList();
	
	$query = "SELECT introtext FROM #__content where alias='ballotbox-raw-data-".$document->language."' ";
	$db->setQuery($query);
	$ballotbox_raw_data_text = $db->loadAssocList();
	//Election Year
	$query = "SELECT id , e_year FROM #__pv_live_election_year WHERE published=1 ORDER BY election_date desc";
	$db->setQuery($query);
	$year_result = $db->loadAssocList();
	
	$year_li = '';
	
	foreach($year_result as $key=>$value){
		$year_li.=  '<li data-value="'.$value['id'].'"><a href="#">'.$value['e_year'].'</a></li>';
	}
	$office_li = '';
	if(isset($year_result[0])){
		$query = "SELECT id,name FROM #__pv_live_offices WHERE published=1 and election_id = '".$year_result[0]['id']."' and published=1 ORDER BY publish_order";
		$db->setQuery($query);
		$resultOffice = $db->loadAssocList();
		
		foreach($resultOffice as $key=>$value){
			$office_li.='<li data-value="'.$value['id'].'"><a href="#">'.$value['name'].'</a></li>';
		}
	}
	$ward_li = '';
	if(isset($resultOffice[0])){
		$query = "SELECT name,id FROM #__pv_live_wards WHERE published=1 and office_id = '".$resultOffice[0]['id']."'  ORDER BY name";
		
		$db->setQuery($query);
		$resultWard = $db->loadAssocList();
		if(count($resultWard) > 0){
			$ward_li.='<li data-value="'.$value.'"><a href="#">All</a></li>';
		}
		foreach($resultWard as $key=>$value){
			$ward_li.='<li data-value="'.$value['id'].'"><a href="#">'.$value['name'].'</a></li>';
		}
		
		$query = "SELECT name,id FROM #__pv_live_candidate WHERE published=1 and office_id='".$resultOffice[0]['id']."' ORDER BY name";
		$cand_str = '[';
		$db->setQuery($query);
		$resultCandidate = $db->loadAssocList();
		foreach($resultCandidate as $key=>$value){
			//$ward_li.='<li data-value="'.$value['id'].'"><a href="#">'.$value['name'].'</a></li>';
			$candidate_html.='<input type="checkbox" name="vehicle" value="'.$value['id'].'">'.$value['name'].'<br>';
		}
		
	}
	//Wards start
	
	$type_option = array();
	$type_option[] = JHTML::_( 'select.option', '' , 'All' );
	$type_option[] = JHTML::_( 'select.option', 'A' , 'Absentee' );
	$type_option[] = JHTML::_( 'select.option', 'M' , 'Machine' );
	$type_option[] = JHTML::_( 'select.option', 'P' , 'Provisional' );
?>

<!--[if lt IE 7]>
<style media="screen" type="text/css">
.col1 {
  width:100%;
}
</style>
<![endif]-->

<!--
<style>
  #target {
    width: 345px;
  }
</style>
-->

<script type="text/javascript">
  var baseUri = "<?php echo JURI::base(); ?>";
  
  var divisions_list = <?php echo json_encode($division_svgs);?>;
  var wards_list 	 = <?php echo json_encode($ward_svgs);?>;
  
  var initialElectionYears , initialElectionOffice , initialElectionWard ,initialElectionCandidate;
  
  initialElectionYears 	= <?php echo json_encode($year_result); ?>;
  initialElectionOffice = <?php echo json_encode($resultOffice); ?>;
  initialElectionWard 	= <?php echo json_encode($resultWard); ?>;
  initialElectionCandidate = <?php echo json_encode($resultCandidate); ?>;

  
  
	wardDivision = new Array;
	divisions_list.forEach(function(v) {
	  var ward_id = parseInt(v["ward_id"].substring(2));
	   var ward = parseInt(v["ward"]);
	  //console.log(ward_id);
	  if(typeof wardDivision[ward] == 'undefined')
	  wardDivision[ward] = new Array;
	  wardDivision[ward][ward_id] = new Array; //
	  wardDivision[ward][ward_id]['path'] = v['svg'];
	});

</script>
<div id="inline1" style="width:295px;display: none;">
	<h3 class="text-center"><?php echo JText::_('FANCYBOX SELECT CANDIDATE');?></h3>
	<p class="s-candidate">
		<?php echo JText::_('FANCYBOX SELECT CANDIDATE TEXT'); ?>
	</p>
	<br/>
	<div id="fancybox-inner-div" class="s-candidate-inner">
		
	</div>
	<div id="fancybox-close" class="cstm-fancybox-close"> 
		<input type="button" id="btn-analysis-search" onclick="addCurrentDataSet()" value="Select" name="Select">
	</div>
</div>

<div id="cstm_voterApp"  class="colmask leftmenu">
<div class="col2">
          <!-- Column 1 start -->
          <div id="menu-logo"></div>
          <div class="clear"></div>
          <div id="polling-place" class="cstm_sidebar">
		  <div id="overlay" style="display:none; position:absolute; left: 0; right: 0; bottom: 0; top: 0; background: rgba(0,0,0,0.7); z-index:11;"><div id="dialog" title="Accessing requested data…">
			<div id="progressbar"><div class="progress-label">Loading...</div></div>
		</div></div>
		  
            <div id="polling-place-intro" class="art-postcontent">
              <h3><?php echo JText::_( 'ELECTION RESULT SIDEBAR HEADER' ); ?></h3>
              <p><?php echo JText::_( 'CHOOSE ELECTION HEADER' ); ?></p>
            </div>
			<!-- Mine code start from here.Create dynamic dropdown populated form controller -->
			<form id="ajax_form_simple" name="ajax_form_simple">
				<input type="hidden" name="dd_year" id="dd_year">
				<input type="hidden" name="dd_office" id="dd_office">
				<input type="hidden" name="dd_ward" id="dd_ward">
				<input type="hidden" name="dd_division" id="dd_division">
				<input type="hidden" name="dd_type" id="dd_type">
			</form>
            <form id="form_election_result" name="form_election_result">
            
                <div id="ajax_year" class="pull-right" style="display:none;"><i class="fa fa-spinner icon-4x fa-spin"></i></div>
			<?php echo "<b>".JText::_( 'ELECTION YEAR CRITERIA' )." :</b>"; ?>	
            <div id="year_dd">
				<div data-initialize="combobox" class="input-group input-append dropdown combobox cstm_combo">
					<input type="text" name="dd_year" autocomplete="off" class="form-control">
					<div  class="input-group-btn">
						<button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><i class="fa fa-chevron-down"></i>
						</button>
						<ul  class="dropdown-menu dropdown-menu-right cstm_adjust" style="width: 219px;">
							<?php echo $year_li; ?>
						</ul>
					</div>
				</div>
			
			</div>
			<div id="ajax_office" style="display:none;" class="pull-right"><i class="fa fa-spinner icon-4x fa-spin"></i></div>
			<?php echo "<b>".JText::_( 'COL OFFICE' )." :</b>"; ?>
			<div id="office_dd">
				<div data-initialize="combobox" class="input-group input-append dropdown combobox cstm_combo">
					<input type="text" name="dd_office" autocomplete="off" class="form-control">
					<div  class="input-group-btn">
						<button  data-toggle="dropdown" class="btn btn-default dropdown-toggle"><i class="fa fa-chevron-down"></i>
						</button>
						<ul  class="dropdown-menu dropdown-menu-right cstm_adjust">
							<?php echo $office_li; ?>
						</ul>
					</div>
				</div>				         
            </div> 
            
			<div id="ajax_ward" style="display:none;" class="pull-right"><i class="fa fa-spinner icon-4x fa-spin"></i></div>
			<?php echo "<b>".JText::_( 'COL WARD' )." :</b>"; ?>
			
			<div id="ward_dd">
				<div data-initialize="combobox" class="input-group input-append dropdown combobox cstm_combo">
					<input type="text"  name="dd_ward" autocomplete="off" class="form-control">
					<div  class="input-group-btn">
						<button  data-toggle="dropdown" class="btn btn-default dropdown-toggle"><i class="fa fa-chevron-down"></i>
						</button>
						<ul  class="dropdown-menu dropdown-menu-right cstm_adjust" style="width: 219px;">
							<?php echo $ward_li; ?>
						</ul>
					</div>
				</div>				
            </div>
			<div id="ajax_division" style="display:none;" class="pull-right"><i class="fa fa-spinner icon-4x fa-spin"></i></div>
            
			<?php echo "<b>".JText::_( 'COL DIVISION' )." :</b>"; ?>
			<div id="division_dd">
				<div class="input-group input-append dropdown combobox cstm_combo" data-initialize="combobox" id="myCombobox">
				  <input type="text" class="form-control" value="">
				  <div class="input-group-btn">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
						<i class="fa fa-chevron-down"></i>
					</button>
					<ul class="dropdown-menu dropdown-menu-right">
					  <li data-value=""><a href="#"></a></li>
					</ul>
				  </div>
				</div>
            </div>
            <?php echo "<b>".JText::_( 'COL TYPE' )." :</b>"; ?>
            <div class="input-group input-append dropdown combobox cstm_combo" data-initialize="combobox" id="myCombobox">
              <input type="text" class="form-control" value="" name="dd_type">
              <div class="input-group-btn">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                	<i class="fa fa-chevron-down"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li data-value="" data-selected="true"><a href="#">All</a></li>
                  <li data-value="A"><a href="#">Absentee</a></li>
                  <li data-value="M"><a href="#">Machine</a></li>
                  <li data-value="P"><a href="#">Provisional</a></li>
                </ul>
              </div>
            </div>
			<div id="ajax_loader" style="display:none" class="pull-right">
				<i class="fa fa-spinner icon-4x fa-spin"></i>
			</div>
			<input type="button" onclick="perform_search()" value="<?php echo JText::_( 'BUTTON SUBMIT' ); ?>" name="Submit" id="btn_basic_search">
			</form>
			<div id="polling-place-main"></div>
          </div>
          <div id="elected-officials" class="cstm_sidebar" style="display:none;">
            <div id="elected-officials-intro" class="art-postcontent">
              <h3><?php echo JText::_( 'ADVANCE ANALYSIS INTRO HEADER' ); ?></h3>
				<p><?php echo JText::_( 'ADVANCE ANALYSIS INTRO TEXT' ); ?></p>
            </div>
            <!--*********************************************************************-->
			 <div id="elected-officials-intro" class="art-postcontent">
              <h3><?php echo JText::_( 'ADVANCE ANALYSIS CANDIDATE HEADER' ); ?></h3>
            </div>
            <div id="cstm_data_advance">
				<p id="analyze-inner-text"><?php echo JText::_( 'ADVANCE ANALYSIS INNER TEXT' ); ?></p>
				<form id="cstm_data_form" name="cstm_data_form"></form>
			</div>
			
			<a class="add_to_accordion_list text-center fancybox" href="#inline1"  title="Lorem ipsum dolor sit amet"><i class="fa fa-plus-circle" style="margin-right:2px"> <!-- onclick="createAccordionDiv()"> --></i><?php echo JText::_('ADVANCE CLICK TO FIND CANDIDATE'); ?></a>
			<div class="pull-right" style="display:none" id="ajax_loader_advance">
				<i class="fa fa-spinner icon-4x fa-spin"></i>
			</div>
			<input type="button" name="<?php echo JText::_( 'BTN ANALYSIS' ); ?>" value="<?php echo JText::_( 'BTN ANALYSIS' ); ?>" onclick="doAdvanceSearch()" id="btn-analysis-search">
			<input type="button" name="<?php echo JText::_( 'ADV ELECTION CLEAR BTN' ); ?>" value="<?php echo JText::_( 'ADV ELECTION CLEAR BTN' ); ?>" onclick="doAdvanceSearchClear()" id="btn-analysis-clear">
            <div id="elected-officials-info">
              <h3><?php echo JText::_( 'ADVANCE ANALYSIS INTRO HEADER' ); ?></h3>
				<?php echo JText::_( 'ADVANCE ANALYSIS INTRO TEXT' ); ?>
              
            </div>
          </div>
          <div id="maps" class="cstm_sidebar">
            <div id="cstm-maps-intro"  class="art-postcontent">
              <h3><?php echo JText::_( 'DOWNLOAD CSV HEADER' ); ?></h3>
             
              <p><?php echo JText::_( 'DOWNLOAD CSV TEXT' ); ?></p>
            </div>
           
            
            <div id="cstm-maps-custom-info">
				<form id="export_data_form" name="export_data_form" method="POST" action="index.php?option=com_divisions&view=csv_download" target="_blank">
					<b><?php echo JText::_( 'YEAR' ); ?></b>
					<div id="csv_download_dd">
						<div data-initialize="combobox" class="input-group input-append dropdown combobox cstm_combo">
							<input type="text" name="dd_csv_download" autocomplete="off" class="form-control">
							<div class="input-group-btn open">
								<button data-toggle="dropdown" class="btn btn-default dropdown-toggle"><i class="fa fa-chevron-down"></i>
								</button>
								<ul class="dropdown-menu dropdown-menu-right cstm_adjust" style="width: 219px;">
									<?php echo $year_li ; ?>
								</ul>
							</div>
						</div>
					</div>
					<input type="hidden" name="export_year" id="export_year" value="">
					<input type="button" id="btn_download_csv" name="Download" value="<?php echo JText::_( 'DOWNLOAD BUTTON' ); ?>" onclick="raw_download_csv()">
				</form>
              
              
            </div>
          </div>
          <!-- Column 1 end -->
        </div>
     <div class="col1">
              <!-- Column 2 start -->
              <!-- <div id="panel">
                <p class="address">?php echo JText::_( 'USER ADDRESS' ); ?> <input id="target" type="text" placeholder="?php echo JText::_( 'PLACEHOLDER' ); ?>"></p>
              </div> -->
              <div class="clear"></div>
              
              <!--TAB NAVS-->
              <div id="nav">
                <ul>
                  <li class="active" id="nav-polling-place"><a href="javascript:void(0)"><?php echo JText::_( 'ELECTION RESULT' ); ?></a></li>
                  <li id="nav-elected-officials" ><a href="javascript:void(0)"><?php echo JText::_( 'ADVANCE ANALYSIS' ); ?></a></li>
                  <li id="nav-maps"><a href="javascript:void(0)"><?php echo JText::_( 'RAW DATA' ); ?></a></li>
                </ul>
              </div>
              
              <!--TAB CONTENT AREA-->
              <div id="elections_results" class="tab-content">
                <div class="art-postcontent">
                
                	<!--TAB CONTENT HEADING-->
                    <h1 id="mainNavHead"><?php echo JText::_( 'ELECTION RESULT HEADER' ); ?></h1>
                    
                    <!--ACTION TAB-->
                    <div class="tab-action-bar" id="simple_search">
                    	<div class="pull-left">
                        	<span class="label"><?php echo JText::_('VIEWS HEADER'); ?></span>
                            <a href="javascript:void(0)" class="view_list" title="<?php echo JText::_('LIST TOOLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-list-ul fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_map" title="<?php echo JText::_('MAP TOOLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-map-marker fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_bar_graph" title="<?php echo JText::_('BAR CHART TOOLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-bar-chart-o fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_pie_chart" title="<?php echo JText::_('PIE CHART TOOLTIP'); ?>"  onclick="renderView(this)"><i class="fa fa-pie-chart fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="active view_info enabled_class" title="<?php echo JText::_('INSTRUCTIONS TOOLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-info-circle fa-lg fa-fw"></i></a>
                        </div>
                        <div class="pull-right">
                        	<span class="label"><?php echo JText::_( 'ACTIONS HEADER' ); ?></span>
                            <a href="javascript:void(0)" class="view_list enabled_class" title="<?php echo JText::_('PRINT TOOTLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-print fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_map" title="<?php echo JText::_('DOWNLOAD TOOLTIP'); ?>" onclick="renderView(this)"><i class="fa fa-cloud-download fa-lg fa-fw"></i></a>
                        </div>
                    </div>
                    
                    <!--TAB MAIN CONTENT-->
                    
                        <!--TAB CONTENT FOR INSTRUCTIONS-->
                        <div id="content-instructions" style="width: 100%; min-height: 400px;">
                            <h3><?php echo JText::_('INSTRUCTIONS HEADING_RAWDATA'); ?></h3>
                            <?php echo $election_result_text[0]['introtext'] ; ?>
                        </div>
                        
                        <!--TAB CONTENT FOR MAP VIEW-->
                        <div id="content-map-view" style="display:none;">
                            <h3>City wide results</h3>
                            <img src="components/com_pvshareddata/resources/images/map.png" width="100%" height="auto" />
                        </div>

                </div>
              </div>
			  <!-- Second Tab -->
			   <div id="advance_elections_results" class="tab-content" style="display:none;">
                <div class="art-postcontent">
                
                	<!--TAB CONTENT HEADING-->
                    <h1 id="mainNavHead"><?php echo JText::_( 'ADVANCE ANALYSIS MAIN HEADER' ); ?></h1>
                    
                    <!--ACTION TAB-->
                    <div class="tab-action-bar" id="advance_search">
                    	<div class="pull-left">
                        	<span class="label"><?php echo JText::_('VIEWS HEADER'); ?></span>
                            <a href="javascript:void(0)" class="view_list" title="<?php echo JText::_('LIST TOOLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-list-ul fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_map" title="<?php echo JText::_('MAP TOOLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-map-marker fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_bar_graph" title="<?php echo JText::_('BAR CHART TOOLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-bar-chart-o fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_pie_chart" title="<?php echo JText::_('PIE CHART TOOLTIP'); ?>"  onclick="renderAdvanceView(this)"><i class="fa fa-pie-chart fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="active view_info enabled_class" title="<?php echo JText::_('INSTRUCTIONS TOOLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-info-circle fa-lg fa-fw"></i></a>
                        </div>
                        <div class="pull-right">
                        	<span class="label"><?php echo JText::_( 'ACTIONS HEADER' ); ?></span>
                            <a href="javascript:void(0)" class="view_list enabled_class" title="<?php echo JText::_('PRINT TOOTLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-print fa-lg fa-fw"></i></a>
                            <a href="javascript:void(0)" class="view_map" title="<?php echo JText::_('DOWNLOAD TOOLTIP'); ?>" onclick="renderAdvanceView(this)"><i class="fa fa-cloud-download fa-lg fa-fw"></i></a>
                        </div>
                    </div>
                    
                    <!--TAB MAIN CONTENT-->
                    
                        <!--TAB CONTENT FOR INSTRUCTIONS-->
                        <div id="advance-content-instructions" style="width: 100%; min-height: 400px;overflow:visible">
                            <h3><?php echo JText::_('ADVANCE ANALYSIS HEADER'); ?></h3>
                            <?php echo $ballotbox_advance_analysis_text[0]['introtext']; ?>
                        </div>
                        
                        
                </div>
              </div>
			  <!-- Column 3rd -->
			   <div id="download_csv_results" class="tab-content" style="display:none;">
                <div class="art-postcontent">
                
                	<!--TAB CONTENT HEADING-->
                    <h1 id="mainNavHead"><?php echo JText::_( 'DOWNLOAD RAWDATA HEADER' ); ?></h1>
                    
                   
                    
                    <!--TAB MAIN CONTENT-->
                    
                        <!--TAB CONTENT FOR INSTRUCTIONS-->
                        <div id="csv_content-instructions" style="width: 100%; min-height: 400px;">
                            <h3><?php echo JText::_('INSTRUCTIONS HEADING_RAWDATA'); ?></h3>
                            <?php echo $ballotbox_raw_data_text[0]['introtext']; ?>
                        </div>

                </div>
              </div>
              <!-- Column 2 end -->
            </div>
  <div class="art-footer-body" style="background-color:#8C887D!important;">
                <div class="art-footer-text">
                                        <div class="art-nostyle">
<p>
	Copyright © 2013. All Rights Reserved.</p></div>
                                    </div>
        <div class="cleared"></div>
    </div>   
</div>
<iframe id="myFrame" style="display:none"></iframe>
