//var jQuery_2_0_3 = $.noConflict(true);
var jQuery_2_0_3 = $.noConflict(true);

var getHash = function() { return window.location.hash.substring(1) };

var ie = /msie ([0-9]+)\.[0-9]+/.exec(navigator.userAgent.toLowerCase());

jQuery_2_0_3.support.cors = true;
//navigation
//
/* jQuery_2_0_3function() {
    var progressbar = jQuery_2_0_3( "#progressbar" ),
      progressLabel = $( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + 2 );
 
      if ( val < 99 ) {
        setTimeout( progress, 80 );
      }
    }
 
    setTimeout( progress, 1000 );
  }); */
  
  function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
        
      progressbar.progressbar( "value", val + 2 );
 
      if ( val < 99 ) {
        setTimeout( progress, 150 );
      }
    }
var progressbar;
jQuery_2_0_3( document ).ready(function() {
    /* jQuery_2_0_3( "#dialog" ).dialog({
    autoOpen: false,
    width: 400,

});
    
    jQuery_2_0_3( "#dialog" ).dialog( "open" );
    jQuery_2_0_3( "#overlay" ).show();
    //event.preventDefault();
var progressbar = jQuery_2_0_3( "#progressbar" ),
      progressLabel = jQuery_2_0_3( ".progress-label" );
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
      }
    });
 
   
 
    setTimeout( progress, 100 );
 */
jQuery_2_0_3('[data-toggle="tooltip"]').tooltip(); 
  progressbar = jQuery_2_0_3( "#progressbar" ),
  progressLabel = jQuery_2_0_3( ".progress-label" );
 
    
 
    
 
    //setTimeout( progress, 1000 );
 
 
  jQuery_2_0_3('#nav-polling-place').on("click", function() {
    activatePolling(wardDivision);
  });

  jQuery_2_0_3('#nav-elected-officials').on("click", function(){
    activateOfficials();
  });

  jQuery_2_0_3('#nav-maps').on("click", function(){
    activateMaps();
  });
  function activateMaps() {
    showMaps();
    return false;
  }

  function activateOfficials() {
    showOfficials();
   
    
    return false;
  }

  function activatePolling() {
    showPolling();
    return false;
  }

  var hashChanged = function() {
    // Allow direct linking
    var hash = getHash();
    if (hash === 'election-result') {
      showOfficials();
    } else if (hash === 'polling-place') {
      showPolling();
    } else if (hash === 'raw-data') {
      showMaps();
    }
  };

  if (("onhashchange" in window) && !ie) {
    jQuery_2_0_3(window).bind('hashchange', function() {
      hashChanged();
    });
  }
  else {
    var prevHash = window.location.hash;
    window.setInterval(function () {
      if (window.location.hash != prevHash) {
        hashChanged();
      }
    }, 100);
  }

  hashChanged();
});


//Adavcnce Search Variable List
var sortedWards;
var sortedWardsDivisions={};

var electionResultAd;

var minHeight = '500px';
var minHeightPie = '815px';
var maxHeight = '870px';
var ie = /msie ([0-9]+)\.[0-9]+/.exec(navigator.userAgent.toLowerCase());
var electionResult;
var barChartData;
var barChartDataAdvance;
var pieChartData;
var pieChartDataAdvance;
var instructionContent;
var instructionContentAdavnce;

//Variable for Header. Make them dynamic
var mainNavHeader;
var mainNavHeaderDefault;
var navHeader;
var dataSet;

var electionYears = [];
var cstmMapData   = [];
var electionYearsJson;
var listToDisplayHeader;
var listToDisplay       = ["name","party","formated_votes","votePercentage"];
var listToDownload      = ["name","party","total_votes","votePercentage"];
var requriedFormOne     = ["year_dd","office_dd"];
var requriedFormOneAd   = ["year_advance","office_advance","candidate_advance"];

var colors = ["#6794bc","#B21E1F","#fcee21","#C16601","#45C956","#21303C","#7F1616","#C9BE1A","#8E4B01","#339640","#4B6C89","#BF595A","#FCF36D","#CB883E","#87D291","#4C7382","#D6C9B5","#618FF2","#A90C57","#7C94BE"];

var chosenColors = [];
//Number Precions
var sig_digits = 2;

//
var invokedWard = [];
var candidateInElection = [];
var backIconSVG = "M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466zM27.436,17.39c0.001,0.002,0.004,0.002,0.005,0.004c-0.022,0.187-0.054,0.37-0.085,0.554c-0.015-0.012-0.034-0.025-0.047-0.036c-0.103-0.09-0.254-0.128-0.318-0.115c-0.157,0.032,0.229,0.305,0.267,0.342c0.009,0.009,0.031,0.03,0.062,0.058c-1.029,5.312-5.709,9.338-11.319,9.338c-4.123,0-7.736-2.18-9.776-5.441c0.123-0.016,0.24-0.016,0.28-0.076c0.051-0.077,0.102-0.241,0.178-0.331c0.077-0.089,0.165-0.229,0.127-0.292c-0.039-0.064,0.101-0.344,0.088-0.419c-0.013-0.076-0.127-0.256,0.064-0.407s0.394-0.382,0.407-0.444c0.012-0.063,0.166-0.331,0.152-0.458c-0.012-0.127-0.152-0.28-0.24-0.318c-0.09-0.037-0.28-0.05-0.356-0.151c-0.077-0.103-0.292-0.203-0.368-0.178c-0.076,0.025-0.204,0.05-0.305-0.015c-0.102-0.062-0.267-0.139-0.33-0.189c-0.065-0.05-0.229-0.088-0.305-0.088c-0.077,0-0.065-0.052-0.178,0.101c-0.114,0.153,0,0.204-0.204,0.177c-0.204-0.023,0.025-0.036,0.141-0.189c0.113-0.152-0.013-0.242-0.141-0.203c-0.126,0.038-0.038,0.115-0.241,0.153c-0.203,0.036-0.203-0.09-0.076-0.115s0.355-0.139,0.355-0.19c0-0.051-0.025-0.191-0.127-0.191s-0.077-0.126-0.229-0.291c-0.092-0.101-0.196-0.164-0.299-0.204c-0.09-0.579-0.15-1.167-0.15-1.771c0-2.844,1.039-5.446,2.751-7.458c0.024-0.02,0.048-0.034,0.069-0.036c0.084-0.009,0.31-0.025,0.51-0.059c0.202-0.034,0.418-0.161,0.489-0.153c0.069,0.008,0.241,0.008,0.186-0.042C8.417,8.2,8.339,8.082,8.223,8.082S8.215,7.896,8.246,7.896c0.03,0,0.186,0.025,0.178,0.11C8.417,8.091,8.471,8.2,8.625,8.167c0.156-0.034,0.132-0.162,0.102-0.195C8.695,7.938,8.672,7.853,8.642,7.794c-0.031-0.06-0.023-0.136,0.14-0.153C8.944,7.625,9.168,7.708,9.16,7.573s0-0.28,0.046-0.356C9.253,7.142,9.354,7.09,9.299,7.065C9.246,7.04,9.176,7.099,9.121,6.972c-0.054-0.127,0.047-0.22,0.108-0.271c0.02-0.015,0.067-0.06,0.124-0.112C11.234,5.257,13.524,4.466,16,4.466c3.213,0,6.122,1.323,8.214,3.45c-0.008,0.022-0.01,0.052-0.031,0.056c-0.077,0.013-0.166,0.063-0.179-0.051c-0.013-0.114-0.013-0.331-0.102-0.203c-0.089,0.127-0.127,0.127-0.127,0.191c0,0.063,0.076,0.127,0.051,0.241C23.8,8.264,23.8,8.341,23.84,8.341c0.036,0,0.126-0.115,0.239-0.141c0.116-0.025,0.319-0.088,0.332,0.026c0.013,0.115,0.139,0.152,0.013,0.203c-0.128,0.051-0.267,0.026-0.293-0.051c-0.025-0.077-0.114-0.077-0.203-0.013c-0.088,0.063-0.279,0.292-0.279,0.292s-0.306,0.139-0.343,0.114c-0.04-0.025,0.101-0.165,0.203-0.228c0.102-0.064,0.178-0.204,0.14-0.242c-0.038-0.038-0.088-0.279-0.063-0.343c0.025-0.063,0.139-0.152,0.013-0.216c-0.127-0.063-0.217-0.14-0.318-0.178s-0.216,0.152-0.305,0.204c-0.089,0.051-0.076,0.114-0.191,0.127c-0.114,0.013-0.189,0.165,0,0.254c0.191,0.089,0.255,0.152,0.204,0.204c-0.051,0.051-0.267-0.025-0.267-0.025s-0.165-0.076-0.268-0.076c-0.101,0-0.229-0.063-0.33-0.076c-0.102-0.013-0.306-0.013-0.355,0.038c-0.051,0.051-0.179,0.203-0.28,0.152c-0.101-0.051-0.101-0.102-0.241-0.051c-0.14,0.051-0.279-0.038-0.355,0.038c-0.077,0.076-0.013,0.076-0.255,0c-0.241-0.076-0.189,0.051-0.419,0.089s-0.368-0.038-0.432,0.038c-0.064,0.077-0.153,0.217-0.19,0.127c-0.038-0.088,0.126-0.241,0.062-0.292c-0.062-0.051-0.33-0.025-0.367,0.013c-0.039,0.038-0.014,0.178,0.011,0.229c0.026,0.05,0.064,0.254-0.011,0.216c-0.077-0.038-0.064-0.166-0.141-0.152c-0.076,0.013-0.165,0.051-0.203,0.077c-0.038,0.025-0.191,0.025-0.229,0.076c-0.037,0.051,0.014,0.191-0.051,0.203c-0.063,0.013-0.114,0.064-0.254-0.025c-0.14-0.089-0.14-0.038-0.178-0.012c-0.038,0.025-0.216,0.127-0.229,0.012c-0.013-0.114,0.025-0.152-0.089-0.229c-0.115-0.076-0.026-0.076,0.127-0.025c0.152,0.05,0.343,0.075,0.622-0.013c0.28-0.089,0.395-0.127,0.28-0.178c-0.115-0.05-0.229-0.101-0.406-0.127c-0.179-0.025-0.42-0.025-0.7-0.127c-0.279-0.102-0.343-0.14-0.457-0.165c-0.115-0.026-0.813-0.14-1.132-0.089c-0.317,0.051-1.193,0.28-1.245,0.318s-0.128,0.19-0.292,0.318c-0.165,0.127-0.47,0.419-0.712,0.47c-0.241,0.051-0.521,0.254-0.521,0.305c0,0.051,0.101,0.242,0.076,0.28c-0.025,0.038,0.05,0.229,0.191,0.28c0.139,0.05,0.381,0.038,0.393-0.039c0.014-0.076,0.204-0.241,0.217-0.127c0.013,0.115,0.14,0.292,0.114,0.368c-0.025,0.077,0,0.153,0.09,0.14c0.088-0.012,0.559-0.114,0.559-0.114s0.153-0.064,0.127-0.166c-0.026-0.101,0.166-0.241,0.203-0.279c0.038-0.038,0.178-0.191,0.014-0.241c-0.167-0.051-0.293-0.064-0.115-0.216s0.292,0,0.521-0.229c0.229-0.229-0.051-0.292,0.191-0.305c0.241-0.013,0.496-0.025,0.444,0.051c-0.05,0.076-0.342,0.242-0.508,0.318c-0.166,0.077-0.14,0.216-0.076,0.292c0.063,0.076,0.09,0.254,0.204,0.229c0.113-0.025,0.254-0.114,0.38-0.101c0.128,0.012,0.383-0.013,0.42-0.013c0.039,0,0.216,0.178,0.114,0.203c-0.101,0.025-0.229,0.013-0.445,0.025c-0.215,0.013-0.456,0.013-0.456,0.051c0,0.039,0.292,0.127,0.19,0.191c-0.102,0.063-0.203-0.013-0.331-0.026c-0.127-0.012-0.203,0.166-0.241,0.267c-0.039,0.102,0.063,0.28-0.127,0.216c-0.191-0.063-0.331-0.063-0.381-0.038c-0.051,0.025-0.203,0.076-0.331,0.114c-0.126,0.038-0.076-0.063-0.242-0.063c-0.164,0-0.164,0-0.164,0l-0.103,0.013c0,0-0.101-0.063-0.114-0.165c-0.013-0.102,0.05-0.216-0.013-0.241c-0.064-0.026-0.292,0.012-0.33,0.088c-0.038,0.076-0.077,0.216-0.026,0.28c0.052,0.063,0.204,0.19,0.064,0.152c-0.14-0.038-0.317-0.051-0.419,0.026c-0.101,0.076-0.279,0.241-0.279,0.241s-0.318,0.025-0.318,0.102c0,0.077,0,0.178-0.114,0.191c-0.115,0.013-0.268,0.05-0.42,0.076c-0.153,0.025-0.139,0.088-0.317,0.102s-0.204,0.089-0.038,0.114c0.165,0.025,0.418,0.127,0.431,0.241c0.014,0.114-0.013,0.242-0.076,0.356c-0.043,0.079-0.305,0.026-0.458,0.026c-0.152,0-0.456-0.051-0.584,0c-0.127,0.051-0.102,0.305-0.064,0.419c0.039,0.114-0.012,0.178-0.063,0.216c-0.051,0.038-0.065,0.152,0,0.204c0.063,0.051,0.114,0.165,0.166,0.178c0.051,0.013,0.215-0.038,0.279,0.025c0.064,0.064,0.127,0.216,0.165,0.178c0.039-0.038,0.089-0.203,0.153-0.166c0.064,0.039,0.216-0.012,0.331-0.025s0.177-0.14,0.292-0.204c0.114-0.063,0.05-0.063,0.013-0.14c-0.038-0.076,0.114-0.165,0.204-0.254c0.088-0.089,0.253-0.013,0.292-0.115c0.038-0.102,0.051-0.279,0.151-0.267c0.103,0.013,0.243,0.076,0.331,0.076c0.089,0,0.279-0.14,0.332-0.165c0.05-0.025,0.241-0.013,0.267,0.102c0.025,0.114,0.241,0.254,0.292,0.279c0.051,0.025,0.381,0.127,0.433,0.165c0.05,0.038,0.126,0.153,0.152,0.254c0.025,0.102,0.114,0.102,0.128,0.013c0.012-0.089-0.065-0.254,0.025-0.242c0.088,0.013,0.191-0.026,0.191-0.026s-0.243-0.165-0.331-0.203c-0.088-0.038-0.255-0.114-0.331-0.241c-0.076-0.127-0.267-0.153-0.254-0.279c0.013-0.127,0.191-0.051,0.292,0.051c0.102,0.102,0.356,0.241,0.445,0.33c0.088,0.089,0.229,0.127,0.267,0.242c0.039,0.114,0.152,0.241,0.19,0.292c0.038,0.051,0.165,0.331,0.204,0.394c0.038,0.063,0.165-0.012,0.229-0.063c0.063-0.051,0.179-0.076,0.191-0.178c0.013-0.102-0.153-0.178-0.203-0.216c-0.051-0.038,0.127-0.076,0.191-0.127c0.063-0.05,0.177-0.14,0.228-0.063c0.051,0.077,0.026,0.381,0.051,0.432c0.025,0.051,0.279,0.127,0.331,0.191c0.05,0.063,0.267,0.089,0.304,0.051c0.039-0.038,0.242,0.026,0.294,0.038c0.049,0.013,0.202-0.025,0.304-0.05c0.103-0.025,0.204-0.102,0.191,0.063c-0.013,0.165-0.051,0.419-0.179,0.546c-0.127,0.127-0.076,0.191-0.202,0.191c-0.06,0-0.113,0-0.156,0.021c-0.041-0.065-0.098-0.117-0.175-0.097c-0.152,0.038-0.344,0.038-0.47,0.19c-0.128,0.153-0.178,0.165-0.204,0.114c-0.025-0.051,0.369-0.267,0.317-0.331c-0.05-0.063-0.355-0.038-0.521-0.038c-0.166,0-0.305-0.102-0.433-0.127c-0.126-0.025-0.292,0.127-0.418,0.254c-0.128,0.127-0.216,0.038-0.331,0.038c-0.115,0-0.331-0.165-0.331-0.165s-0.216-0.089-0.305-0.089c-0.088,0-0.267-0.165-0.318-0.165c-0.05,0-0.19-0.115-0.088-0.166c0.101-0.05,0.202,0.051,0.101-0.229c-0.101-0.279-0.33-0.216-0.419-0.178c-0.088,0.039-0.724,0.025-0.775,0.025c-0.051,0-0.419,0.127-0.533,0.178c-0.116,0.051-0.318,0.115-0.369,0.14c-0.051,0.025-0.318-0.051-0.433,0.013c-0.151,0.084-0.291,0.216-0.33,0.216c-0.038,0-0.153,0.089-0.229,0.28c-0.077,0.19,0.013,0.355-0.128,0.419c-0.139,0.063-0.394,0.204-0.495,0.305c-0.102,0.101-0.229,0.458-0.355,0.623c-0.127,0.165,0,0.317,0.025,0.419c0.025,0.101,0.114,0.292-0.025,0.471c-0.14,0.178-0.127,0.266-0.191,0.279c-0.063,0.013,0.063,0.063,0.088,0.19c0.025,0.128-0.114,0.255,0.128,0.369c0.241,0.113,0.355,0.217,0.418,0.367c0.064,0.153,0.382,0.407,0.382,0.407s0.229,0.205,0.344,0.293c0.114,0.089,0.152,0.038,0.177-0.05c0.025-0.09,0.178-0.104,0.355-0.104c0.178,0,0.305,0.04,0.483,0.014c0.178-0.025,0.356-0.141,0.42-0.166c0.063-0.025,0.279-0.164,0.443-0.063c0.166,0.103,0.141,0.241,0.23,0.332c0.088,0.088,0.24,0.037,0.355-0.051c0.114-0.09,0.064-0.052,0.203,0.025c0.14,0.075,0.204,0.151,0.077,0.267c-0.128,0.113-0.051,0.293-0.128,0.47c-0.076,0.178-0.063,0.203,0.077,0.278c0.14,0.076,0.394,0.548,0.47,0.638c0.077,0.088-0.025,0.342,0.064,0.495c0.089,0.151,0.178,0.254,0.077,0.331c-0.103,0.075-0.28,0.216-0.292,0.47s0.051,0.431,0.102,0.521s0.177,0.331,0.241,0.419c0.064,0.089,0.14,0.305,0.152,0.445c0.013,0.14-0.024,0.306,0.039,0.381c0.064,0.076,0.102,0.191,0.216,0.292c0.115,0.103,0.152,0.318,0.152,0.318s0.039,0.089,0.051,0.229c0.012,0.14,0.025,0.228,0.152,0.292c0.126,0.063,0.215,0.076,0.28,0.013c0.063-0.063,0.381-0.077,0.546-0.063c0.165,0.013,0.355-0.075,0.521-0.19s0.407-0.419,0.496-0.508c0.089-0.09,0.292-0.255,0.268-0.356c-0.025-0.101-0.077-0.203,0.024-0.254c0.102-0.052,0.344-0.152,0.356-0.229c0.013-0.077-0.09-0.395-0.115-0.457c-0.024-0.064,0.064-0.18,0.165-0.306c0.103-0.128,0.421-0.216,0.471-0.267c0.051-0.053,0.191-0.267,0.217-0.433c0.024-0.167-0.051-0.369,0-0.457c0.05-0.09,0.013-0.165-0.103-0.268c-0.114-0.102-0.089-0.407-0.127-0.457c-0.037-0.051-0.013-0.319,0.063-0.345c0.076-0.023,0.242-0.279,0.344-0.393c0.102-0.114,0.394-0.47,0.534-0.496c0.139-0.025,0.355-0.229,0.368-0.343c0.013-0.115,0.38-0.547,0.394-0.635c0.013-0.09,0.166-0.42,0.102-0.497c-0.062-0.076-0.559,0.115-0.622,0.141c-0.064,0.025-0.241,0.127-0.446,0.113c-0.202-0.013-0.114-0.177-0.127-0.254c-0.012-0.076-0.228-0.368-0.279-0.381c-0.051-0.012-0.203-0.166-0.267-0.317c-0.063-0.153-0.152-0.343-0.254-0.458c-0.102-0.114-0.165-0.38-0.268-0.559c-0.101-0.178-0.189-0.407-0.279-0.572c-0.021-0.041-0.045-0.079-0.067-0.117c0.118-0.029,0.289-0.082,0.31-0.009c0.024,0.088,0.165,0.279,0.19,0.419s0.165,0.089,0.178,0.216c0.014,0.128,0.14,0.433,0.19,0.47c0.052,0.038,0.28,0.242,0.318,0.318c0.038,0.076,0.089,0.178,0.127,0.369c0.038,0.19,0.076,0.444,0.179,0.482c0.102,0.038,0.444-0.064,0.508-0.102s0.482-0.242,0.635-0.255c0.153-0.012,0.179-0.115,0.368-0.152c0.191-0.038,0.331-0.177,0.458-0.28c0.127-0.101,0.28-0.355,0.33-0.444c0.052-0.088,0.179-0.152,0.115-0.253c-0.063-0.103-0.331-0.254-0.433-0.268c-0.102-0.012-0.089-0.178-0.152-0.178s-0.051,0.088-0.178,0.153c-0.127,0.063-0.255,0.19-0.344,0.165s0.026-0.089-0.113-0.203s-0.192-0.14-0.192-0.228c0-0.089-0.278-0.255-0.304-0.382c-0.026-0.127,0.19-0.305,0.254-0.19c0.063,0.114,0.115,0.292,0.279,0.368c0.165,0.076,0.318,0.204,0.395,0.229c0.076,0.025,0.267-0.14,0.33-0.114c0.063,0.024,0.191,0.253,0.306,0.292c0.113,0.038,0.495,0.051,0.559,0.051s0.33,0.013,0.381-0.063c0.051-0.076,0.089-0.076,0.153-0.076c0.062,0,0.177,0.229,0.267,0.254c0.089,0.025,0.254,0.013,0.241,0.179c-0.012,0.164,0.076,0.305,0.165,0.317c0.09,0.012,0.293-0.191,0.293-0.191s0,0.318-0.012,0.433c-0.014,0.113,0.139,0.534,0.139,0.534s0.19,0.393,0.241,0.482s0.267,0.355,0.267,0.47c0,0.115,0.025,0.293,0.103,0.293c0.076,0,0.152-0.203,0.24-0.331c0.091-0.126,0.116-0.305,0.153-0.432c0.038-0.127,0.038-0.356,0.038-0.444c0-0.09,0.075-0.166,0.255-0.242c0.178-0.076,0.304-0.292,0.456-0.407c0.153-0.115,0.141-0.305,0.446-0.305c0.305,0,0.278,0,0.355-0.077c0.076-0.076,0.151-0.127,0.19,0.013c0.038,0.14,0.254,0.343,0.292,0.394c0.038,0.052,0.114,0.191,0.103,0.344c-0.013,0.152,0.012,0.33,0.075,0.33s0.191-0.216,0.191-0.216s0.279-0.189,0.267,0.013c-0.014,0.203,0.025,0.419,0.025,0.545c0,0.053,0.042,0.135,0.088,0.21c-0.005,0.059-0.004,0.119-0.009,0.178C27.388,17.153,27.387,17.327,27.436,17.39zM20.382,12.064c0.076,0.05,0.102,0.127,0.152,0.203c0.052,0.076,0.14,0.05,0.203,0.114c0.063,0.064-0.178,0.14-0.075,0.216c0.101,0.077,0.151,0.381,0.165,0.458c0.013,0.076-0.279,0.114-0.369,0.102c-0.089-0.013-0.354-0.102-0.445-0.127c-0.089-0.026-0.139-0.343-0.025-0.331c0.116,0.013,0.141-0.025,0.267-0.139c0.128-0.115-0.189-0.166-0.278-0.191c-0.089-0.025-0.268-0.305-0.331-0.394c-0.062-0.089-0.014-0.228,0.141-0.331c0.076-0.051,0.279,0.063,0.381,0c0.101-0.063,0.203-0.14,0.241-0.165c0.039-0.025,0.293,0.038,0.33,0.114c0.039,0.076,0.191,0.191,0.141,0.229c-0.052,0.038-0.281,0.076-0.356,0c-0.075-0.077-0.255,0.012-0.268,0.152C20.242,12.115,20.307,12.013,20.382,12.064zM16.875,12.28c-0.077-0.025,0.025-0.178,0.102-0.229c0.075-0.051,0.164-0.178,0.241-0.305c0.076-0.127,0.178-0.14,0.241-0.127c0.063,0.013,0.203,0.241,0.241,0.318c0.038,0.076,0.165-0.026,0.217-0.051c0.05-0.025,0.127-0.102,0.14-0.165s0.127-0.102,0.254-0.102s0.013,0.102-0.076,0.127c-0.09,0.025-0.038,0.077,0.113,0.127c0.153,0.051,0.293,0.191,0.459,0.279c0.165,0.089,0.19,0.267,0.088,0.292c-0.101,0.025-0.406,0.051-0.521,0.038c-0.114-0.013-0.254-0.127-0.419-0.153c-0.165-0.025-0.369-0.013-0.433,0.077s-0.292,0.05-0.395,0.05c-0.102,0-0.228,0.127-0.253,0.077C16.875,12.534,16.951,12.306,16.875,12.28zM17.307,9.458c0.063-0.178,0.419,0.038,0.355,0.127C17.599,9.675,17.264,9.579,17.307,9.458zM17.802,18.584c0.063,0.102-0.14,0.431-0.254,0.407c-0.113-0.027-0.076-0.318-0.038-0.382C17.548,18.545,17.769,18.529,17.802,18.584zM13.189,12.674c0.025-0.051-0.039-0.153-0.127-0.013C13.032,12.71,13.164,12.725,13.189,12.674zM20.813,8.035c0.141,0.076,0.339,0.107,0.433,0.013c0.076-0.076,0.013-0.204-0.05-0.216c-0.064-0.013-0.104-0.115,0.062-0.203c0.165-0.089,0.343-0.204,0.534-0.229c0.19-0.025,0.622-0.038,0.774,0c0.152,0.039,0.382-0.166,0.445-0.254s-0.203-0.152-0.279-0.051c-0.077,0.102-0.444,0.076-0.521,0.051c-0.076-0.025-0.686,0.102-0.812,0.102c-0.128,0-0.179,0.152-0.356,0.229c-0.179,0.076-0.42,0.191-0.509,0.229c-0.088,0.038-0.177,0.19-0.101,0.216C20.509,7.947,20.674,7.959,20.813,8.035zM14.142,12.674c0.064-0.089-0.051-0.217-0.114-0.217c-0.12,0-0.178,0.191-0.103,0.254C14.002,12.776,14.078,12.763,14.142,12.674zM14.714,13.017c0.064,0.025,0.114,0.102,0.165,0.114c0.052,0.013,0.217,0,0.167-0.127s-0.167-0.127-0.204-0.127c-0.038,0-0.203-0.038-0.267,0C14.528,12.905,14.65,12.992,14.714,13.017zM11.308,10.958c0.101,0.013,0.217-0.063,0.305-0.101c0.088-0.038,0.216-0.114,0.216-0.229c0-0.114-0.025-0.216-0.077-0.267c-0.051-0.051-0.14-0.064-0.216-0.051c-0.115,0.02-0.127,0.14-0.203,0.14c-0.076,0-0.165,0.025-0.14,0.114s0.077,0.152,0,0.19C11.117,10.793,11.205,10.946,11.308,10.958zM11.931,10.412c0.127,0.051,0.394,0.102,0.292,0.153c-0.102,0.051-0.28,0.19-0.305,0.267s0.216,0.153,0.216,0.153s-0.077,0.089-0.013,0.114c0.063,0.025,0.102-0.089,0.203-0.089c0.101,0,0.304,0.063,0.406,0.063c0.103,0,0.267-0.14,0.254-0.229c-0.013-0.089-0.14-0.229-0.254-0.28c-0.113-0.051-0.241-0.28-0.317-0.331c-0.076-0.051,0.076-0.178-0.013-0.267c-0.09-0.089-0.153-0.076-0.255-0.14c-0.102-0.063-0.191,0.013-0.254,0.089c-0.063,0.076-0.14-0.013-0.217,0.012c-0.102,0.035-0.063,0.166-0.012,0.229C11.714,10.221,11.804,10.361,11.931,10.412zM24.729,17.198c-0.083,0.037-0.153,0.47,0,0.521c0.152,0.052,0.241-0.202,0.191-0.267C24.868,17.39,24.843,17.147,24.729,17.198zM20.114,20.464c-0.159-0.045-0.177,0.166-0.304,0.306c-0.128,0.141-0.267,0.254-0.317,0.241c-0.052-0.013-0.331,0.089-0.242,0.279c0.089,0.191,0.076,0.382-0.013,0.472c-0.089,0.088,0.076,0.342,0.052,0.482c-0.026,0.139,0.037,0.229,0.215,0.229s0.242-0.064,0.318-0.229c0.076-0.166,0.088-0.331,0.164-0.47c0.077-0.141,0.141-0.434,0.179-0.51c0.038-0.075,0.114-0.316,0.102-0.457C20.254,20.669,20.204,20.489,20.114,20.464zM10.391,8.802c-0.069-0.06-0.229-0.102-0.306-0.11c-0.076-0.008-0.152,0.06-0.321,0.06c-0.168,0-0.279,0.067-0.347,0C9.349,8.684,9.068,8.65,9.042,8.692C9.008,8.749,8.941,8.751,9.008,8.87c0.069,0.118,0.12,0.186,0.179,0.178s0.262-0.017,0.288,0.051C9.5,9.167,9.569,9.226,9.712,9.184c0.145-0.042,0.263-0.068,0.296-0.119c0.033-0.051,0.263-0.059,0.263-0.059S10.458,8.861,10.391,8.802z";
//Global Try Catch 
window.onerror = function (message, filename, linenumber) { 
    //alert("JS error: " + message + " on line " + linenumber + " for " + filename);
}
jQuery_2_0_3(function() {
  jQuery_2_0_3(".art-sidebar1").hide();
});
jQuery_2_0_3( document ).ready(function() {
    jQuery(".fancybox").fancybox({
        'beforeLoad': prepareFBData,
        'width'     : 350,
        //'maxWidth': 1222,
    // other API options etc
    });
    
    //modal box for delete start from here
    
    
    //Tooltip Starts from here
    /* jQuery_2_0_3( ".view_list" ).tooltip();
    jQuery_2_0_3( ".view_map" ).tooltip();
    jQuery_2_0_3( ".view_bar_graph" ).tooltip();
    jQuery_2_0_3( ".view_pie_chart" ).tooltip();
    jQuery_2_0_3( ".view_info" ).tooltip();
    jQuery_2_0_3( ".view_info" ).tooltip(); */
    jQuery_2_0_3(".art-sidebar1").hide();
    //Tooltip end here
    //Tooltip Starts from here
    jQuery_2_0_3( "#cstm_accordion" ).accordion({
      collapsible: true,
      active: false
    });
    //jQuery_2_0_3('#groupAdv').accordion({header: '.tr_odd' });
    jQuery_2_0_3( "body" ).addClass('fuelux');
    //get Years on Ready
    //getElectionYears();
    jQuery_2_0_3("#division_dd").find('div[data-initialize]').combobox('disable');
    //jQuery_2_0_3("#ward_dd").find('div[data-initialize]').combobox('disable');
    
    
    //
    jQuery_2_0_3("#year_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#year_dd").find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        
        jQuery_2_0_3("#ajax_form_simple").find("input#dd_year").val(data.value);
        populateOffice();
    }); 
    jQuery_2_0_3("#office_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#csv_download_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#office_dd").find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        
        jQuery_2_0_3("#ajax_form_simple").find("input#dd_office").val(data.value);
        populateWards();
    });
    
    jQuery_2_0_3("#ward_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#ward_dd").find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        
        jQuery_2_0_3("#ajax_form_simple").find("#dd_ward").val(data.value);
        populateDivision();
    });
    //generateBarChart();
    //generateBarChart();
    //generatePieChart();
    instructionContent = jQuery_2_0_3("#content-instructions").html();
    instructionContentAdavnce = jQuery_2_0_3("#advance-content-instructions").html();
    //Adjust Css issue on load pageX
    jQuery_2_0_3(".art-layout-cell").css('display','block');
    
    listToDisplayHeader = new Array();
    listToDisplayHeader = [Joomla.JText._('CANDIDATE HEADER'),Joomla.JText._('PARTY HEADER'),Joomla.JText._('VOTES HEADER'),Joomla.JText._('PERCENTAGE HEADER')];
    
    mainNavHeaderDefault = Joomla.JText._('ELECTION RESULT HEADER');
    dataSet = Joomla.JText._('ADVANCE ANALYSIS DATASET HEADER');
    createAccordionDiv();createAccordionDiv();
});
/* 
    To interact with server use this function.All ServerSide
 */
var doAjaxCall = function(url, type, data, success_callback, error_callback, complete_callback) {
    jQuery_2_0_3.ajax({
        url: url,
        type: type,
        cache: false,
        timeout: 12000000,
        dataType: 'json',
        data: data,
        success: function (data, textStatus, jqXHR) {
            if (success_callback) {
                success_callback(data, textStatus, jqXHR);
            }
        },
        error: function (xhr, error, errorThrown) {
            if (error_callback) {
                error_callback(xhr, error, errorThrown);
            }
        },
        complete: function () {
            if (complete_callback) {
                complete_callback();
            }
        }
    });
  
};

var populate_dd = function(selector,to_update_selector,params,key,is_empty,onChangeFun){
    var dropDown = jQuery_2_0_3("#"+to_update_selector);
    //show loader
    jQuery_2_0_3("#ajax_"+key).show();
    url =  baseUri + "index.php";
    doAjaxCall(url, "GET", params, function (xhr) {
        if (xhr) {
            
            var dropDownUI = createComboBox(key,xhr,is_empty,'dd_'+key);
            
            var parentNode = jQuery_2_0_3("#"+key+"_dd");
            //Empty Previous Values
            jQuery_2_0_3(parentNode).html('');
            appendChild(parentNode,dropDownUI);
            //Add and empty li
            if(is_empty){
                //dropDown.append(jQuery_2_0_3("<option>",{ value : '' }).text('All'));
                jQuery_2_0_3(parentNode).find('div[data-initialize]').combobox('selectByText', 'All');
            }
            //Check weather onChange is set or not
            if(onChangeFun){
                jQuery_2_0_3(parentNode).find('div[data-initialize]').on('changed.fu.combobox', function (evt, data) {
                    jQuery_2_0_3("#ajax_form_simple").find("#dd_"+key).val(data.value);
                    onChangeFun();
                });
            }
            //hide loader
            jQuery_2_0_3("#ajax_"+key).hide();
        }
    }, function (xhr) {
      }, null);
};
/* 
    Function to cacluate results and populate into relavent tab selected
 */
var  perform_search = function(){
    var isToSend = validateSearchForm();
    
    if(isToSend){
        
        //jQuery_2_0_3( "#overlay" ).show();
        var opts = {
            lines: 13, // The number of lines to draw
            length: 11, // The length of each line
            width: 5, // The line thickness
            radius: 17, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#FFF', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var target = document.createElement("div");
        document.body.appendChild(target);
        var spinner = new Spinner(opts).spin(target);
        var overlay = iosOverlay({
            text: "Loading",
            spinner: spinner
        });
        
        //Get form data 
        var form_data = jQuery_2_0_3("#form_election_result").serialize();
        //Set Button to readOnly
        var btn = jQuery_2_0_3('#btn_basic_search');
        setToReadOnly(btn);
        setToDisable(btn);
        //Set Url for Call
        url =  baseUri + "index.php";
        //Set Params for Call
        var params = {
                option: "com_divisions",
                view  : "election_result",
                form_data: form_data
        };
        //Perform Ajax Call Method Set to POST
        doAjaxCall(url, "POST", params, function (xhr) {
            if (xhr) {
                overlay.update({
                    icon: "http://www.philadelphiavotes.com/components/com_pvshareddata/resources/images/check.png",
                    text: "Success!"
                });
                
                electionResult = xhr[0];
                cstmMapData    = xhr[1];
                setColorResult(electionResult);
                generateResultHeader();
                loadViewAfterSearch('simple_search');
                //generateListView();
                //generateBarChart();
                //generatePieChart();
                
                //Do things after Success call
                //jQuery_2_0_3("#ajax_loader").hide();
                setToEdit(btn);
                setToNoDisable(btn);
                window.setTimeout(function() {
                    overlay.hide();
                }, 10);
                //jQuery_2_0_3( "#dialog" ).dialog( "close" );
                //jQuery_2_0_3( "#overlay" ).hide();
                
            }
        }, function (xhr) {
            overlay.update({
                icon: "http://www.philadelphiavotes.com/components/com_pvshareddata/resources/images/check.png",
                text: "Error!"
            }); 
            setToEdit(btn);
                setToNoDisable(btn);
            window.setTimeout(function() {
                    overlay.hide();
            }, 5e3);
          }, function (xhr) {
            //jQuery_2_0_3( "#overlay" ).hide();
            window.setTimeout(function() {
                    overlay.hide();
            }, 5e3);
            setToEdit(btn);
            setToNoDisable(btn);
          });
    }
};
/* 
loadViewAfterSearch
 */
 var loadViewAfterSearch = function(selector){
    var checkTab = findChildSelectedTab(selector);
    var validViews = [
      0,
      1,
      2,
      3
    ];
    if (jQuery_2_0_3.inArray(checkTab, validViews) > - 1) {
        jQuery_2_0_3('#'+selector).find('a:eq( ' + checkTab + ' )').click();
    } else {
        //By default click on List View
        jQuery_2_0_3('#'+selector).find('a:eq(0)').click();
    }
 };
/* Create Element in Jquery Generic Function */
//createElement(tagName, validAttributes, classes);
var createElement = function(tagName, validAttributes, classes) {
    var inputEl = jQuery_2_0_3('<'+tagName+'>');
    
    for (var attr in validAttributes) {
        inputEl.attr(attr, validAttributes[attr]);
    }
    if (typeof classes != 'undefined') {
        for (var i = 0; i < classes.length; i++) {
            inputEl.addClass(classes[i]);
        }
    }
    return inputEl;
};
var setToReadOnly = function(element) {
    jQuery_2_0_3(element).css('background','#dddddd');
    jQuery_2_0_3(element).attr('readonly',true);
    
    element.readOnly = true;
};
var setToEdit = function(element) {
    jQuery_2_0_3(element).css('background','#6794bc');
    jQuery_2_0_3(element).attr('readonly',false);
};

/* Find Parent Selected tabs */
var findParentSelectedTab = function(){
    //First loop on main , then loop on inner nav to get requried result
    var counter = -1;
    var check_counter = 0;
    var returnArray = {}; 
    jQuery_2_0_3("#nav ul li").each(function(){
        counter++;
        if(jQuery_2_0_3(this).hasClass('active')){
            check_counter = counter;    
        }
    });
    //Now check which main nav is selected.After that do go for down nav
    if(check_counter=='1'){
        
    }
    return check_counter;
    
};

/* Find Child Selected tabs */
var findChildSelectedTab = function(selector){
    var counter = -1;
    var selectedIndex = 0;
    jQuery_2_0_3("#"+selector).find('a').each(function(){
        counter++;
        if(jQuery_2_0_3(this).hasClass('active')){
            selectedIndex = counter;
        };
    });
    return selectedIndex;
};
//Render View
var renderView = function(clikedObj){
    var view_info = jQuery_2_0_3(clikedObj).hasClass("enabled_class");
    if(!electionResult && !view_info){
        var select_criteria = showMessage('SELECT CRITERIA ERROR MESSAGE');
        alert(select_criteria);
        return;
    }
    //Remove active class from last selected and assign selected then
    jQuery_2_0_3("#simple_search").find('a').removeClass('active');
    jQuery_2_0_3(clikedObj).addClass('active');
    var viewFun;
    //Loop on each a and find Current View Selected
    var counter = -1;
    var selectedIndex = 0;
    jQuery_2_0_3("#simple_search").find('a').each(function(){
        counter++;
        if(jQuery_2_0_3(this).hasClass('active')){
            selectedIndex = counter;
        };
    });
    //Call relevant Function
    viewFun = viewMapping(selectedIndex); 
    var fn = window[viewFun];
    fn();
    
    //If not instruction tab or download , then refresh header.Else use default hearder
    if(selectedIndex!==4 && selectedIndex!==6 && selectedIndex!==5){
        setResultHeader();
    }
};
// Function for View Mapping
var viewMapping = function(index){
    var view = {
        '0' : 'generateListView',
        '1' : 'generateMapView',
        '2' : 'generateBarChart',
        '3' : 'generatePieChart',
        '4' : 'generateInstructionView',
        '5' : 'generatePrintView',
        '6' : 'generateDownload',
    };
    return view[index];
};
//Generate Initail View For Instructions
var generateInstructionView = function(){
    jQuery_2_0_3("#mainNavHead").html(mainNavHeaderDefault);
    var contentArea = jQuery_2_0_3("#content-instructions");
    jQuery_2_0_3(contentArea).html('');
    jQuery_2_0_3(contentArea).html(instructionContent);
    
};
var generateListView = function(){
    //electionResult
    
    var contentArea = jQuery_2_0_3("#content-instructions");
    jQuery_2_0_3(contentArea).html('');
    jQuery_2_0_3(contentArea).css('height' , maxHeight);
    var table = createElement("table",{
        'cellspacing' : 0,
        'cellpadding' : 0,
        'border' : 0,
        'width' : "100%",
        id : "group"
    });
    
    appendChild(contentArea,table);
    
    addTableHeader("group");
    
    var tbody = createElement("tbody");
    appendChild(table,tbody);
    var evenOdd = false;
    if(electionResult){
        electionResult.forEach(function(v) {
            //Decide Even Odd Class 
            var class_name = '';
            if(evenOdd){
                class_name = 'tr_even';
            }else{
                class_name = 'tr_odd';
            }
            evenOdd = !evenOdd;
            //Create tr first and inner loop create td's
            var elTr = createElement("tr",{
                'data-value' : v['name']},[class_name]);
            appendChild(tbody,elTr);
            for(var i=0;i<listToDisplay.length;i++){
                var elTd = createElement("td",{
                'data-value' : v[listToDisplay[i]],
                'data-index' : listToDisplay[i],
                });
                appendChild(elTr,elTd);
                
                if(listToDisplay[i]=='total_votes'){
                    var formatted = formatCurrency(v[listToDisplay[i]]) ;//formatCurrency(v[listToDisplay[i]]);
                    formatted = formatted.split(".");
                    v[listToDisplay[i]] = v[listToDisplay[i]];//formatted[0];
                }
                jQuery_2_0_3(elTd).html(v[listToDisplay[i]]);
            }
            
        });
    }
    var he = jQuery_2_0_3("#group").height();
    if(parseInt(he) > parseInt(maxHeight)){
        var newH = parseInt(he) + 80;
        jQuery_2_0_3(contentArea).css('height' , newH);
    }


};
/* generateMapView for Map View  */
var generateMapView = function(){
    if(electionResult){
        prepareMapData();
    }
    /*map = new AmCharts.AmMap();
    map.balloon.color = "#000000";
    var franceDataProvider = {
        mapVar: AmCharts.maps.franceLow,
        getAreasFromMap: true,
                areas: [{
            id: "2606",
            //color: "#4444ff",
            linkToObject: franceDataProvider,
            title: "Austria",
            color: "#3366CC",
            customData: "1995",
            //groupId: "before2004"
        }]
    };
    //map.dragMap =false;
    var wordlDataProvider = {
        mapVar: AmCharts.maps.worldLow,
        getAreasFromMap: true,
        creditsPosition: "top-right",
        //zoomLevel: 3.5,
        //zoomLongitude: 10,
        //zoomLatitude: 52,
        areas: [{
            id: "0",
            //color: "#4444ff",
            linkToObject: franceDataProvider,
            title: "Austria",
            color: "#3366CC",
            customData: "1995",
            //groupId: "before2004"
        },{
            id: "1",
            //color: "#4444ff",
            linkToObject: franceDataProvider,
            title: "Austria2",
            color: "#FFCC33",
            customData: "2004",
            //groupId: "2004"
        },{
            id: "2",
            //color: "#4444ff",
            linkToObject: franceDataProvider,
            title: "Austria3",
            color: "#3366CC",
            customData: "1995",
            //groupId: "before2004"26-03
        },{
            id: "4",
            //color: "#4444ff",
            linkToObject: franceDataProvider,
            title: "Austria3",
            color: "#3366CC",
            customData: "1995",
            //groupId: "before2004"
        }]
    };

    map.dataProvider = wordlDataProvider;

    map.areasSettings = {
       // autoZoom: true,
        selectedColor: "#CC0000",
        unlistedAreasColor: "#000000",
        rollOverOutlineColor: "#FFFFFF",
        rollOverColor: "#CC0000",
        balloonText: "[[title]] joined EU at [[customData]]"
    };
    map.legend = {
            width: 600,
            backgroundAlpha: 0.5,
            backgroundColor: "#FFFFFF",
            borderColor: "#666666",
            borderAlpha: 1,
            bottom: 15,
            left: 15,
            horizontalGap: 10,
            data: [{
                title: "Joined EU before 2004",
                color: "#3366CC"
            }, {
                title: "Joined EU at 2004",
                color: "#FFCC33"
            }, {
                title: "Joined EU at 2007",
                color: "#66CC99"
            }]
        };
    var backButton = {
        svgPath: backIconSVG,
        label: "Back to continents map",
        rollOverColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        useTargetsZoomValues: true,
        linkToObject: continentsDataProvider,
        left: 30,
        bottom: 30,
        labelFontSize: 15
    };
    wordlDataProvider.images = [backButton];
    map.smallMap = new AmCharts.SmallMap();
    jQuery_2_0_3("#content-instructions").css('height','700px');
    map.write("content-instructions"); */

    
};
/* Append child at the specified place  */
var appendChild = function(parentEle,childEle){
    jQuery_2_0_3(parentEle).append(childEle);
};

/* Add Header of Result Data Table*/
var addTableHeader = function(id){
    var table = document.getElementById(id);
    var thead = createElement("thead");
    appendChild(table,thead);
    
    var Eltr = createElement("tr");
    appendChild(thead,Eltr);
    for(var i=0;i<listToDisplayHeader.length;i++){
        var class_name = '';
        if(i==0){
            class_name = 'max_';
        }
        var ElTd = createElement("th" , {} , [class_name+"width_class"]);
        appendChild(Eltr,ElTd);
        jQuery_2_0_3(ElTd).html(listToDisplayHeader[i]);
    }
};
//BarChart Stuff Starts 
var prepareBarChartData = function(data){
    var barChartDataRaw = new Array();
    if(data){
        var counter = 0;
        
        data.forEach(function(v) {
            if(typeof colorScheme[v['name']] !=='undefined'){
                var color = colorScheme[v['name']];
            }else if(colors.length < counter){
                var color = getRandomColor();
            }else{
                var color = colors[counter];
                counter++;
            }
            
            var jsonArg = new Object();
            jsonArg.candidate = v['name'];
            jsonArg.votes     = v['total_votes'];
            jsonArg.color     = color;
            barChartDataRaw.push(jsonArg);
        });
    }
    return barChartDataRaw;
    
};
var generateBarChart = function(){
    jQuery_2_0_3("#content-instructions").css('height' , minHeight);
    var chart;
    //prepareBarChartData();
    barChartData = prepareBarChartData(electionResult);
    //AmCharts.ready(function () {
        // SERIAL CHART
        var chart;

        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = barChartData;
        chart.categoryField = "candidate";
        chart.startDuration = 1;
        // the following two lines makes chart 3D
        //chart.depth3D = 20;
        //chart.angle = 30;

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        //categoryAxis.labelRotation = 90;
        categoryAxis.dashLength = 5;
        categoryAxis.gridPosition = "start";
        categoryAxis.labelRotation = 45;

        // value VOTES TOOLTIP
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.title = Joomla.JText._('VOTES TOOLTIP');
        valueAxis.dashLength = 5;
        chart.addValueAxis(valueAxis);

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.valueField = "votes";
        graph.colorField = "color";
        graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 1;
        chart.addGraph(graph);

        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0;
        chartCursor.zoomable = false;
        chartCursor.categoryBalloonEnabled = false;
        chart.addChartCursor(chartCursor);

        chart.creditsPosition = "top-right";

    
        // WRITE
        chart.write("content-instructions");
    jQuery_2_0_3("#content-instructions").css('height' , maxHeight);
};
/* Random Color Generator */
var getRandomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Pie Chart Start From Here
var preparePieChartData = function(data){
    //Prevent code from breaking.Put in try catch
    try{
        var pieChartDataRaw = new Array();
        if(data){
            chosenColors = [];
            var counter = 0;
            data.forEach(function(v) {
                var jsonArg = new Object();
                jsonArg.country = v['name'];
                jsonArg.value     = v['total_votes'];
                //jsonArg.color     = getRandomColor();
                pieChartDataRaw.push(jsonArg);
                if(typeof colorScheme[v['name']] !=='undefined'){
                var color = colorScheme[v['name']];
                }else if(colors.length < counter){
                    var color = getRandomColor();
                }else{
                    var color = colors[counter];
                    counter++;
                }
                chosenColors.push(color);
            });
        }
    }catch (err) {
        var error = showMessage('JAVASCRIPT ERROR');
        alert(error+' '+err);
    }
    return pieChartDataRaw;
    
};
var generatePieChart = function(){
    pieChartData = preparePieChartData(electionResult);
    var chart;
    var legend;
    if(electionResult.length < 10){
        jQuery_2_0_3("#content-instructions").css('height' , '400px');
    }else{
        
        jQuery_2_0_3("#content-instructions").css('height' , '600px');
    }
    //AmCharts.ready(function () {
       

        // PIE CHART 
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = pieChartData;
        chart.titleField = "country";
        chart.valueField = "value";
        chart.labelsEnabled = false;
        chart.colors = chosenColors;
        // LEGEND
        legend = new AmCharts.AmLegend();
        legend.align = "center";
        legend.markerType = "circle";
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        chart.addLegend(legend);

       // PIE CHART
        /* chart = new AmCharts.AmPieChart();
        chart.dataProvider = pieChartData;
        chart.titleField = "country";
        chart.valueField = "value";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 2;
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"; */
        // this makes the chart 3D
        //chart.depth3D = 15;
        //chart.angle = 30;

        // WRITE
        chart.write("content-instructions");
    //});
    jQuery_2_0_3("#content-instructions").css('height' , maxHeight);
};

 // changes label position (labelRadius)
function setLabelPosition() {
    if (document.getElementById("rb1").checked) {
        chart.labelRadius = 30;
        chart.labelText = "[[title]]: [[value]]";
    } else {
        chart.labelRadius = -30;
        chart.labelText = "[[percents]]%";
    }
    chart.validateNow();
}


// makes chart 2D/3D                   
function set3D() {
    if (document.getElementById("rb3").checked) {
        chart.depth3D = 10;
        chart.angle = 10;
    } else {
        chart.depth3D = 0;
        chart.angle = 0;
    }
    chart.validateNow();
}

// changes switch of the legend (x or v)
function setSwitch() {
    if (document.getElementById("rb5").checked) {
        legend.switchType = "x";
    } else {
        legend.switchType = "v";
    }
    legend.validateNow();
}
var accordionCount = -1;
var comboBoxCount = -1;
var dataSetCount = 0;// I will change it to 0 once i call it on page load
//Generic Function to Create Accordion
var createAccordionDiv = function(){
    accordionCount++;
    dataSetCount++;
    var accordionParent = jQuery_2_0_3('#cstm_accordion');
    var h3 = '<h3><i class="fa fa-plus fa-lg"></i>&nbsp;'+dataSet+' #'+dataSetCount+'</h3>';
    appendChild(accordionParent,h3);
    
    var accordionParent = jQuery_2_0_3('#cstm_accordion');
    var outerDiv = createElement('div', {
            //'id' : 'accordion_'+accordionCount+'_combobox_'+comboBoxCount,
        }, ['accordion_content']);
    appendChild(accordionParent,outerDiv);
    //createComboBox(outerDiv);
    var form = prepareAcordionData();
    appendChild(outerDiv , form);
    //Refresh Accordion to handle new added Content
    jQuery_2_0_3( "#cstm_accordion" ).accordion( "refresh" );
};
//Advance search dynamic dd
//(accordionCount, 'adv_an_year_' , 'adv_an_year[]' , false);

var populateAdvanceDD = function(count,selector,input,params,key,is_empty, to_update_selector ,onChangeFun){
    
    //console.log('count:'+count+' selector:'+selector+' input:'+input+' key:'+key+' to_update_selector:'+to_update_selector);
    
    var dropDown = jQuery_2_0_3("#"+to_update_selector+count+" div:nth-child(3)"); 
    
    //show loader
    jQuery_2_0_3("#"+key+"_ajax_"+count).toggleClass("default_none");
    url =  baseUri + "index.php";
    doAjaxCall(url, "GET", params, function (xhr) {
        if (xhr) {
            
            
            var counter = 0;
            var str = '[';
            xhr.forEach(function(v) {
              str+='{"'+selector+count+'" : {"id" : "'+v[key]['id']+'" , "name" : "'+v[key]['name']+'"}}';
              counter++;
              if(counter < xhr.length){
                str+=' , ';
              }
            });
             str+=']';
            var obj = JSON.parse(str);
            
            var dropDownUI = createComboBox(selector+count,obj,is_empty,input);
            jQuery_2_0_3(dropDown).replaceWith( dropDownUI );
            var parentNode = jQuery_2_0_3("#"+to_update_selector+count+" div:nth-child(3)");
            
            //Add and empty li
            if(is_empty){
                jQuery_2_0_3(dropDownUI).combobox('selectByText', 'All');
            }
            //Check weather onChange is set or not
            if(onChangeFun){
                var idd = jQuery_2_0_3("#"+to_update_selector+count).find('div[data-initialize]').attr('id');
                jQuery_2_0_3("#"+idd).on('changed.fu.combobox', function (evt, data) {
                    
                    
                        
                        var hidden = '#hidden_'+key+'_'+count;
                        jQuery_2_0_3(hidden).val(data.value);
                    
                    onChangeFun();
                    //populateRelatedWards();
                });
            }
            //hide loader
            jQuery_2_0_3("#"+key+"_ajax_"+count).toggleClass("default_none");
        }
    }, function (xhr) {
      }, null);
};

//Generic Function to Create Data for accordions
var prepareAcordionData = function(){
    //Create Year DD
    //To covert to correct format  
    var counter = 0;
    var strYear = '[';
    for(var i=0; i < initialElectionYears.length;i++){
        counter++;
        strYear+='{"adv_an_year_'+accordionCount+'" :{"id":"'+initialElectionYears[i]['id']+'" , "name":"'+initialElectionYears[i]['e_year']+'"} }';
        if(counter < initialElectionYears.length){
            strYear+=' , '; 
        }
    }
    strYear+=']';
    var electionYearList = JSON.parse(strYear);
    //Create OuterDiv to hold Label and to make First one Selected
    var year_div = createElement('div', {
            'id' : 'year_advance_'+accordionCount,
        }, ['for_year_data']);
    var year_label = createElement('b');
    var year_text = showMessage('ADV ELECTION YEAR');
    appendChild(year_label,year_text);
    appendChild(year_div,year_label);
    
    var year_dd     = createComboBox('adv_an_year_'+accordionCount,electionYearList,false,'adv_an_year[]');
    jQuery_2_0_3(year_dd).attr('data-id-count' , accordionCount);
    appendChild(year_div,year_dd);
    jQuery_2_0_3(year_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(year_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        populateRelatedOffice(accordionCount, 'adv_an_office_' , 'adv_an_office[]' , this ,data);
    });
    
    //Office 
    var counter = 0;
    var strOffice = '[';
    for(var i=0; i < initialElectionOffice.length;i++){
        counter++;
        strOffice+='{"adv_an_office_'+accordionCount+'" : {"id" : "'+initialElectionOffice[i]['id']+'" ,"name" :"'+initialElectionOffice[i]['name']+'"}}';
        if(counter < initialElectionOffice.length){
            strOffice+=' , ';   
        }
    }
    strOffice+=']';
    var electionOfficeList = JSON.parse(strOffice);
    //Create OuterDiv to hold Label and to make First one Selected
    var office_div = createElement('div', {
            'id' : 'office_advance_'+accordionCount,
        }, ['for_office_data']);
    var office_label = createElement('b');
    var office_text = showMessage('ADV ELECTION OFFICE');
    appendChild(office_label,office_text);
    var hidden_off = createElement('input' , {
        'type':'hidden' ,
        'name': 'hidden_office',
        'id'  : 'hidden_office_'+accordionCount
    });
    appendChild(office_div,office_label);
    //appendChild(office_div,hidden);
    //ajax loder
    var office_ajax = createElement('div', {
            'id' : 'office_ajax_'+accordionCount,
        }, ['default_none','pull-right']);
    jQuery_2_0_3(office_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    appendChild(office_div,office_ajax);
    var office_dd   = createComboBox('adv_an_office_'+accordionCount,electionOfficeList,false,'adv_an_office[]');
    jQuery_2_0_3(office_dd).attr('data-id-count-office' , accordionCount);
    appendChild(office_div,office_dd);
    jQuery_2_0_3(office_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(office_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        jQuery_2_0_3(hidden_off).val(data.value);
        populateRelatedCandidate(accordionCount, 'adv_an_candidate_' , 'adv_an_candidate' , this );
    });
    
    
    //Candidate initialElectionCandidate  data-id-count-cand
    var counter = 0;
    var strCandidate = '[';
    for(var i=0; i < initialElectionCandidate.length;i++){
        counter++;
        strCandidate+='{"adv_an_candidate_'+accordionCount+'" : {"id" : "'+initialElectionCandidate[i]['id']+'" , "name" : "'+initialElectionCandidate[i]['name']+'"}}';
        if(counter < initialElectionCandidate.length){
            strCandidate+=' , ';    
        }
    }
    strCandidate+=']';
    var electionCandidateList = JSON.parse(strCandidate);
    var candidate_div = createElement('div', {
            'id' : 'candidate_advance_'+accordionCount,
        }, ['for_candidate_data']);
    var candidate_label = createElement('b');
    var candidate_text = showMessage('ADV ELECTION CANDIDATE');
    appendChild(candidate_label,candidate_text);
    var hidden_can = createElement('input' , {
        'type':'hidden' ,
        'name': 'hidden_candidate',
        'id'  : 'hidden_candidate_'+accordionCount
    });
    appendChild(candidate_div,candidate_label);
    //appendChild(candidate_div,hidden);
    //ajax loder
    var candidate_ajax = createElement('div', {
            'id' : 'candidate_ajax_'+accordionCount,
        }, ['default_none','pull-right']);
    jQuery_2_0_3(candidate_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    appendChild(candidate_div,candidate_ajax);
    
    var candidate_dd = createComboBox('adv_an_candidate_'+accordionCount,electionCandidateList,false,'adv_an_candidate');
    appendChild(candidate_div,candidate_dd);
    jQuery_2_0_3(candidate_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(candidate_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        jQuery_2_0_3(hidden_can).val(data.value);
        populateRelatedWards(accordionCount, 'adv_an_ward_' , 'adv_an_ward[]' , this );
    });
    jQuery_2_0_3(candidate_dd).attr('data-id-count-cand' , accordionCount);
    
    //Wards initialElectionWard
    var counter = 0;
    var strWard = '[';
    for(var i=0; i < initialElectionWard.length;i++){
        counter++;
        strWard+='{"adv_an_ward_'+accordionCount+'" : {"id" : "'+initialElectionWard[i]['id']+'" , "name" : "'+initialElectionWard[i]['name']+'" } }';
        if(counter < initialElectionWard.length){
            strWard+=' , '; 
        }
    }
    strWard+=']';
    var electionWardList = JSON.parse(strWard);
    var ward_div = createElement('div', {
            'id' : 'ward_advance_'+accordionCount,
        }, ['for_ward_data']);
    var ward_label = createElement('b');
    var ward_text = showMessage('ADV ELECTION WARD');
    appendChild(ward_label,ward_text);
    var hidden_wrd = createElement('input' , {
        'type':'hidden' ,
        'name': 'hidden_ward',
        'id'  : 'hidden_ward_'+accordionCount
    });
    appendChild(ward_div,ward_label);
    //appendChild(ward_div,hidden);
    //ajax loder
    var ward_ajax = createElement('div', {
            'id' : 'ward_ajax_'+accordionCount,
        }, ['default_none','pull-right']);
    jQuery_2_0_3(ward_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    appendChild(ward_div,ward_ajax);
    var ward_dd     = createComboBox('adv_an_ward_'+accordionCount,electionWardList,true,'adv_an_ward');
    appendChild(ward_div,ward_dd);
    jQuery_2_0_3(ward_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(ward_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        jQuery_2_0_3(hidden_wrd).val(data.value);
        populateRelatedDivision(accordionCount, 'adv_an_division_' , 'adv_an_division[]' , this );
    });
    
    
    //Division Start here////////
    var division_div = createElement('div', {
            'id' : 'division_advance_'+accordionCount,
        }, ['for_division_data']);
    var division_label = createElement('b');
    var division_text = showMessage('ADV ELECTION DIVISION');
    appendChild(division_label,division_text);
    appendChild(division_div,division_label);
    //ajax loder
    var division_ajax = createElement('div', {
            'id' : 'division_ajax_'+accordionCount,
        }, ['default_none','pull-right']);
    jQuery_2_0_3(division_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    appendChild(division_div,division_ajax);
    var division_dd = createComboBox('adv_an_division_'+accordionCount,false,true,'adv_an_division');
    appendChild(division_div,division_dd);
    jQuery_2_0_3(division_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(division_div).find('div[data-initialize]').combobox('disable');
    
    //Voter Type Start here 
    var voter_div = createElement('div', {
            'id' : 'voter_advance_'+accordionCount,
        }, ['for_voter_data']);
    var voter_label = createElement('b');
    var voter_text = showMessage('ADV ELECTION TYPE');
    appendChild(voter_label,voter_text);
    appendChild(voter_div,voter_label);
    var strV = '<li data-value="" data-selected="true"><a href="#">All</a></li><li data-value="A"><a href="#">Absentee</a></li><li data-value="M"><a href="#">Machine</a></li><li data-value="P"><a href="#">Provisional</a></li>';
    var voter_dd    = createComboBox('adv_an_voter_'+accordionCount,false,false,'adv_an_voter[]');
    jQuery_2_0_3(voter_dd).find("ul").html(strV);
    appendChild(voter_div,voter_dd);
    jQuery_2_0_3(voter_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    
    //Create Buttons for form submission
    var selectBtnLabel = showMessage('ADV ELECTION SELECT BTN');
    var btnSelect = createElement('input', {
            'id' : 'form_advance_btn_select_'+accordionCount,
            'Onclick' : 'ConfrimData("'+accordionCount+'")',
            'name' : ''+selectBtnLabel+'',
            'value' : ''+selectBtnLabel+'',
            'type' : 'button'
        }, ['for_select_btn_data','pull-left']);
        
    var clearBtnLabel = showMessage('ADV ELECTION CLEAR BTN');
    var btnClear = createElement('input', {
            'id' : 'form_advance_btn_clear_'+accordionCount,
            'Onclick' : 'ClearFormData("'+accordionCount+'")',
            'name' : ''+clearBtnLabel+'',
            'value' : ''+clearBtnLabel+'',
            'type' : 'button'
        }, ['for_select_btn_data','pull-right']);
    
    
    var hiddenField = createElement('input', {
            'id' : 'form_advance_hidden_'+accordionCount,
            'name' : 'confrimHidden',
            'value' : '0',
            'type' : 'hidden'
        }, ['for_select_btn_data','pull-right']);
        
    var form = createElement('form', {
            'id' : 'form_advance_'+accordionCount,
        }, ['for_form_data']);
    appendChild(form,year_div);
    appendChild(form,office_div);
    appendChild(form,candidate_div);
    appendChild(form,ward_div);
    appendChild(form,division_div);
    appendChild(form,voter_div);
    appendChild(form,btnSelect);
    appendChild(form,btnClear);
    appendChild(form,hiddenField);
    appendChild(form,hidden_off);
    appendChild(form,hidden_can);
    appendChild(form,hidden_wrd);
    //showMessage(ADV ELECTION YEAR);
    return form;
};
//
var populateRelatedWards  = function(id , selector , input , obj){
    
    var id = getDDId(obj , 'data-id-count-cand');
    var id = getObjId(obj);
    
    var is_empty = true;
    var years   = jQuery_2_0_3('#year_advance_'+id).find('input').val();
    var offices = jQuery_2_0_3('#hidden_office_'+id).val();
    var candidates = jQuery_2_0_3('#candidate_advance_'+id).find('input').val();
    var params = {
        option: "com_divisions",
        view: "adv_ward",
        year: years,
        office: offices,
        candidate: candidates
    };
    
    
    var key = 'ward';
    var relatedObj = jQuery_2_0_3("#candidate_advance_"+id).find("div[data-initialize]");
    //populateAdvanceDD(id,selector, input, params,key,is_empty , 'candidate_advance_' ,function(xhr){ populateRelatedWards(id , 'adv_an_candidate_' , 'adv_an_candidate[]' , relatedObj); });
    
    populateAdvanceDD(id,'adv_an_ward_', 'adv_an_ward', params,key,is_empty , 'ward_advance_' ,function(xhr){ populateRelatedDivision(id ,'adv_an_office_' , 'adv_an_candidate' , relatedObj); });
    
    
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('disable'); 
    
}
var populateRelatedOffice = function(counterAcc , selector , input ,obj , data){
    var is_empty = false;
    var years = data.value;
    var params = {
        option: "com_divisions",
        view: "office",
        year: years
    };
    
    var key = 'office';
    var id = getDDId(obj , "data-id-count");
    var relatedObj = jQuery_2_0_3("#office_advance_"+id).find("div[data-initialize]");
    populateAdvanceDD(id,selector, input, params,key,is_empty , 'office_advance_' ,function(xhr){ populateRelatedCandidate(id ,'adv_an_candidate_' , 'adv_an_candidate' , relatedObj); });
    //populateAdvanceDD(counterAcc,selector,input,params,key,is_empty,onChangeFun)
    //
    jQuery_2_0_3("#ward_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#ward_advance_"+id).find('div[data-initialize]').combobox('disable');
    jQuery_2_0_3("#candidate_advance_"+id).find('ul').html('');
    jQuery_2_0_3("#candidate_advance_"+id).find('input').val('');
    //
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('disable');
};
var populateRelatedDivision = function(counterAcc , selector , input ,obj){
    //console.log(obj);
    var id = getDDId(obj , 'data-id-count-cand');
    var id = getObjId(obj);
    
    var is_empty = true;
    var years   = jQuery_2_0_3('#year_advance_'+id).find('input').val();
    var offices = jQuery_2_0_3('#hidden_office_'+id).val();
    var candidates = jQuery_2_0_3('#hidden_candidate_'+id).val();
    var wards = jQuery_2_0_3('#hidden_ward_'+id).val();
    var params = {
        option: "com_divisions",
        view: "adv_division",
        year: years,
        office: offices,
        candidate: candidates,
        ward: wards
    };
    //console.log(years+"   "+counterAcc);
    
    var key = 'division';
    var relatedObj = jQuery_2_0_3("#candidate_advance_"+id).find("div[data-initialize]");
    //populateAdvanceDD(id,selector, input, params,key,is_empty , 'candidate_advance_' ,function(xhr){ populateRelatedWards(id , 'adv_an_candidate_' , 'adv_an_candidate[]' , relatedObj); });
    
    populateAdvanceDD(id,'adv_an_division_', 'adv_an_division', params,key,is_empty , 'division_advance_' ,null);
    
    
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('disable');
    
};
var getDDId  = function(obj , attribute){ 
    var idAttribute = jQuery_2_0_3(obj).attr(attribute);
    try{
        finalRe = idAttribute;
    }catch(err){
        finalRe = 0;
        console.log("Cannot get id of Object due to : "+err);
    }
    return finalRe;
};
//
function formatDropDowns(){
    //initialElectionYears , initialElectionOffice , initialElectionWard
    for(var i=0;i<initialElectionYears.length;i++){
    
    }
}
//Set Hearder of Accordion on Click 
var ConfrimData = function(counterAcc){
    var selector = '#form_advance_'+counterAcc;
    var err = 0;
    for(var i=0;i< requriedFormOneAd.length;i++){
        var childSelector = jQuery_2_0_3("#"+requriedFormOneAd[i]+"_"+counterAcc).find("input");
        var val = jQuery_2_0_3(childSelector).val();
    
        if(!val){
            jQuery_2_0_3(childSelector).css('border' , '1px solid red');
            err++;
        }else{
            jQuery_2_0_3(childSelector).css('border' , '');
            
        }   
    }
    if(err > 0){
        return ;
    }
    jQuery_2_0_3(selector).find('input[name=confrimHidden]').val('1');
    var parent_selector = jQuery_2_0_3(selector).parent().attr('aria-labelledby');
    var label = jQuery_2_0_3("#candidate_advance_"+counterAcc).find("input").val();
    jQuery_2_0_3("#"+parent_selector).html(label+' '+dataSet);
};
var ClearFormData = function(counterAcc){
    var selector = '#form_advance_'+counterAcc;
    jQuery_2_0_3("#candidate_advance_"+counterAcc).find("input").val('');
    jQuery_2_0_3("#ward_advance_"+counterAcc).find("input").val('');
    jQuery_2_0_3("#division_advance_"+counterAcc).find("input").val('');
    jQuery_2_0_3("#office_advance_"+counterAcc).find("input").val('');
    jQuery_2_0_3(selector).find('input[name=confrimHidden]').val('0');
    var parent_selector = jQuery_2_0_3(selector).parent().attr('aria-labelledby');
    var label = parseInt(counterAcc)+1;
    jQuery_2_0_3("#"+parent_selector).html('<i class="fa fa-plus fa-lg"></i> '+dataSet+' #'+label);
    
};
//Generic Function to Create ComboBox
var createComboBox = function(idName,lisData,is_empty,selector){
    comboBoxCount++;
    var div = createElement('div', {
            'data-initialize': 'combobox',
            'id' : idName+'_combobox_'+comboBoxCount,
        }, ['input-group','input-append','dropdown','combobox','cstm_combo']);
    //appendChild(outerDiv,div);
    
    var input = createElement('input', {
            'type': 'text',
            'id' : 'text'+idName+'_combobox_'+comboBoxCount,
            'name' : selector,
            'autocomplete' : 'off',
        }, ['form-control']);
    appendChild(div,input);
    
    var innerDiv = createElement('div', {
            'id' : 'innerDiv'+idName+'_combobox_'+comboBoxCount,
        }, ['input-group-btn']);
    appendChild(div,innerDiv);
    
    var btn = createElement('button', {
            'id' : 'btn'+idName+'_combobox_'+comboBoxCount,
            'data-toggle':'dropdown',
        }, ['btn','btn-default','dropdown-toggle']);
    appendChild(innerDiv,btn);
    
    var btnInnerHtml = '<i class="fa fa-chevron-down"></i>';
    jQuery_2_0_3(btn).html(btnInnerHtml);
    
    var ul = createElement('ul', {
            'id' : 'ul'+idName+'_combobox_'+comboBoxCount,
        }, ['dropdown-menu','dropdown-menu-right','cstm_adjust']);
    appendChild(innerDiv,ul);
    if(is_empty){
        var li = createElement('li', {
            'data-value' : '',
        });
        appendChild(ul,li);
        var a = '<a href="#">All</a>';
        jQuery_2_0_3(li).html(a);
    }
    if(lisData){ 
        lisData.forEach(function(v) { 
            var li = createElement('li', {
                'data-value' : v[idName]['id'],
            });
            appendChild(ul,li);
            var a = '<a href="#">'+v[idName]['name']+'</a>';
            jQuery_2_0_3(li).html(a);
        });
    }
    return div;
};

//Get Election years
var getElectionYears = function(){  
    var params = {
        option: "com_divisions",
        view: "years_in_election",
    };
    var key = 'year';
    var is_empty = false;
    populate_dd('dd_ward','dd_division',params,key,is_empty,function (xhr) { populateOffice(); });
    setUpYearsArray();
};
//SetUp Years Array 
var setUpYearsArray = function(){
    //Set An Array of Years in Election
    var lis = jQuery_2_0_3("#ulyear_combobox_0 > li");
    //Put Check if Array is empty 
    if(electionYears.length < 1){
        //Put check if lis contain any value
        if(jQuery_2_0_3(lis).length > 0){
            jQuery_2_0_3(lis).each(function(){
                var value = jQuery_2_0_3(this).attr('data-value');
                electionYears.push(value);
            });
        }
    }
    return electionYears;
};
//SetUP Year Json 
var setUpJsonYear = function(key){
    
    setUpYearsArray();
    var electionYearsJson = convert2Json(electionYears,key);
    return electionYearsJson;
};
//Convert Array to Json in Javascript
var convert2Json = function(array,key){
    var count = array.length;
    var str = '[';
    for(var i=0;i<count;i++){
      if(array[i]!=''){
        str+='{"'+key+'" :"'+array[i]+'"}';
        if(i<count-1){
          str+=',';
        }
      }
    }   
    str+=']';
    var obj = JSON.parse(str);
    return obj;
};
var populateOffice = function(){
    setUpYearsArray();
    var is_empty = false;
    var years = jQuery_2_0_3("#ajax_form_simple").find('input#dd_year').val();
    var params = {
        option: "com_divisions",
        view: "office",
        year: years
    };
    var key = 'office';
    populate_dd('dd_year','dd_office',params,key,is_empty,function(xhr){ populateWards(); });
    
    //
    jQuery_2_0_3("#division_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#division_dd").find('div[data-initialize]').combobox('disable');
    
    //
    jQuery_2_0_3("#ward_dd").find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#ward_dd").find('div[data-initialize]').combobox('disable');
};
    /* 
    * Number of wards in current elections 
    */
var populateWards = function(){
    var is_empty = false;
    var years = jQuery_2_0_3("#ajax_form_simple").find("input#dd_year").val();
    var offices = jQuery_2_0_3("#ajax_form_simple").find("input#dd_office").val();
    
    var params = {
        option: "com_divisions",
        view: "wards_in_election",
        year: years,
        office: offices
    };
    var key = 'ward';
    is_empty = true;
    populate_dd('dd_year','dd_ward',params,key,is_empty,function (xhr) { populateDivision(); });
};

var populateDivision = function(){
    var years = jQuery_2_0_3("#year_dd").find('input').val();
    var wards = jQuery_2_0_3("#ajax_form_simple").find("input#dd_ward").val();
    var offices = jQuery_2_0_3("#ajax_form_simple").find("input#dd_office").val();
    
    var params = {
        option: "com_divisions",
        view: "division_in_election",
        year: years,
        ward: wards,
        office:offices
    };
    var key = 'division';
    var is_empty = true;
    populate_dd('dd_ward','dd_division',params,key,is_empty);
};

//Validate Search Call
var validateSearchForm = function(){
    var returnFlag = true;
    for(var i=0;i<requriedFormOne.length;i++){
        var selector = jQuery_2_0_3("#"+requriedFormOne[i]).find('input');
        
        if(jQuery_2_0_3(selector).val()==''){
            jQuery_2_0_3(selector).css('border','1px solid red');
            returnFlag = false;
        }else{
            jQuery_2_0_3(selector).css('border','');
        }
    }
        
    return returnFlag;  
};

//Function to get Messages
var showMessage = function(code) {
    var messages = {
        "DISTRICT_WIDE_RESULTS": Joomla.JText._('DISTRICT_WIDE_RESULTS'),
        "WARD_WIDE_RESULTS": Joomla.JText._('WARD_WIDE_RESULTS'),
        "WARD_DIVISION_WIDE_RESULTS": Joomla.JText._('WARD_DIVISION_WIDE_RESULTS'),
        "JAVASCRIPT ERROR": Joomla.JText._('JAVASCRIPT ERROR'),
        "EXPORT EMPTY": Joomla.JText._('EXPORT EMPTY'),
        "SELECT CRITERIA ERROR MESSAGE": Joomla.JText._('SELECT CRITERIA ERROR MESSAGE'),
        "BACK TO MAP": Joomla.JText._('BACK TO MAP'),
        "MAP LEGEND TOOLTIP": Joomla.JText._('MAP LEGEND TOOLTIP'),
        "ADV ELECTION YEAR": Joomla.JText._('ADV ELECTION YEAR'),
        "ADV ELECTION OFFICE": Joomla.JText._('ADV ELECTION OFFICE'),
        "ADV ELECTION CANDIDATE": Joomla.JText._('ADV ELECTION CANDIDATE'),
        "ADV ELECTION WARD": Joomla.JText._('ADV ELECTION WARD'),
        "ADV ELECTION DIVISION": Joomla.JText._('ADV ELECTION DIVISION'),
        "ADV ELECTION TYPE": Joomla.JText._('ADV ELECTION TYPE'),
        "ADV ELECTION SELECT BTN": Joomla.JText._('ADV ELECTION SELECT BTN'),
        "ADV ELECTION CLEAR BTN": Joomla.JText._('ADV ELECTION CLEAR BTN'),
        "ADVANCE ANALYSIS DATASET HEADER": Joomla.JText._('ADVANCE ANALYSIS DATASET HEADER'),
        "ADVANCE ANALYSIS LENGTH ERROR MSG": Joomla.JText._('ADVANCE ANALYSIS LENGTH ERROR MSG'),
        "DIVISION MAP HEADRE": Joomla.JText._('DIVISION MAP HEADRE'),
        "PLEASE UPDATE YOUR BROWSER": Joomla.JText._('PLEASE UPDATE YOUR BROWSER'),
        "DELETE CANDIDATE POPUP": Joomla.JText._('DELETE CANDIDATE POPUP'),
        "FANCYBOX SELECT CANDIDATE TEXT": Joomla.JText._('FANCYBOX SELECT CANDIDATE TEXT'),
        "ATLEAST TWO CANDIDATES": Joomla.JText._('ATLEAST TWO CANDIDATES'),
        "FANCYBOX DOWNLOAD TEXT": Joomla.JText._('FANCYBOX DOWNLOAD TEXT'),
        "GRAND TOTAL OF VOTES CAST": Joomla.JText._('GRAND TOTAL OF VOTES CAST'),
        "VOTES CAST BY WARD": Joomla.JText._('VOTES CAST BY WARD'),
        "VOTES CAST BY DIVISION": Joomla.JText._('VOTES CAST BY DIVISION'),
    };
    return messages[code];
};

//generate Result Header
var generateResultHeader = function(){
    //mainNavHead
    var yearSelected   = jQuery_2_0_3("#year_dd").find("input").val();
    var officeSelected = jQuery_2_0_3("#office_dd").find("input").val();
    if(yearSelected!=='' && officeSelected!==''){
        mainNavHeader = yearSelected+' '+officeSelected;
    }
    //SET Inner Header values
    var ward     = jQuery_2_0_3("#ward_dd").find("input").val();
    var division = jQuery_2_0_3("#division_dd").find("input").val();
    
    if(ward=='All'){
        navHeader = showMessage('DISTRICT_WIDE_RESULTS');
    }else if(ward!='' && (division=='All' || division=='')){
        navHeader = showMessage('WARD_WIDE_RESULTS');
        
        ward = getFormatedNumber(ward);
        navHeader = navHeader.replace("####", ward);    
    }else{  
        navHeader = showMessage('WARD_DIVISION_WIDE_RESULTS');
        ward = getFormatedNumber(ward);
        division = getFormatedNumber(division);
        navHeader = navHeader.replace("####", ward);
        navHeader = navHeader.replace("????", division);
    }
};

//Fromat Number into th nd and isToSend
var getFormatedNumber = function(n){
    n = parseInt(n);
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+"<sup>"+(s[(v-20)%10]||s[v]||s[0])+"</sup>";
};

//Set Headers
var setResultHeader = function(){
    
    if(mainNavHeader)
        jQuery_2_0_3("#mainNavHead").html(mainNavHeader);
    var html = '<h3>'+navHeader+'</h3>';
    if(navHeader)
        jQuery_2_0_3("#content-instructions").prepend(html);
};
//Actual Download
var doDownloadStuff = function(data){
    if(data){
        var csvContent = 'data:text/csv;charset=utf-8,';
        var dataString;
        //Adjust Headre
        dataString = listToDisplayHeader.join(',');
        csvContent += dataString + '\n';
        //Prepare Body
        data.forEach(function (v) {
          var testArr = [];
          for (var i = 0; i < listToDownload.length; i++) {
            testArr.push(v[listToDownload[i]])
          }
          dataString = testArr.join(',')
          csvContent += dataString + '\n';
        });
        
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        var name = 'Election Result';
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){      // If Internet Explorer, return version number
                //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
                tableString = 'sep=,\r\n' + csvContent;
                myFrame.document.open("text/html", "replace");
                myFrame.document.write(tableString);
                myFrame.document.close();
                myFrame.focus();
                myFrame.document.execCommand('SaveAs', true, name+'.csv');  
        }else{
            var a = document.createElement('a');
            a.href     = encodeURI(csvContent);
            a.target   = '_blank';
            a.download = name+'.csv';
            a.id       ='forDownload';
            document.body.appendChild(a);
            a.click();
            jQuery_2_0_3(a).remove();
        }
    }
};
//When Cliked on Download Invoke this function
var generateDownload = function(){
    //Check if data is quried 
    doDownloadStuff(electionResult);    
};
//Reset Layout
function resetLayout() {
    //clearShapes();
    jQuery_2_0_3('#nav-elected-officials').removeClass("active");
    jQuery_2_0_3('#nav-polling-place').removeClass("active");
    jQuery_2_0_3('#nav-maps').removeClass("active");
    jQuery_2_0_3('#polling-place').hide();
    jQuery_2_0_3('#elected-officials').hide();
    jQuery_2_0_3('#elections_results').hide();
    jQuery_2_0_3('#advance_elections_results').hide();
    jQuery_2_0_3('#download_csv_results').hide();
    jQuery_2_0_3('#maps').hide();
}
function showOfficials() {
    resetLayout();
    jQuery_2_0_3('#nav-elected-officials').addClass("active");
    jQuery_2_0_3('#elected-officials').show();
    jQuery_2_0_3('#advance_elections_results').show();
    
}

function showPolling() {
    resetLayout();
    jQuery_2_0_3('#nav-polling-place').addClass("active");
    jQuery_2_0_3('#polling-place').show();
    jQuery_2_0_3('#elections_results').show();
}
function showMaps() {
    resetLayout();
    jQuery_2_0_3('#nav-maps').addClass("active");
    jQuery_2_0_3('#maps').show();
    jQuery_2_0_3('#download_csv_results').show();
   
  }
//Download CSV File 
var raw_download_csv = function(){
    
    var year_export = jQuery_2_0_3("#csv_download_dd").find('input').val();
    if(year_export == ''){
        var warning_message = showMessage('EXPORT EMPTY');
        alert(warning_message);
        return false;
    }
    var replaced = year_export.split(' ').join('_');
    replaced = replaced.toLowerCase();
    
    jQuery_2_0_3("#year_export").val(year_export);
    var url = baseUri+"files/raw-data/"+replaced+".csv";
    window.open(url,'_blank');
    //window.open(url);
    return false;
    //jQuery_2_0_3("#export_data_form").submit();
};
//Printing Data 
var generatePrintView = function() {
  if (ie && ie[1] < 9) {
    alert(showMessage("PLEASE UPDATE YOUR BROWSER"));
  } else {
  
    var error = showMessage("PLEASE UPDATE YOUR BROWSER");
    alert(error);
   // printViewInOther();
  }
};

var printViewInIE = function(){

};

var printViewInOther = function(){
    
  var popUpAndPrint = function() {
    var dataUrl = [];

    jQuery_2_0_3('#content-instructions').filter(function() {
      //dataUrl.push(this.toDataURL("image/png"));
    });

    var container = document.getElementById('content-instructions');
    var clone = container.cloneNode(true);

    var width = container.clientWidth;
    var height = container.clientHeight;
    
    
    /* jQuery_2_0_3(clone).find('canvas').each(function(i, item) {
      jQuery_2_0_3(item).replaceWith(
        jQuery_2_0_3('<img>')
          .attr('src', dataUrl[i]))
          .css('position', 'absolute')
          .css('left', '0')
          .css('top', '0')
          .css('width', width + 'px')
          .css('height', height + 'px');
    }); */

    var printWindow = window.open('', 'PrintMap',
      'width=' + width + ',height=' + height);
    if(!!printWindow) {
        var header = jQuery_2_0_3("#simple_search").prev().html();  
    jQuery_2_0_3(clone).prepend('<h3>'+header+'</h3>');
      printWindow.document.writeln(jQuery_2_0_3(clone).html());
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();

      
    }
  };

  setTimeout(popUpAndPrint, 500);
};

//Format Number 

function format2Number(str, sig)
{
    if (typeof sig === 'undefined') { sig = sig_digits; }
    num = Number(str);
    if(sig == 2){
        str = formatCurrency(num);
    }
    else{
        str = num.toFixed(sig);
    }

    str = str.split(/,/).join('{,}').split(/\./).join('{.}');
    str = str.split('{,}').join(num_grp_sep).split('{.}').join(dec_sep);

    return str;
}

function formatCurrency(strValue)
{
    strValue = strValue.toString().replace(/\$|\,/g,'');
    dblValue = parseFloat(strValue);

    blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
    dblValue = Math.floor(dblValue*100+0.50000000001);
    intCents = dblValue%100;
    strCents = intCents.toString();
    dblValue = Math.floor(dblValue/100).toString();
    if(intCents<10)
        strCents = "0" + strCents;
    for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
        dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
            dblValue.substring(dblValue.length-(4*i+3));
    return (((blnSign)?'':'-') + dblValue + '.' + strCents);
}

function formatNumber(n, num_grp_sep, dec_sep, round, precision) {
    if (typeof num_grp_sep == "undefined" || typeof dec_sep == "undefined") {
        return n;
    }
    if(n == 0) n = '0';

    n = n ? n.toString() : "";
    if (n.split) {
        n = n.split(".");
    } else {
        return n;
    }
    if (n.length > 2) {
        return n.join(".");
    }
    if (typeof round != "undefined") {
        if (round > 0 && n.length > 1) {
            n[1] = parseFloat("0." + n[1]);
            n[1] = Math.round(n[1] * Math.pow(10, round)) / Math.pow(10, round);
            n[1] = n[1].toString().split(".")[1];
        }
        if (round <= 0) {
            n[0] = Math.round(parseInt(n[0], 10) * Math.pow(10, round)) / Math.pow(10, round);
            n[1] = "";
        }
    }
    if (typeof precision != "undefined" && precision >= 0) {
        if (n.length > 1 && typeof n[1] != "undefined") {
            n[1] = n[1].substring(0, precision);
        } else {
            n[1] = "";
        }
        if (n[1].length < precision) {
            for (var wp = n[1].length; wp < precision; wp++) {
                n[1] += "0";
            }
        }
    }
    regex = /(\d+)(\d{3})/;
    while (num_grp_sep != "" && regex.test(n[0])) {
        n[0] = n[0].toString().replace(regex, "$1" + num_grp_sep + "$2");
    }
    return n[0] + (n.length > 1 && n[1] != "" ? dec_sep + n[1] : "");
}

//This function will set all relevent wards and divisions and do lenged 
//This function will set all relevent wards and divisions and do lenged 
var colorScheme = {};
var mapLegendObject = {};
var wordlDataProvider;
var map;
var prepareMapData = function () {
  //invokedWard
  if (!cstmMapData) return;
  jQuery_2_0_3("#content-instructions").css('height' , minHeight);
  invokedWard = [
  ];
  var dataStr = '[';
  var len = cstmMapData.length;
  var interPointer = 0;
  //colorScheme = {};
  
  var wardsDrillDown = {};
  var colorCounter = 0;
  var data_array = [
  ];
  cstmMapData.forEach(function (v) {
    var dataString = '';
    interPointer++;
    //Check if it is wards array
    //if (typeof ward[v['ward'] - 1] !== 'undefined') {
    var ward_n = parseInt(v['ward']);
      invokedWard.push(ward_n);
      var division_array = [];
      var ward_div = v['ward_division'];
      ward_div.forEach(function (k) {
        division_array.push(k['division'] - 1);
        //Color Scheme Option set over here and try make it generic
        //Check if name already in array then not to add it else add it.. do it on dividion level so that I have not to update legened on graunral level
        //colorCounter
        var res = k['results'];
        res.forEach(function (a) {
          if (typeof colorScheme[a.name] === 'undefined') {
            //colorScheme[a.name] = getRandomColor();
            //colorCounter++;
          }
        });
        //Create an array to use for division data and use it for drill down..Index would be ward number like ward_x and then it contain Complete data of each division.Wining candidate and etc etc. 
        
      });
      var title = Joomla.JText._('COL WARD')+" "+ward_n;
      var customReplace = prepareWinnerDataWard(v['ward_result'] , v['ward_winner'][0] , ward_n ,title);
      //var customReplace = '<table><thead><tr><th>Candidate</th><th>Party</th><th>Votes</th><th>Percentage</th></tr></thead><tbody><tr><td>YES</td><td>f</td><td>3,189</td><td>65.82%</td></tr></tbody></table>';
      dataString += '{"id": "' + parseInt(ward_n) + '",';
      var name = v['ward_winner'][0].name;
      var votes = v['ward_winner'][0].votes;
      if(typeof v['ward_winner'][0].tie !=='undefined'){
        var tie_color = '#9c9c9c'; 
      }else{
        var tie_color = colorScheme[name]
      }
      //if (typeof division[ward_n] !== 'undefined') {
        createDynamicDivision(ward_n , division_array);
        var divisionDataProvider = {
          mapVar: AmCharts.maps[ward_n],
          getAreasFromMap: true
        };
        //Create Dynamic data for world 
        dataString += '"linkToObject": "' + divisionDataProvider + '",';
      //}
      
      dataString += '"title": "' + name + '","color": "' + tie_color + '","customData": "' + customReplace + '"}';
      data_array.push(dataString);
   // }
  });
 // console.log(data_array);
  var tt = data_array.join(' , ');
  //var pp = 0;
  /* for (k = 0; k < data_array.length; k++) {
    pp++;
    dataStr+=data_array[k];
    if (pp < data_array.length) dataStr+=' , ';
  } */
  dataStr+=tt+']';
    dataStr = dataStr.replace( '\n', ' ' )
  //console.log(dataStr);
  dataStr = ''+dataStr+'';
  var worldDataObj = JSON.parse(dataStr);
  //Prepare Legend data
  var legendCounter = 0;
  var legendData = '[';
  electionResult.forEach(function (v) {
    legendData += '{"title" :"' + v['name'] + '" , "color":"' + colorScheme[v['name']] + '"}';
    legendCounter++;
    if (legendCounter < electionResult.length)
    legendData += ' , ';
  });
  legendData += ',{"title" :" Tie " , "color":"#9c9c9c"}';
  legendData += ']';
  var obj = JSON.parse(legendData);
  mapLegendObject = obj;
  var svgPath = generateWardSVG();
  AmCharts.maps.worldLoww = {
    'svg': {
      'defs': {
        'amcharts:ammap': {
          'projection': 'mercator',
          'leftLongitude': '-169.522279',
          'topLatitude': '83.646363',
          'rightLongitude': '190.122401',
          'bottomLatitude': '-55.621433'
        }
      },
      'g': {
        'path':
        svgPath
      }
    }
  };
  //console.log(svgPath);
  map = new AmCharts.AmMap();
  //map.theme = "none";
  //map.balloon.color = '#000000';
  map.pathToImages = "components/com_pvshareddata/resources/ammaps/images/";
  map.dragMap =false;
  map.zoomOnDoubleClick =false;
  wordlDataProvider = {
    mapVar: AmCharts.maps.worldLoww,
    getAreasFromMap: false,
    //creditsPosition: 'top-right',
    areas: worldDataObj
  };
  
  map.dataProvider = wordlDataProvider;
  map.zoomControl= {
        zoomControlEnabled: false,
        panControlEnabled: false
    };
  var leng_toolTip = showMessage('MAP LEGEND TOOLTIP');
  
  
  map.areasSettings = {
    autoZoom: false,
    selectedColor: '#C0C9B7',
    unlistedAreasColor: '#BABABA',
    rollOverOutlineColor: '#FFFFFF',
    rollOverColor: '#C0C9B7',
    descriptionWindowWidth: 400,
    balloonText: leng_toolTip
  };
  map.legend = {
    width: 600,
    top: 600,
    backgroundAlpha: 0.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#666666',
    borderAlpha: 1,
    bottom: 0,
    left: 15,
    horizontalGap: 10,
    data: obj
  };
  //map.smallMap = new AmCharts.SmallMap();
  map.addListener('clickMapObject', function (event) {
    var id = parseInt(event.mapObject.id);
    var name = 'ward_'+id;
    
        //do something special
        newMap(name , id);
      
    
    
  });
   
  //jQuery_2_0_3('#content-instructions').css('height', '700px');
  map.write('content-instructions');
    var height = jQuery_2_0_3(".amChartsLegend").height();
  if(height > 400){
    var newHe = parseInt(height) + 800;
    jQuery_2_0_3("#content-instructions").css('height' , newHe);
  }else{
    jQuery_2_0_3("#content-instructions").css('height' , maxHeight);
    }
  
};
/* 
    Map Stuff starts from here 
 */
var generateWardSVG = function () {
  /*var count = invokedWard.length;
  var str = '[';
  var id = 'id';
  var title = 'title';
  for (var i = 0; i < count; i++) {
    if (invokedWard[i] !== 'undefined') {
      var w_id = parseInt(invokedWard[i]);
      str += '{"' + id + '" :"' + w_id + '" , "' + title + '":"Ward Number :' + invokedWard[i] + '" , "d":"' + ward[w_id] + '"}';
      if (i < count - 1) {
        str += ',';
      }
    }
  }
  str += ']';
   var count = wards_list.length;
  var i = 0;
  var str = '[';
  var id = 'id';
  var title = 'title';
  
    wards_list.forEach(function(v) {
        console.log(v)
        var w_id = parseInt(v['ward_no']);
        str += '{"' + id + '" :"' + w_id + '" , "' + title + '":"Ward Number :' + w_id + '" , "d":"' + v['svg'] + '"}';
        i++;
        if (i < count) {
            str += ',';
        }
        
    }); 
  str += ']';
  
  var obj = JSON.parse(str);*/
   var count = wards_list.length;
  var i = 0;
  var str = '[';
  var id = 'id';
  var title = 'title';
  
    wards_list.forEach(function(v) {
        
        var w_id = parseInt(v['ward_no']);
        str += '{"' + id + '" :"' + w_id + '" , "' + title + '":"Ward Number :' + w_id + '" , "d":"' + v['svg'] + '"}';
        i++;
        if (i < count) {
            str += ',';
        }
        
    }); 
  str += ']';
  
  var obj = JSON.parse(str);
  return obj;
};

//Handle Drill Down Here 

var generateDivisionSVG = function (ward , divisions) {
 if(typeof division[ward] ==='undefined'){  
    
   return ;
 }
  var w_id = parseInt(ward)+1;
  var count = division[ward].length;
  var str = '[';
  var id = 'id';
  var title = 'title';
  var cc = [];
  for (var i = 0; i < count; i++) {
    var newStr = '';
    if (jQuery_2_0_3.inArray(i, divisions) > - 1) {  
        if(typeof division[ward][i] !=='undefined'){
        
            if (division[ward][i]['path'] != '' ) {
                var ww = parseInt(ward)+1;
                var w_d = getDivisionData(ww , i);
                
                if(w_d){
                    var name  = w_d[0];
                    var votes = w_d[1];
                    
                  newStr = '{"' + id + '" :"'+w_id+'_'+i+ '" , "' + title + '":"Division Number :' + name + '_'+ward+'" , "d":"' + division[ward][i]['path'] + '" }';
                  cc.push(newStr);
                  
                }
            }
        }
    }
  }
  for(var i=0; i < cc.length; i++){
    str +=cc[i];
      if (i < cc.length - 1) {
        str += ',';
      }
  }
  str += ']';
  var obj = JSON.parse(str);
  return obj;
  
}

var createDynamicDivision = function(ward , divisions){
  var svgPath = generateDivisionSVG(ward , divisions);
    
  var test = {
        "svg": {
            "defs": {
                "amcharts:ammap": {
                    "projection":"mercator",
                    "leftLongitude":"-4.778054",
                    "topLatitude":"51.089515",
                    "rightLongitude":"9.560176",
                    "bottomLatitude":"21.363289"
                }
            },
            "g":{
                "path":svgPath  
                
            }
        }
    };
  AmCharts.maps['ward_'+ward] = test;
    
};

function newMap(mapName , ward_number){ 
  if(isNaN(parseFloat(ward_number))){
   //prepareMapData();
   jQuery_2_0_3("#simple_search").find(".active").click();
   //generateMapView();
    return;
  
  }
  jQuery_2_0_3("#content-instructions").css('height' , minHeight);
  var head = showMessage('DIVISION MAP HEADRE');
  var f_ward_num = getFormatedNumber(ward_number);
  head = head.replace("####", f_ward_num);
  jQuery_2_0_3("#content-instructions").find('h3').html(head);
   var data = createDivisionData( ward_number );
   var dataProvider = {
        mapVar: AmCharts.maps.franceLow,
        getAreasFromMap: false,
        areas : data
    };
    var backLabel = showMessage('BACK TO MAP');
    var backButton = {
        //svgPath: backIconSVG,
        label: backLabel,
        rollOverColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        useTargetsZoomValues: true,
        linkToObject: wordlDataProvider,
        left: 10,
        bottom: 30,
        labelFontSize: 15,
        top:0
    };
     map.areasSettings.autoZoom = false;
     map.zoomControl= {
        zoomControlEnabled: false,
        panControlEnabled: false
    };
    dataProvider.images = [backButton];
    map.dataProvider = dataProvider;
    map.addListener("homeButtonClicked", handleGoHome);
    map.validateData();
    jQuery_2_0_3("#content-instructions").css('height' , maxHeight);
}
function getDivisionData(ward_number , division_number){
    var w_d = [];
    cstmMapData.forEach(function (v) {
        if (v['ward'] == ward_number)  {
            var ward_div = v['ward_division'];
            ward_div.forEach(function (k) {
                if(k['division']== division_number){
                    var name  = k['division_winner'][0].name;
                    var votes = k['division_winner'][0].votes;
                    
                    w_d.push(name);
                    w_d.push(votes);
                    return w_d;
                }
                
            });
        }
        
    });
    return w_d;
}

function createDivisionData(ward_number) {
  var w_d = '[';
  var svgStr = '[';
  var aa = [
  ];
  var bb = [
  ];
  var rt = [
  ];
  var ward_number2 = parseInt(ward_number);
  cstmMapData.forEach(function (v) {
    if (parseInt(v['ward']) == ward_number2) {
      var counter = 0;
      var ward_div = v['ward_division'];
      ward_div.forEach(function (k) {
        //if(k['division']== division_number){
        var div_num = parseInt(k['division']);
        if (typeof wardDivision[ward_number] !== 'undefined') {
          //counter++;
           var title = Joomla.JText._('COL WARD')+" "+ward_number+" & "+Joomla.JText._('COL DIVISION')+" "+div_num;
          var str = '';
          var svgString = '';
          var name = k['division_winner'][0].name;
          var votes = k['division_winner'][0].votes;
          if(typeof k['division_winner'][0].tie !=='undefined'){
            var clr_custom = '#9c9c9c';
          }else{
            var clr_custom = colorScheme[name];
          }
          
          var customReplace = prepareWinnerDataWard(k['results'] , k['division_winner'][0] , ward_number , title);
           if (typeof wardDivision[ward_number][div_num] !== 'undefined') {
              str += '{ "id" : "' + ward_number2 + '_' + div_num + '" , "color" : "' + clr_custom + '"  ';
              svgString += '{ "id" : "' + ward_number2 + '_' + div_num + '" , "title" : "' + name + '"  , "d":"' + wardDivision[ward_number][div_num]['path'] + '" }';
              str += ' , "title" : "' + name + '" , "customData" : "' + customReplace + '" ,"daka":"PK"}';
              //return w_d;
              //if(counter < ward_div.length) w_d +=' , ';
              aa.push(str);
              bb.push(svgString);
             }
        }
      });
    }
  });
  var counter = 0;
  for (var i = 0; i < aa.length; i++) {
    counter++;
    w_d += aa[i];
    svgStr += bb[i];
    if (counter < aa.length) {
      w_d += ' , ';
      svgStr += ' , ';
    }
  }
  w_d += ']';
  svgStr += ']';
  
  var stt = '[';
  var xx = 1;
  for (var x = 1; x <= wardDivision[ward_number].length; x++) {
   
    if (typeof wardDivision[ward_number][x] !== 'undefined') {
      stt += '{ "id" : "' + ward_number + '_' + x + '" , "title" : "' + x + '"  , "d":"' + wardDivision[ward_number][x]['path'] + '" }';
      if (xx < wardDivision[ward_number].length-1) {
        stt += ' , ';
      }
    }
    xx++;
  }
  stt += ']';
 
  var obj = JSON.parse(w_d);
  var obj2 = JSON.parse(stt);
  //
  AmCharts.maps.franceLow = {
    'svg': {
      'defs': {
        'amcharts:ammap': {
          'projection': 'mercator',
          'leftLongitude': '-4.778054',
          'topLatitude': '51.089515',
          'rightLongitude': '9.560176',
          'bottomLatitude': '21.363289'
        }
      },
      'g': {
        'path': obj2
      }
    }
  };
  rt.push(obj); //data
  rt.push(obj2); //svg
  return obj;
}




var handleGoHome = function(){
    //ALTERNATE DELEGATE TO THE REPUBLICAN NATIONAL CONVENTION 2ND DIST
    //prepareMapData();
    jQuery_2_0_3("#simple_search").find(".active").click();
    //map.dataProvider = wordlDataProvider;
    //map.validateNow();
}

/* Set Object to diable */
var setToDisable = function(obj){
    jQuery_2_0_3(obj).attr('disabled' , true);
}
var setToNoDisable = function(obj){
    jQuery_2_0_3(obj).attr('disabled' , false);
}

//ADVANCE SECTION SEARCH STARTS FROM HERE
var renderAdvanceView = function(clikedObj){
    var view_info = jQuery_2_0_3(clikedObj).hasClass("enabled_class");
    if(!electionResultAd && !view_info){
        var select_criteria = showMessage('SELECT CRITERIA ERROR MESSAGE');
        alert(select_criteria);
        return;
    }
    //Remove active class from last selected and assign selected then
    jQuery_2_0_3("#advance_search").find('a').removeClass('active');
    jQuery_2_0_3(clikedObj).addClass('active');
    var viewFun;
    //Loop on each a and find Current View Selected
    var counter = -1;
    var selectedIndex = 0;
    jQuery_2_0_3("#advance_search").find('a').each(function(){
        counter++;
        if(jQuery_2_0_3(this).hasClass('active')){
            selectedIndex = counter;
        };
    });
    //Call relevant Function
    viewFun = viewAdvanceMapping(selectedIndex);
    var fn = window[viewFun];
    fn();
    
    //If not instruction tab or download , then refresh header.Else use default hearder
    if(selectedIndex!==4 && selectedIndex!==6 && selectedIndex!==5){
        //setResultHeader();
    }
};
// Function for View Mapping
var viewAdvanceMapping = function(index){
    var view = {
        '0' : 'generateAdvanceListView',
        '1' : 'generateAdvanceMapView',
        '2' : 'generateAdvanceBarChart',
        '3' : 'generateAdvancePieChart',
        '4' : 'generateAdvanceInstructionView',
        '5' : 'generateAdvancePrintView',
        '6' : 'generateAdvanceDownload',
    };
    return view[index];
};
var generateAdvanceInstructionView = function(){
    //
    jQuery_2_0_3("#advance-content-instructions").html(instructionContentAdavnce);
};
var generateAdvanceListView = function(){
    var contentArea = jQuery_2_0_3("#advance-content-instructions");
    jQuery_2_0_3(contentArea).html('');
    jQuery_2_0_3(contentArea).css('height' , maxHeight);
    var select= getDropdownAdvanceTab('default');
    appendChild(contentArea , select);
    //jQuery_2_0_3(contentArea).html(select);
    var table = createElement("table",{
        'cellspacing' : 0,
        'cellpadding' : 0,
        'border' : 0,
        'width' : "100%",
        id : "groupAdv"
    });
    
    appendChild(contentArea,table);
    addTableHeader("groupAdv");
    
    var tbody = createElement("tbody");
    appendChild(table,tbody);
    var evenOdd = false;
    if(electionResultAd){
        electionResultAd.forEach(function(v) {
            //Decide Even Odd Class 
            var class_name = '';
            if(evenOdd){
                class_name = 'tr_even';
            }else{
                class_name = 'tr_odd';
            }
            evenOdd = !evenOdd;
            //Create tr first and inner loop create td's
            var elTr = createElement("tr",{
                'data-value' : v['name']},[class_name]);
            appendChild(tbody,elTr);
            for(var i=0;i<listToDisplay.length;i++){
                var elTd = createElement("td",{
                'data-value' : v[listToDisplay[i]],
                'data-index' : listToDisplay[i],
                });
                appendChild(elTr,elTd);
                
                if(listToDisplay[i]=='total_votes'){
                    var formatted = formatCurrency(v[listToDisplay[i]]) ;//formatCurrency(v[listToDisplay[i]]);
                    formatted = formatted.split(".");
                    v[listToDisplay[i]] = v[listToDisplay[i]];//formatted[0];
                }
                jQuery_2_0_3(elTd).html(v[listToDisplay[i]]);
            }
            //console.log(v['name']+"  "+v['party']);
        });
    }
    jQuery_2_0_3(contentArea).css("overflow" , "visible");
};
var generateAdvanceMapView = function(){
    prepareMapDataAd();
};
var generateAdvanceBarChart  = function(){
    jQuery_2_0_3("#advance-content-instructions").css('height' , minHeight);
    var chart;
    barChartDataAdvance = prepareBarChartData(electionResultAd);
    //AmCharts.ready(function () {
        // SERIAL CHART
        var chart;

        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = barChartDataAdvance;
        chart.categoryField = "candidate";
        chart.startDuration = 1;
        // the following two lines makes chart 3D
        //chart.depth3D = 20;
        //chart.angle = 30;

        // AXES
        // category
        var categoryAxis = chart.categoryAxis;
        categoryAxis.labelRotation = 45;
        categoryAxis.dashLength = 5;
        categoryAxis.gridPosition = "start";

        // value VOTES TOOLTIP
        var valueAxis = new AmCharts.ValueAxis();
        valueAxis.title = Joomla.JText._('VOTES TOOLTIP');
        valueAxis.dashLength = 5;
        valueAxis.minimum = 0;
        chart.addValueAxis(valueAxis);

        // GRAPH
        var graph = new AmCharts.AmGraph();
        graph.valueField = "votes";
        graph.colorField = "color";
        graph.balloonText = "<span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>";
        graph.type = "column";
        graph.lineAlpha = 0;
        graph.fillAlphas = 1;
        chart.addGraph(graph);

        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0;
        chartCursor.zoomable = false;
        chartCursor.categoryBalloonEnabled = false;
        chart.addChartCursor(chartCursor);

        chart.creditsPosition = "top-right";

    
        // WRITE
        chart.write("advance-content-instructions");
    jQuery_2_0_3("#advance-content-instructions").css('height' , maxHeight);
};

var generateAdvancePieChart = function(){
    pieChartDataAdvance = preparePieChartData(electionResultAd);
    var chart;
    var legend;
    if(pieChartDataAdvance.length < 10){
        jQuery_2_0_3("#advance-content-instructions").css('height' , '400px');
    }else{
        
        jQuery_2_0_3("#advance-content-instructions").css('height' , '600px');
    }
    //jQuery_2_0_3("#advance-content-instructions").css('height' , minHeightPie);

    //AmCharts.ready(function () {
       

        // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = pieChartDataAdvance;
        chart.titleField = "country";
        chart.valueField = "value";
        chart.labelsEnabled = false;
        chart.colors = colors;
        // LEGEND
        legend = new AmCharts.AmLegend();
        legend.align = "center";
        legend.markerType = "circle";
        chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
        chart.addLegend(legend);
        // WRITE
        chart.write("advance-content-instructions");
    //});
    jQuery_2_0_3("#advance-content-instructions").css('height' , maxHeight);
};

var  generateAdvanceDownload = function(){
    //doDownloadStuff(electionResultAd);
    //Open Popup and ask for what user selected. Then make do stuff according to user :-)
    
    //
    var text = showMessage('FANCYBOX DOWNLOAD TEXT');
    //var msg  = showMessage('DELETE CANDIDATE POPUP'); 
    var html = '<div class="text-center">'+text+'</div>'+
    '<select name="downloadStuffAdvance" id="downloadStuffAdvance" style="margin-top:10px;">'+
    '<option value="">Select Option</option>'+
    '<option value="default">Grand Total of Votes Cast</option>'+
    '<option value="ward">Votes Cast by Ward</option>'+
    '<option value="division">Votes Cast by Division</option>'+
    '</select>'+
    '<div><input type="button" name="Download" value="Download"  class="btn-pop-up" onclick="preAdDownload()" style="width:50%"></div>';
    jQuery.fancybox({
         'autoScale': true,
         'transitionIn': 'elastic',
         'transitionOut': 'elastic',
         'speedIn': 500,
         'speedOut': 300,
         'autoDimensions': true,
         'centerOnScroll': true,
         'content'  : html
    });
};
// Perform Adavnce Search Data 
var cstmMapDataAd;
var analyzeAdvanceSearch = function(){
    
    var form_data = [];
    //Try catch block if any error accoured..
    try{
        jQuery_2_0_3(".for_form_data").each(function(){
            var fa = jQuery_2_0_3(this).serialize();
            var to = jQuery_2_0_3(this).find('input[name=confrimHidden]').val();
            
            if(to!='0'){
                form_data.push(fa);
            }
        });
    }catch (err) {
        var error = showMessage('JAVASCRIPT ERROR');
        alert(error+' '+err);
        return ;
    }
    
    if(form_data.length < 1){
        var errorMsg = showMessage('ADVANCE ANALYSIS LENGTH ERROR MSG'); 
        alert(errorMsg);
        return;
    }
    var btn = jQuery_2_0_3("#btn-analysis-search");
    setToDisable(btn);
    setToReadOnly(btn);
    jQuery_2_0_3("#ajax_loader_advance").show();
    url =  baseUri + "index.php";
    //Set Params for Call
    var params = {
            option: "com_divisions",
            view  : "advance_election_result",
            form_data: form_data
    };
    //console.log(params);
    //Perform Ajax Call Method Set to POST
    doAjaxCall(url, "POST", params, function (xhr) {
        if (xhr) {
            electionResultAd = xhr[0];
            cstmMapDataAd    = xhr[1];
            setColorResultAd(cstmMapDataAd);
            //generateResultHeader();
            loadViewAfterSearch('advance_search');
            //Do things after Success call
            jQuery_2_0_3("#ajax_loader_advance").hide();
            setToEdit(btn);
            setToNoDisable(btn);
        }
    }, function (xhr) {
        //alert("Some Thing went wrong. Reload page and try again!");
      }, function(xhr){
            
      });
}

var generateAdvancePrintView = function() {
  if (ie && ie[1] < 9) {
    printViewInIEAd();
  } else {
    printViewInOtherAd();
  }
};

var printViewInIEAd = function(){

};

var printViewInOtherAd = function(){
    
  var popUpAndPrintAd = function() {
    var dataUrl = [];

    jQuery_2_0_3('#advance-content-instructions').filter(function() {
      //dataUrl.push(this.toDataURL("image/png"));
    });

    var container = document.getElementById('advance-content-instructions');
    var clone = container.cloneNode(true);

    var width = container.clientWidth;
    var height = container.clientHeight;
    
    var printWindow = window.open('', 'PrintMap',
      'width=' + width + ',height=' + height);
    if(!!printWindow) {
    var header = jQuery_2_0_3("#advance_search").prev().html();
        
    jQuery_2_0_3(clone).prepend('<h3>'+header+'</h3>');
    
      printWindow.document.writeln(jQuery_2_0_3(clone).html());
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();

      
    }
  };

  setTimeout(popUpAndPrintAd, 500);
};

var getObjId = function(obj){
    var str = jQuery_2_0_3(obj).attr('id');
    var res = str.split("_");
    if(res[3]){
        return res[3];
    }
    return -1;
    
}
var galobal_id ;
//Populate CANDIDATE
var populateRelatedCandidate = function(counterAcc , selector , input ,obj){
    
    var id = getDDId(obj , 'data-id-count-office');
    var id = getObjId(obj);
    
    
    
    var is_empty = false;
    var years   = jQuery_2_0_3('#year_advance_'+id).find('input').val();
    var offices = jQuery_2_0_3('#hidden_office_'+id).val();
    var params = {
        option: "com_divisions",
        view: "candidate",
        year: years,
        office: offices,
    };
    
    var key = 'candidate';
    var relatedObj = jQuery_2_0_3("#ward_advance_"+id).find("div[data-initialize]");
    populateAdvanceDD(id,selector, input, params,key,is_empty , 'candidate_advance_' ,function(xhr){ populateRelatedWards(id , 'adv_an_candidate_' , 'adv_an_candidate[]' , relatedObj); });
    
    jQuery_2_0_3("#ward_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#ward_advance_"+id).find('div[data-initialize]').combobox('disable');
    
    //
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3("#division_advance_"+id).find('div[data-initialize]').combobox('disable');
};

//Set Color here 
var setColorResult = function(data){
    var colorCounter = 0;
    colorScheme = {};
    data.forEach(function (v) {
    var dataString = '';
    
     //var ward_div = v['ward_division']; 
     // ward_div.forEach(function (k) {
       
        //Color Scheme Option set over here and try make it generic
        //Check if name already in array then not to add it else add it.. do it on dividion level so that I have not to update legened on graunral level
        //colorCounter
       // var res = k['results'];
       // res.forEach(function (a) {
          if (typeof colorScheme[v['name']] === 'undefined') {
            if(typeof colors[colorCounter] === 'undefined'){
                colorScheme[v['name']] = getRandomColor();
            }else{
                colorScheme[v['name']] = colors[colorCounter];
                colorCounter++;
            }   
          }
        //});
        
      //});
      
  });
}


/////////////Advance Map Render//////////
var setColorResultAd = function(data){
    var colorCounter = 0;
    colorSchemeAd = {};
    data.forEach(function (v) {
    var dataString = '';
    
      if (typeof colorSchemeAd[v['name']] === 'undefined') {
            if(typeof colors[colorCounter] === 'undefined'){
                colorSchemeAd[v['name']] = getRandomColor();
            }else{
                colorSchemeAd[v['name']] = colors[colorCounter];
                colorCounter++;
            }   
          }
  });

}





var colorSchemeAd = {};
var mapLegendObjectAd = {};
var wordlDataProviderAd;
var map2;
function prepareMapDataAd() {
  
  if(!cstmMapDataAd){
    return;
  }
  var data_array = [];
  var le = cstmMapDataAd.length;
  cstmMapDataAd.forEach(function (v) {
   var ward_n = parseInt(v['ward']);
    var dataString = '';
     dataString += '{"id": "' + parseInt(ward_n) + '",';
      var name = v['ward_winner'][0].name;
      var votes = v['ward_winner'][0].votes;
      if(typeof v['ward_winner'][0].tie !=='undefined'){
        var tie_color = '#9c9c9c'; 
      }else{
        var tie_color = colorSchemeAd[name]
      }
      var title = Joomla.JText._('COL WARD')+" "+ward_n;
      var customReplace = prepareWinnerDataWard(v['ward_result'] , v['ward_winner'][0] , ward_n ,title);
      dataString += '"title": "' + name + '","color": "' + tie_color + '","customData": "' + customReplace + '"}';
      data_array.push(dataString);
  });
 
  var dataStr = '[';
  var pp = 0;
  for (k = 0; k < data_array.length; k++) {
    pp++;
    dataStr += data_array[k];
    if (pp < data_array.length) dataStr += ' , ';
  }
  dataStr += ']';
  
  var worldDataObj = JSON.parse(dataStr);
  var svgPath = generateWardSVG();
  AmCharts.maps.newWorldLow = {
    'svg': {
      'defs': {
        'amcharts:ammap': {
          'projection': 'mercator',
          'leftLongitude': '-169.522279',
          'topLatitude': '83.646363',
          'rightLongitude': '190.122401',
          'bottomLatitude': '-55.621433'
        }
      },
      'g': {
        'path': svgPath
      }
    }
  };
  
  
  jQuery_2_0_3('#advance-content-instructions').css('height', minHeight);
  map2 = new AmCharts.AmMap();
  map2.balloon.color = '#000000';
  map2.pathToImages = 'components/com_pvshareddata/resources/ammaps/images/';
  //map.dragMap =false;
  wordlDataProvider = {
    mapVar: AmCharts.maps.newWorldLow,
    getAreasFromMap: false,
    creditsPosition: 'top-right',
    areas: worldDataObj
  };
  
  
  
  var legendCounter = 0;
  var legendData = '[';
  electionResultAd.forEach(function (v) {
    legendData += '{"title" :"' + v['name'] + '" , "color":"' + colorSchemeAd[v['name']] + '"}';
    legendCounter++;
    if (legendCounter < electionResultAd.length)
    legendData += ' , ';
  });
  legendData += ',{"title" :" Tie " , "color":"#9c9c9c"}';
  legendData += ']';
  var obj = JSON.parse(legendData);
  mapLegendObject = obj;
  
  
  
  map2.dataProvider = wordlDataProvider;
  var leng_toolTip = showMessage('MAP LEGEND TOOLTIP');
  map2.areasSettings = {
    autoZoom: false,
    selectedColor: '#C0C9B7',
    unlistedAreasColor: '#BABABA',
    rollOverOutlineColor: '#FFFFFF',
    rollOverColor: '#C0C9B7',
    balloonText: leng_toolTip,
    selectable: true
  };
    map2.zoomControl= {
        zoomControlEnabled: false,
        panControlEnabled: false
    };
  map2.legend = {
    width: 600,
    top: 600,
    backgroundAlpha: 0.5,
    backgroundColor: '#FFFFFF',
    borderColor: '#666666',
    borderAlpha: 1,
    bottom: 0,
    left: 15,
    horizontalGap: 10,
    data: obj
  };
  //map2.smallMap = new AmCharts.SmallMap();
  map2.addListener('clickMapObject', function (event) {
    var id = parseInt(event.mapObject.id);
    newMapAd(id);
   
  });
  //jQuery_2_0_3('#content-instructions').css('height', '700px');
  map2.write('advance-content-instructions');
  jQuery_2_0_3('#advance-content-instructions').css('height', maxHeight);
}
function newMapAd(ward_number){ 
  if(isNaN(parseFloat(ward_number))){
   prepareMapDataAd();
    return;
  
  }
  jQuery_2_0_3("#advance-content-instructions").css('height' , minHeight);
   var data = createDivisionDataAd( ward_number );
   var dataProvider = {
        mapVar: AmCharts.maps.franceLowAd,
        getAreasFromMap: false,
        areas : data
    };
    var backLabel = showMessage('BACK TO MAP');
    var backButton = {
        //svgPath: backIconSVG,
        label: backLabel,
        rollOverColor: "#CC0000",
        labelRollOverColor: "#CC0000",
        useTargetsZoomValues: true,
        linkToObject: wordlDataProvider,
        left: 30,
        bottom: 30,
        labelFontSize: 15
    };
     map2.areasSettings.autoZoom = false;
     map2.zoomControl= {
        zoomControlEnabled: false,
        panControlEnabled: false
    };
    dataProvider.images = [backButton];
    map2.dataProvider = dataProvider;
    map2.addListener("homeButtonClicked", handleGoHomeAd);
    map2.validateData();
    jQuery_2_0_3("#advance-content-instructions").css('height' , maxHeight);
}


function createDivisionDataAd(ward_number) {
  var w_d = '[';
  var svgStr = '[';
  var aa = [
  ];
  var bb = [
  ];
  var rt = [
  ];
  var ward_number2 = parseInt(ward_number);
  cstmMapDataAd.forEach(function (v) {
    if (parseInt(v['ward']) == ward_number2) {
      var counter = 0;
      var ward_div = v['ward_division'];
      ward_div.forEach(function (k) {
        //if(k['division']== division_number){
        var div_num = parseInt(k['division']);
        if (typeof wardDivision[ward_number] !== 'undefined') {
          //counter++;
          
         var title = Joomla.JText._('COL WARD')+" "+ward_number+" & "+Joomla.JText._('COL DIVISION')+" "+div_num;
          var str = '';
          var svgString = '';
          var name = k['division_winner'][0].name;
          var votes = k['division_winner'][0].votes;
          if(typeof k['division_winner'][0].tie !=='undefined'){
            var clr_custom = '#9c9c9c';
          }else{
            var clr_custom = colorSchemeAd[name];
          }
          var customReplace = prepareWinnerDataWard(k['results'] , k['division_winner'][0] , ward_number , title);
          str += '{ "id" : "' + ward_number2 + '_' + div_num + '" , "color" : "' + clr_custom + '"  ';
          svgString += '{ "id" : "' + ward_number2 + '_' + div_num + '" , "title" : "' + name + '"  , "d":"' + wardDivision[ward_number][div_num]['path'] + '" }';
          str += ' , "title" : "' + name + '" , "customData" : "' + customReplace + '"}';
          //return w_d;
          //if(counter < ward_div.length) w_d +=' , ';
          aa.push(str);
          bb.push(svgString);
        }
      });
    }
  });
  var counter = 0;
  for (var i = 0; i < aa.length; i++) {
    counter++;
    w_d += aa[i];
    svgStr += bb[i];
    if (counter < aa.length) {
      w_d += ' , ';
      svgStr += ' , ';
    }
  }
  w_d += ']';
  svgStr += ']';
  
  var stt = '[';
  var xx = 1;
  for (var x = 1; x <= wardDivision[ward_number].length; x++) {
    
    if (typeof wardDivision[ward_number][x] !== 'undefined') {
      stt += '{ "id" : "' + ward_number + '_' + x + '" , "title" : "' + x + '"  , "d":"' + wardDivision[ward_number][x]['path'] + '" }';
      if (xx < wardDivision[ward_number].length-1) {
        stt += ' , ';
      }
    }
    xx++;
  }
  stt += ']';
  
  var obj = JSON.parse(w_d);
  var obj2 = JSON.parse(stt);
  //
  AmCharts.maps.franceLowAd = {
    'svg': {
      'defs': {
        'amcharts:ammap': {
          'projection': 'mercator',
          'leftLongitude': '-4.778054',
          'topLatitude': '51.089515',
          'rightLongitude': '9.560176',
          'bottomLatitude': '21.363289'
        }
      },
      'g': {
        'path': obj2
      }
    }
  };
  rt.push(obj); //data
  rt.push(obj2); //svg
  return obj;
}

var handleGoHomeAd = function(){
    prepareMapDataAd();
}


function increase_brightness(hex, percent){
    // strip the leading # if it's there
    hex = hex.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(hex.length == 3){
        hex = hex.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(hex.substr(0, 2), 16),
        g = parseInt(hex.substr(2, 2), 16),
        b = parseInt(hex.substr(4, 2), 16);

    return '#' +
       ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
       ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}

var prepareWinnerDataWard = function(wardResult, winner, ward_no, title) {

    var legendDataList = ['0', '1'];
    var table = createElement("table");


    var obj = '{';
    var count = 0;
    var len = wardResult.length;
    wardResult.forEach(function(v) {

        obj += '"' + v['name'] + '":"' + v['votes'] + '"';
        count++;
        if (count < len) {
            obj += ',';
        }

    });

    obj += '}';

    var cc = JSON.parse(obj);

    var array = [];
    for (a in cc) {
        array.push([a, cc[a]])
    }
    array.sort(function(a, b) {
        return a[1] - b[1]
    });
    array.reverse();
    var tbody = createElement("tbody");
    appendChild(table, tbody);
    var evenOdd = false;
   
    if (array) {
        // wardResult.forEach(function(v) {
        for (var k = 0; k < array.length; k++) {
            //Decide Even Odd Class 
            if(k > 5){
                continue;
            }
            var class_name = '';
            if (evenOdd) {
                class_name = 'tr_even';
            } else {
                class_name = 'tr_odd';
            }
            evenOdd = !evenOdd;
            //Create tr first and inner loop create td's
            var elTr = createElement("tr");
            appendChild(tbody, elTr);
            for (var i = 0; i < legendDataList.length; i++) {
                var elTd = createElement("td");
                appendChild(elTr, elTd);
                jQuery_2_0_3(elTd).html(array[k][legendDataList[i]] + "&nbsp;&nbsp;&nbsp;");
            }

        }
    }
    var p = createElement("p");
    jQuery_2_0_3(p).html(title);
    appendChild(p, table);
    var r = jQuery_2_0_3(p).html();
    return r;
}



/* 
    /////****************************************************************
    /////****************************************************************
    /////*************************PHASE 2********************************
    /////****************************************************************
    /////****************************************************************
 */
 
//Generic Function to Create Data for accordions
var prepareFBData = function(){ 
    var default_year_id     = initialElectionYears.length > 0 ? initialElectionYears[0]['id'] : '';
    var default_year_name   = initialElectionYears.length > 0 ? initialElectionYears[0]['e_year'] : '';
    var default_office_id   = initialElectionOffice.length > 0 ? initialElectionOffice[0]['id'] : '';
    var default_office_name = initialElectionOffice.length > 0 ? initialElectionOffice[0]['name'] : '';
    
    var wardStr = '';
    var counter = 0;
    var strYear = '[';
    for(var i=0; i < initialElectionYears.length;i++){
        counter++;
        strYear+='{"advance_year" :{"id":"'+initialElectionYears[i]['id']+'" , "name":"'+initialElectionYears[i]['e_year']+'"} }';
        if(counter < initialElectionYears.length){
            strYear+=' , '; 
        }
    }
    strYear+=']';
    var electionYearList = JSON.parse(strYear);
    //Create OuterDiv to hold Label and to make First one Selected
    var year_div = createElement('div', {
            'id' : 'advance_year',
        }, ['for_year_data']);
    var year_label = createElement('b');
    var year_text = showMessage('ADV ELECTION YEAR');
    appendChild(year_label,year_text);
    appendChild(year_div,year_label);
    
    
    //'<input type="hidden" value="" name="year_hidden" id="year_hidden">';
    
    var year_dd     = createComboBox('advance_year',electionYearList,false,'advance_year_txt');

    //jQuery_2_0_3(year_dd).attr('data-id-count' , accordionCount);
    appendChild(year_div,year_dd);
    jQuery_2_0_3(year_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(year_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        var params = {
            'option': 'com_divisions',
            'view': 'office',
            'year': data.value,
        };
        jQuery_2_0_3('#office_loader_popup').show();
        doAjaxCall(baseUri + 'index.php', 'Get', params, function (xhr) {
            var count = Object.keys(xhr).length;
            var counter = 0;
            jQuery_2_0_3('#office_loader_popup').hide();    
            //Hidden value updated
            var year_hidden = jQuery_2_0_3("#year_hidden");
            jQuery_2_0_3(year_hidden).attr({
                'year_id'    :  data.value,
                'year_name'  :  data.text,
                'office_id'  :  '',
                'office_name':  ''
            });
            
            var strOffice = '[';
            xhr.forEach(function (v) {
              counter++;
              strOffice += '{"advance_office" : {"id" : "' + v['office'].id + '" ,"name" :"' + v['office'].name + '"}}';
              if (counter < count) {
                strOffice += ' , ';
              }
            });
            strOffice += ']';
            var electionOfficeList = JSON.parse(strOffice);
            var office_div = jQuery_2_0_3('#office_advance_div');
            jQuery_2_0_3(office_div).html('');
            var office_label = createElement('b');
            var office_text = showMessage('ADV ELECTION OFFICE');
            appendChild(office_label, office_text);
            //Office Loader
            var office_loader = createElement('div', { 'id' : 'office_loader_popup'  } , ['pull-right' , 'pop-up-loader']);
            jQuery_2_0_3(office_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
            appendChild(office_div, office_loader);
            var hidden_off = createElement('input', {
              'type': 'hidden',
              'name': 'hidden_office',
              'id': 'hidden_office_' + accordionCount
            });
            appendChild(office_div, office_label);
            //appendChild(office_div,hidden);
            //ajax loder
            var office_ajax = createElement('div', {
              'id': 'office_ajax_' + accordionCount,
            }, [
              'default_none',
              'pull-right'
            ]);
            jQuery_2_0_3(office_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
            //appendChild(office_div,office_ajax);
            var office_dd = createComboBox('advance_office', electionOfficeList, false, 'advance_office_txt');
            jQuery_2_0_3(office_dd).attr('data-id-count-office', accordionCount);
            appendChild(office_div, office_dd);
            
            var candidate_div = jQuery_2_0_3('#candidate-response');
            jQuery_2_0_3(candidate_div).html('');
            var candidate_label = createElement('b');
            var candidate_text = showMessage('ADV ELECTION CANDIDATE');
            appendChild(candidate_label,candidate_text);
            appendChild(candidate_div,candidate_label);
            
            var candidate_loader = createElement('div', { 'id' : 'candidate_loader_popup'  } , ['pull-right' , 'pop-up-loader']);
              jQuery_2_0_3(candidate_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
              appendChild(candidate_div, candidate_loader);
            
            jQuery_2_0_3(office_div).find('div[data-initialize]').on('changed.fu.combobox', function (evt, data) {
                var params = {
                    'option'    : 'com_divisions',
                    'view'      : 'wards_in_election',
                    'office'    : data.value
                };
                jQuery_2_0_3('#candidate_loader_popup').show();
                doAjaxCall(baseUri + 'index.php', 'Get', params, function (xhr) {
                    var count = Object.keys(xhr).length;
                    var counter = 0;
                    
                    wardStr = '';
                    xhr.forEach(function (v) {
                        counter++;
                        wardStr+=v['ward'].name;
                        if(counter < count){
                            wardStr+=',';
                        }
                    });
                    
                    //
                    var params = {
                    'option'    : 'com_divisions',
                    'view'      : 'candidate',
                    'office'    : data.value
                    };
                    //Hidden value updated
                    var year_hidden = jQuery_2_0_3("#year_hidden");
                    jQuery_2_0_3(year_hidden).attr({
                        'office_id'    :  data.value,
                        'office_name'  :  data.text
                    });
                
                    doAjaxCall(baseUri + 'index.php', 'Get', params, function (xhr) {
                        jQuery_2_0_3('#candidate_loader_popup').hide();
                        var strCandidate = '';
                            strCandidate+='<div class="s-candidate-inner-checkbox">';
                        xhr.forEach(function (v) {
                            strCandidate+='<span class="inner-check">';
                            strCandidate+= '<input type="checkbox" class="css-checkbox" value="'+v['candidate'].id+'" name="candidate['+v['candidate'].id+']" data-name="'+v['candidate'].name+'" data-ward="'+wardStr+'" >'+v['candidate'].name+'</span>';
                            //candidate
                        });
                        strCandidate+='</div>';
                        var candidate_div = jQuery_2_0_3("#candidate-response");
                        jQuery_2_0_3(candidate_div).html('');
                        var candidate_label = createElement('b');
                        var candidate_text = showMessage('ADV ELECTION CANDIDATE');
                        appendChild(candidate_label,candidate_text);

                        appendChild(candidate_div,candidate_label);
                        var candidate_loader = createElement('div', { 'id' : 'candidate_loader_popup'  } , ['pull-right' , 'pop-up-loader']);
                          jQuery_2_0_3(candidate_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
                          appendChild(candidate_div, candidate_loader);
                        appendChild(candidate_div,strCandidate);
                    } , null, null ); //office ajax call for candidate
            } , null,null );
            
            });
      }, null, null); //year ajax call end
    }); // year on change end
  //Office 
    var counter = 0;
    var strOffice = '[';
    for(var i=0; i < initialElectionOffice.length;i++){
        counter++;
        strOffice+='{"advance_office" : {"id" : "'+initialElectionOffice[i]['id']+'" ,"name" :"'+initialElectionOffice[i]['name']+'"}}';
        if(counter < initialElectionOffice.length){
            strOffice+=' , ';   
        }
    }
    strOffice+=']';
    var electionOfficeList = JSON.parse(strOffice);
    //Create OuterDiv to hold Label and to make First one Selected
    var office_div = createElement('div', {
            'id' : 'office_advance_div',
        }, ['for_office_data']);
    var office_label = createElement('b');
    var office_text = showMessage('ADV ELECTION OFFICE');
    appendChild(office_label,office_text);
    
    var office_loader = createElement('div', { 'id' : 'office_loader_popup' } , ['pull-right' , 'pop-up-loader']);
    jQuery_2_0_3(office_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    appendChild(office_div, office_loader);
    
    var hidden_off = createElement('input' , {
        'type':'hidden' ,
        'name': 'hidden_office',
        'id'  : 'hidden_office_'+accordionCount
    });
    appendChild(office_div,office_label);
    //appendChild(office_div,hidden);
    //ajax loder
    var office_ajax = createElement('div', {
            'id' : 'office_ajax_'+accordionCount,
        }, ['default_none','pull-right']);
    jQuery_2_0_3(office_ajax).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
    //appendChild(office_div,office_ajax);
    var office_dd   = createComboBox('advance_office',electionOfficeList,false,'advance_office_txt');
    jQuery_2_0_3(office_dd).attr('data-id-count-office' , accordionCount);
    appendChild(office_div,office_dd);
    jQuery_2_0_3(office_div).find('div[data-initialize]').combobox('selectByIndex', '0');
    jQuery_2_0_3(office_div).find('div[data-initialize]').on('changed.fu.combobox',function (evt, data) {
        //
        jQuery_2_0_3('#candidate_loader_popup').show();
        var params = {
            'option'    : 'com_divisions',
            'view'      : 'wards_in_election',
            'office'    : data.value
        };
        doAjaxCall(baseUri + 'index.php', 'Get', params, function (xhr) {
            var count = Object.keys(xhr).length;
            var counter = 0;
            wardStr = '';
            
            xhr.forEach(function (v) {
                counter++;
                wardStr+=v['ward'].name;
                if(counter < count){
                    wardStr+=',';
                }
            });
            var params = {
                'option'    : 'com_divisions',
                'view'      : 'candidate',
                'office'    : data.value
            };
            var year_hidden = jQuery_2_0_3("#year_hidden");
            jQuery_2_0_3(year_hidden).attr({
                'office_id'    :  data.value,
                'office_name'  :  data.text
            });       
            doAjaxCall(baseUri + 'index.php', 'Get', params, function (xhr) {
                jQuery_2_0_3('#candidate_loader_popup').hide();
                var strCandidate = '';
                    strCandidate+='<div class="s-candidate-inner-checkbox">';
                xhr.forEach(function (v) {
                    strCandidate+='<span class="inner-check">';
                    strCandidate+= '<input type="checkbox" class="css-checkbox" value="'+v['candidate'].id+'" name="candidate['+v['candidate'].id+']" data-name="'+v['candidate'].name+'" data-ward="'+wardStr+'" >'+v['candidate'].name+'</span>';
                });
                strCandidate+='</div>';
                
                var candidate_div = jQuery_2_0_3("#candidate-response");
                jQuery_2_0_3(candidate_div).html('');
                var candidate_label = createElement('b');
                var candidate_text = showMessage('ADV ELECTION CANDIDATE');
                appendChild(candidate_label,candidate_text);

                appendChild(candidate_div,candidate_label);
                
                var candidate_loader = createElement('div', { 'id' : 'candidate_loader_popup'  } , ['pull-right' , 'pop-up-loader']);
                jQuery_2_0_3(candidate_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
                appendChild(candidate_div, candidate_loader);
                
                appendChild(candidate_div,strCandidate);
            } , null, null );
        } , null,null );
        
        
    });
    
    //Candidate initialElectionCandidate  data-id-count-cand
    var counter = 0;
    var wardStr = '';
    for(var i=0; i < initialElectionWard.length;i++){
        counter++;
        wardStr+=initialElectionWard[i]['name'];
        if(counter < initialElectionWard.length){
            wardStr+=',';   
        }
    }
    var strCandidate = '';
    strCandidate+='<div class="s-candidate-inner-checkbox">';
    for(var i=0; i < initialElectionCandidate.length;i++){
        strCandidate+='<span class="inner-check">';
        strCandidate+= '<input type="checkbox" class="css-checkbox" value="'+initialElectionCandidate[i]['id']+'" name="candidate['+initialElectionCandidate[i]['id']+']" data-name="'+initialElectionCandidate[i]['name']+'" data-ward="'+wardStr+'" >'+initialElectionCandidate[i]['name']+'</span>';
    }
    
            
    var candidate_div = createElement('div', {
            'id' : 'candidate-response',
        }, ['for_candidate_data']);
    var candidate_label = createElement('b');
    var candidate_text = showMessage('ADV ELECTION CANDIDATE');
    appendChild(candidate_label,candidate_text);
    
  appendChild(candidate_div,candidate_label);
  
  var candidate_loader = createElement('div', { 'id' : 'candidate_loader_popup'  } , ['pull-right' , 'pop-up-loader']);
  jQuery_2_0_3(candidate_loader).html('<i class="fa fa-spinner icon-4x fa-spin"></i>');
  appendChild(candidate_div, candidate_loader);
  
  appendChild(candidate_div,strCandidate);
  //hidden field for year 
    var year_hidden = createElement('input' , {
        'type'       : 'hidden' , 
        'value'      : '' , 
        'name'       : 'year_hidden' , 
        'id'         : 'year_hidden' , 
        'year_id'    :  default_year_id,
        'year_name'  :  default_year_name,
        'office_id'  :  default_office_id,
        'office_name':  default_office_name,
    });
    appendChild(year_div,year_hidden);
    
    var form = createElement('form', {
            'id' : 'form_advance',
        }, ['for_form_data']);
    appendChild(form,year_div);
    appendChild(form,office_div);
    appendChild(form,candidate_div);
  
  jQuery_2_0_3("#fancybox-inner-div").html(form); 
};
var dataSetCounter = 0;
function addCurrentDataSet(){
    //Check if year and office are selected or not. If not then throw error else proceed
    var flag  = true;
    var cstm_data_form = jQuery_2_0_3("#cstm_data_form");
    var year_hidden = jQuery_2_0_3("#form_advance").find("#year_hidden");
    var toCheck = ['year_id' , 'year_name' , 'office_id' , 'office_name'];
    
    for(var i=0; i < toCheck.length; i++){
        var attr = jQuery_2_0_3(year_hidden).attr(toCheck[i]);
        if(!attr){
            flag = false;
            console.log("Some thing went wrong please check.");
            return;
        }
    }
    
    var checkboxCheck = false;
    jQuery_2_0_3("#form_advance").find("input[type='checkbox']").each(function(){
        if(jQuery_2_0_3(this).is(":checked")){
            dataSetCounter++;
            jQuery("#analyze-inner-text").hide();
            //console.log("Checked value is ::: "+jQuery_2_0_3(this).val());
            var div = createElement('div',{
                    id      : 'dataSet'+dataSetCounter,
                    onclick : 'removeCandidate('+dataSetCounter+')',
                }   
            );
            //
            var ele = createElement('input',{
                    name    : 'hidden_candidate_id['+dataSetCounter+']',
                    id      : 'hidden_candidate_id'+dataSetCounter,
                    value   : jQuery_2_0_3(this).val(),
                    type    : 'hidden',
                }   
            );
            appendChild(div,ele);
            var ele = createElement('input',{
                    name    : 'hidden_candidate_name['+dataSetCounter+']',
                    id      : 'hidden_candidate_name'+dataSetCounter,
                    value   : jQuery_2_0_3(this).attr('data-name'),
                    type    : 'hidden',
                }   
            );
            appendChild(div,ele);
            //Append wards 
            var ele = createElement('input',{
                    name    : 'hidden_ward_name['+dataSetCounter+']',
                    id      : 'hidden_ward_name'+dataSetCounter,
                    value   : jQuery_2_0_3(this).attr('data-ward'),
                    type    : 'hidden',
                }   
            );
            appendChild(div,ele);
            for(var i=0; i < toCheck.length; i++){
                var attr = jQuery_2_0_3(year_hidden).attr(toCheck[i]);
                var ele = createElement('input',{
                        name    : 'hidden_'+toCheck[i]+'['+dataSetCounter+']',
                        id      : 'hidden_'+toCheck[i]+dataSetCounter,
                        value   : attr,
                        type    : 'hidden',
                    }   
                );
                //div
                appendChild(div,ele);
            }
            appendChild(div,ele);
            
            var span = createElement('span',{},['item']);
            
            var html = '<span class="item-left"><i class="fa fa-times-circle" title="Remove"></i><span class="item-info"><span class="head" title="Delete">['+dataSetCounter+'] '+jQuery_2_0_3(this).attr('data-name')+'</span><span class="desc">'+jQuery_2_0_3(year_hidden).attr('year_name')+' - '+jQuery_2_0_3(year_hidden).attr('office_name')+'</span></span></span>';
            jQuery_2_0_3(span).html(html);
            appendChild(div , span);
            appendChild(cstm_data_form , div);
            checkboxCheck = true;
        }
    });
    //jQuery_2_0_3.fancybox.close();
    if(checkboxCheck){
        closeFB();
    }
}
function closeFB(){
    jQuery.fancybox.close();
}
function removeCandidateContent(id){
    jQuery_2_0_3("#dataSet"+id).remove();
    var size = jQuery('div[id^="dataSet"]').size();
    var size = jQuery('div[id^="dataSet"]').size();
  var counter = 1;
  var html = '';
  jQuery('div[id^="dataSet"]').each(function(){
    html+='<div id="dataSet'+counter+'" onclick="removeCandidate('+counter+')">';
    var old_id = jQuery(this).attr('id');
    var id = old_id.replace("dataSet", "");

    var hidden_candidate_id = jQuery('#hidden_candidate_id'+id).val();
    html+='<input type="hidden" name="hidden_candidate_id['+counter+']" id="hidden_candidate_id'+counter+'" value="'+hidden_candidate_id+'">';

    var hidden_candidate_name = jQuery('#hidden_candidate_name'+id).val();
    html+='<input type="hidden" name="hidden_candidate_name['+counter+']" id="hidden_candidate_name'+counter+'" value="'+hidden_candidate_name+'">';

    var hidden_ward_name = jQuery('#hidden_ward_name'+id).val();
    html+='<input type="hidden" name="hidden_ward_name['+counter+']" id="hidden_ward_name'+counter+'" value="'+hidden_ward_name+'">';

    var hidden_year_id = jQuery('#hidden_year_id'+id).val();
    html+='<input type="hidden" name="hidden_year_id['+counter+']" id="hidden_year_id'+counter+'" value="'+hidden_year_id+'">';

    var hidden_year_name = jQuery('#hidden_year_name'+id).val();
    html+='<input type="hidden" name="hidden_year_name['+counter+']" id="hidden_year_name'+counter+'" value="'+hidden_year_name+'">';

    var hidden_office_id = jQuery('#hidden_office_id'+id).val();
    html+='<input type="hidden" name="hidden_office_id['+counter+']" id="hidden_office_id'+counter+'" value="'+hidden_office_id+'">';

    var hidden_office_name = jQuery('#hidden_office_name'+id).val();
    html+='<input type="hidden" name="hidden_office_name['+counter+']" id="hidden_office_name'+counter+'" value="'+hidden_office_name+'">';

    html+='<span class="item"><span class="item-left"><i title="Remove" class="fa fa-times-circle"></i><span class="item-info"><span title="Delete" class="head">['+counter+'] '+hidden_candidate_name+'</span><span class="desc">'+hidden_year_name+' - '+hidden_office_name+'</span></span></span></span>';
    html+='</div>';
    counter++;
  });
  //console.log(size);
  dataSetCounter = counter-1;
  jQuery("#cstm_data_form").html(html);
    
    if(size < 1){
        jQuery("#analyze-inner-text").show();
    }
    closeFB();
}
function removeCandidate(id){
    var msg  = showMessage('DELETE CANDIDATE POPUP'); 
    var html = '<div class="text-center">'+msg+'</div><div><input type="button" name="Yes" value="Yes" onclick="removeCandidateContent('+id+')" class="btn-pop-up"><input type="button" name="No" value="No" onclick="closeFB()" class="btn-pop-up"></div>';
    jQuery(".fa-times-circle").fancybox({
        //'beforeLoad': prepareFBData,
        'width'     : 350,
        'type'      : 'inline',
        'content'   : html
    });
    //DELETE CANDIDATE POPUP
    //jQuery_2_0_3("#dataSet"+id).remove();
}

function doAdvanceSearch(){
  var ward_name      = [];
  var candidate_name = [];
  var office_name    = [];
  var year_name      = [];
  var btn            = jQuery_2_0_3("#btn-analysis-search");
  try{
        var size = jQuery('div[id^="dataSet"]').size();
        if(size < 1){
            var warning_message = showMessage('ATLEAST TWO CANDIDATES');
            alert(warning_message);
            return ;
        }
        
        for(var i=0;i <= dataSetCounter; i++){
          if(jQuery_2_0_3("#dataSet"+i).size() > 0){
            var ward = jQuery_2_0_3("#dataSet"+i).find('input[id=hidden_ward_name'+i+']').val();
            var ward_obj = {};
            ward_obj[i] = ward;
            ward_name.push(ward_obj);
            
            var candidate = jQuery_2_0_3("#dataSet"+i).find('input[id=hidden_candidate_name'+i+']').val();
            var cand_obj = {};
            cand_obj[i] = candidate;
            candidate_name.push(cand_obj);
            
            var office = jQuery_2_0_3("#dataSet"+i).find('input[id=hidden_office_name'+i+']').val();
            var office_obj = {};
            office_obj[i] = office;
            office_name.push(office_obj);
            
            //hidden_year_name
            var year = jQuery_2_0_3("#dataSet"+i).find('input[id=hidden_year_name'+i+']').val();
            var year_obj = {};
            year_obj[i] = year;
            year_name.push(year_obj);
          }
        }
       // console.log(ward_name);
        var params = {
                option      : "com_divisions",
                view        : "advance_election_result",
                ward        : ward_name,
                candidate   : candidate_name,
                office      : office_name,
                year        : year_name,
        };
        var overlay = loadAjaxLoader();
        doAjaxCall(baseUri + 'index.php', "POST", params, function (xhr) { 
            overlay.update({
                icon: "http://www.philadelphiavotes.com/components/com_pvshareddata/resources/images/check.png",
                text: "Success!"
            });
            electionResultAd = xhr[1];
            cstmMapDataAd    = xhr[0];
            //skip ones those are not fit.
            //skipDivisions();
            //sorting do it over here.To get rid of rid wait sortedWardsDivisions
            sortedWards = wardSorting();
            for(var i=0; i< sortedWards.length;i++){
                //sortedWardsDivisions[cstmMapDataAd[sortedWards[i][1]] = sortDivsions(cstmMapDataAd[sortedWards[i][0]].ward_division);
                var st = sortDivsions(cstmMapDataAd[sortedWards[i][0]].ward_division);
                //console.log(sortedWards[i][1]);
                sortedWardsDivisions[sortedWards[i][1]] = st;
            }
            setColorResultAd(electionResultAd);
            //generateResultHeader();
            loadViewAfterSearch('advance_search');
            //Do things after Success call
            jQuery_2_0_3("#ajax_loader_advance").hide();
            //setToEdit(btn);
            //setToNoDisable(btn);
        } , function (xhr) {
            overlay.update({
                icon: "http://www.philadelphiavotes.com/components/com_pvshareddata/resources/images/check.png",
                text: "Error!"
            }); 
            setToEdit(btn);
                setToNoDisable(btn);
            //window.setTimeout(function() {
                    overlay.hide();
            //}, 5e3);
          }, function (xhr) {
            //jQuery_2_0_3( "#overlay" ).hide();
            //window.setTimeout(function() {
                    overlay.hide();
            //}, 5e3);
            setToEdit(btn);
            setToNoDisable(btn);
          });
    }catch (err) {
        var error = showMessage('JAVASCRIPT ERROR');
        alert(error+' '+err);
        return ;
    }
    
}

function loadAjaxLoader(){
    var opts = {
        lines: 13, // The number of lines to draw
        length: 11, // The length of each line
        width: 5, // The line thickness
        radius: 17, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    var target = document.createElement("div");
    document.body.appendChild(target);
    var spinner = new Spinner(opts).spin(target);
    var overlay = iosOverlay({
        text: "Loading",
        spinner: spinner
    });
    return overlay;
}

function regenerateAdvanceListView(obj){
    var selectedValue = jQuery_2_0_3(obj).val();
    
    if(selectedValue=='default'){
        generateAdvanceListView();
    }else if(selectedValue=='ward'){
        generateViewWard();
        jQuery("select").val("ward");
    }else{
        generateViewDivision();
        jQuery("select").val("division");
    }
}

function generateViewWard(){
    //cstmMapDataAd
    var w_s_arr = sortedWards;
    var outerDiv = createElement('div' , {
        'aria-multiselectable'  : 'true',
        'role'                  : 'tablist',
        'id'                    : 'accordion'
    },['panel-group','custom-accordions']);
    for(var i=0; i< w_s_arr.length;i++){
        if(typeof cstmMapDataAd[w_s_arr[i][0]]){
            //console.log(cstmMapDataAd[w_s_arr[i][0]]);
            var panel   = createElement('div' , {} , ['panel' , 'panel-default']);
            var panel_heading = createElement('div' , {
                'role' : 'tab',
                'id'   : 'heading'+w_s_arr[i][1]
            } , ['panel-heading']);
            var panel_header = createElement('h4' , { } , ['panel-title']);
            var a = createElement('a' , { 
                'aria-controls' : 'collapse'+w_s_arr[i][1],
                'aria-expanded' : false,
                'href'          : '#collapse'+w_s_arr[i][1],
                'data-parent'   : '#accordion',
                "data-toggle"   : 'collapse',
            } , ['collapsed']);
            jQuery_2_0_3(a).html("Ward "+w_s_arr[i][1]);        
            appendChild(panel_header , a);   
            appendChild(panel_heading,panel_header);   
            appendChild(panel , panel_heading);
            
            // Panel body div
            var body_outer = createElement('div' , { 
                'aria-labelledby' : 'heading'+w_s_arr[i][1],
                'role'            : "tabpanel",
                'id'              : 'collapse'+w_s_arr[i][1],
                'aria-expanded'   : false,
                
            } , ['panel-collapse', 'collapse']);
            if(i==0){
                jQuery(body_outer).addClass('in');
            }
            var  panel_body = createElement('div' , { } , ['panel-body']);
            var table = wardLevelResult(cstmMapDataAd[w_s_arr[i][0]].ward_result , w_s_arr[i][1]);
            jQuery_2_0_3(panel_body).html(table);
            appendChild(body_outer , panel_body );
            appendChild(panel,body_outer );
            appendChild(outerDiv , panel);
            //appendChild(outerDiv , body_outer);
        }
        
        jQuery_2_0_3(contentArea).css("overflow" , "visible");
    }
    var contentArea = jQuery_2_0_3("#advance-content-instructions");
    jQuery_2_0_3(contentArea).html('');
    var select= getDropdownAdvanceTab('ward');
    appendChild(contentArea , select);
    
    var table = createElement("table",{
        'cellspacing' : 0,
        'cellpadding' : 0,
        'border' : 0,
        'width' : "100%",
        id : "groupAdv"
    });
    
    appendChild(contentArea,table);
    //addTableHeader("groupAdv");
    
    var tbody = createElement("tbody");
    appendChild(table,tbody);
    
    appendChild(  tbody,outerDiv );
    appendChild( contentArea , table );
}

//Ward level Sorting
function wardSorting() {
    //cstmMapDataAd
    var arr = [];
    var index = 0;
    var len = cstmMapDataAd.length;
    var str = '{';
    cstmMapDataAd.forEach(function(v) {
        str += '"' + index + '":"' + v['ward'] + '"';
        index++;
        if (index < len) {
            str += ' , ';
        }
    });
    str += '}';
    var cc = JSON.parse(str);
    var array = [];
    for (a in cc) {
        array.push([a, cc[a]])
    }
    array.sort(function(a, b) {
        return a[1] - b[1]
    });
    return array;
}

//generate tables from result give ward level
function wardLevelResult(wardInfo , wardNo){
  /* var table = createElement('table' , {
    'cellspacing'   : "0", 'cellpadding'    : "0" , 'border': "0" , 'width' : '100%' , 'id' : 'wardNo'+wardNo
  },['table-condensed','table-striped']); */
  //header
  var table = '<table cellspacing="0" cellpadding="0" border="0" width="100%" id="wardNo'+wardNo+'" class="table-condensed table-striped"><thead><tr>';
  //var thead = createElement("thead");
//  appendChild(table,thead);
//  var Eltr = createElement("tr");
//  appendChild(thead,Eltr);
    for(var i=0;i<listToDisplayHeader.length;i++){
        var class_name = '';
        if(i==0){
            class_name = 'max_';
        }
        table+= '<th class="'+class_name+'width_class">'+listToDisplayHeader[i]+'</th>';
        //var ElTd = createElement("th" , {} , [class_name+"width_class"]);
        //appendChild(Eltr,ElTd);
        //jQuery_2_0_3(ElTd).html(listToDisplayHeader[i]);
    }
    table+= '</tr></thead>';
    var arr = [];
    var index = 0;
    var total_votes = 0;
    var len = wardInfo.length;
    var str = '{';
    wardInfo.forEach(function(v) {
        total_votes+= parseFloat(v['votes']);
        str += '"' + v['name'] + '":"' + v['votes'] + '"';
        index++;
        if (index < len) {
            str += ' , ';
        }
    });
    str += '}';
    var cc = JSON.parse(str);
    var array = [];
    for (a in cc) {
        array.push([a, cc[a]])
    }
    array.sort(function(a, b) {
        return a[1] - b[1]
    });
    array.reverse();
    //var tbody = createElement('tbody');
    table+= '<tbody>';
    for(var i=0;i< array.length;i++){
        //var tr = createElement('tr');
        //var td0 = createElement('td');
        table+='<tr><td>'+array[i][0]+'</td>';
        //jQuery_2_0_3(td0).html(array[i][0]);
        //appendChild(tr , td0);
        var party = getPartyName(array[i][0]);
        //var td1 = createElement('td');
        //jQuery_2_0_3(td1).html(party);
        //appendChild(tr , td1);
        table+='<td>'+party+'</td>';
        //var td2 = createElement('td');
        //jQuery_2_0_3(td2).html(array[i][1]);
        //appendChild(tr , td2);
        table+='<td>'+array[i][1]+'</td>';
        if(total_votes > 0){
            var per = (array[i][1] / total_votes)*100;
            per = parseFloat(per).toFixed(2);
        }else{
            var per = '0.00';
        }
        //var td2 = createElement('td');
        //jQuery_2_0_3(td2).html(per+"%");
        //appendChild(tr , td2);
        table+='<td>'+per+'%</td></tr>';
        //appendChild(tbody , tr);
    }
    table+='</tbody></table>';
    //console.log(array);
    //appendChild(table,tbody);
    //table body start here
    return table;
}  

function getPartyName(candidateName){
  
    var partyName = '';
    electionResultAd.forEach(function(v){
        if(v['name'] == candidateName){
            partyName = v['party'];
        }
    });
    return partyName;
}

function getDropdownAdvanceTab(defaultValue){
    
    /* var table = createElement("table",{
        'cellspacing' : 0,
        'cellpadding' : 0,
        'border' : 0,
        'width' : "100%",
        id : "groupDropdown"
    });
    //appendChild(contentArea,table);
    var tr      = createElement('tr' , {} , ['cstm-dropdown-menu']
    );
    var tdIcon  = createElement('td' , {} , ['cstm-dropdown-menu-first']);
    jQuery_2_0_3(tdIcon).html('<i class="fa fa-chevron-right"></i>');
    var tdDD    = createElement('td' , {} , ['cstm-dropdown-menu-dd']);
    var html    = '<select name="top-menu" onchange="regenerateAdvanceListView(this)"><option value="default">Grand Total</option><option value="ward">Votes Cast by Ward</option><option value="division">Votes Cast by Division</option></select>';
    jQuery_2_0_3(tdDD).html(html);
    appendChild(tr,tdIcon);
    appendChild(tr,tdDD);
    appendChild(table,tr); */
    
    /////////////////
    var total_votes         = showMessage('GRAND TOTAL OF VOTES CAST');
    var total_votes_ward    = showMessage('VOTES CAST BY WARD');
    var total_votes_division= showMessage('VOTES CAST BY DIVISION');
    var text = total_votes;
    if(defaultValue=='ward'){
        text = total_votes_ward;
    }else if(defaultValue=='division'){
        text = total_votes_division;
    }
    var table = '<ul class="nav navbar-nav analysis-nav"><li class="dropdown" data-toggle="tooltip" title="Click here for more options" data-placement="bottom"><a href="#" class="dropdown-toggle" data-toggle="dropdown" id="selected-option-dd"><i class="fa fa-chevron-right"></i>'+text+'</a><ul class="dropdown-menu"><li><a href="javascript:void(0)" onclick="generateAdvanceListView()">'+total_votes+'</a></li><li class="divider"></li><li><a href="javascript:void(0)" onclick="generateViewWard()">'+total_votes_ward+'</a></li><li class="divider"></li><li><a href="javascript:void(0)" onclick="generateViewDivision()">'+total_votes_division+'</a></li></ul></li></ul>';
    return table;
    jQuery_2_0_3("#advance-content-instructions").css('overflow' ,'visible');
}

/* 
    Function to get Sorted Division in Ward start form here. 
    Input : unsorted Divisions array 
    retrun: sorted Divisions Array  
*/
function sortDivsions(wardDiv){
    //var wardDiv = cstmMapDataAd[0].ward_division;
    var arr = [];
    var index = 0;
    var len = wardDiv.length;
    var str = '{';
    wardDiv.forEach(function (v) {
      
      str += '"' + index + '":"' + v['division'] + '"';
      index++;
      if (index < len) {
        str += ' , ';
      }
    });
    str += '}';
    var cc = JSON.parse(str);

    var array = [];
    for (a in cc) {
      array.push([a,
      cc[a]])
    }
    array.sort(function (a, b) {
      return a[1] - b[1]
    });
    //Return Array 
    return array;
} 
//Dvis
//Generate Division list view
function generateViewDivision(){
    //cstmMapDataAd
    var w_s_arr = sortedWards;
  //console.log(w_s_arr);
    var outerDiv = createElement('div' , {
        'aria-multiselectable'  : 'true',
        'role'                  : 'tablist',
        'id'                    : 'accordion'
    },['panel-group','custom-accordions']);
    var len = w_s_arr.length;
    if(w_s_arr.length > 10 ){
        //len = 10;
    }
    for(var i=0; i< len;i++){
        if(typeof cstmMapDataAd[w_s_arr[i][0]]){
            //console.log(cstmMapDataAd[w_s_arr[i][0]]);
            var panel   = createElement('div' , {} , ['panel' , 'panel-default']);
            var panel_heading = createElement('div' , {
                'role' : 'tab',
                'id'   : 'heading'+w_s_arr[i][1]
            } , ['panel-heading']);
            var panel_header = createElement('h4' , { } , ['panel-title']);
            var a = createElement('a' , { 
                'aria-controls' : 'collapse'+w_s_arr[i][1],
                'aria-expanded' : false,
                'href'          : '#collapse'+w_s_arr[i][1],
                'data-parent'   : '#accordion',
                "data-toggle"   : 'collapse',
            } , ['collapsed']);
            jQuery_2_0_3(a).html("Ward "+w_s_arr[i][1]);        
            appendChild(panel_header , a);   
            appendChild(panel_heading,panel_header);   
            appendChild(panel , panel_heading);
            
            // Panel body div
            var body_outer = createElement('div' , { 
                'aria-labelledby' : 'heading'+w_s_arr[i][1],
                'role'            : "tabpanel",
                'id'              : 'collapse'+w_s_arr[i][1],
                'aria-expanded'   : false,
                
            } , ['panel-collapse', 'collapse']);
            if(i==0){
                jQuery_2_0_3(body_outer).addClass("in");
            }
            var  panel_body = createElement('div' , { } , ['panel-body']);
            //var table = divisionLevelResult(cstmMapDataAd[w_s_arr[i][0]].ward_division , w_s_arr[i][1]);
            
            var table = divisionLevelResult(cstmMapDataAd[w_s_arr[i][0]].ward_division , w_s_arr[i]);
      
            jQuery_2_0_3(panel_body).html(table);
            appendChild(body_outer , panel_body );
            appendChild(panel,body_outer );
            appendChild(outerDiv , panel);
            //appendChild(outerDiv , body_outer);
        }
        
    }
    var contentArea = jQuery_2_0_3("#advance-content-instructions");
    jQuery_2_0_3(contentArea).html('');
    var select= getDropdownAdvanceTab('division');
    appendChild(contentArea , select);
    
    
        var table = createElement("table",{
            'cellspacing' : 0,
            'cellpadding' : 0,
            'border' : 0,
            'width' : "100%",
            id : "groupAdv"
        });
        
        appendChild(contentArea,table);
        //addTableHeader("groupAdv");
        
        var tbody = createElement("tbody");
        appendChild(table,tbody);
        
        appendChild(  tbody,outerDiv );
        appendChild( contentArea , table );
    
    
    //appendChild( contentArea , outerDiv );
    jQuery_2_0_3(contentArea).css("overflow" , "visible");
}



//
function divisionLevelResult(wardData , s_a){
  
    var key = s_a[0];
    var wardNo = s_a[1];
    var sorted = sortedWardsDivisions[s_a[1]];//sortDivsions(wardData);
    var html = '<div aria-multiselectable="true"  role="tablist" id="accordion_'+wardNo+'" class="panel-group custom-accordions">';
    for(var k=0; k< sorted.length;k++){
    //console.log(wardNo +"  " +sorted[i][1]);
        if(typeof cstmMapDataAd[key].ward_division[sorted[k][0]]){
            html+='<div class="panel panel-default">';
            
            html+='<div class="panel-heading" role="tab" id="heading'+wardNo+'_'+sorted[k][1]+'"><h4 class="panel-title"><a aria-controls="collapse'+wardNo+'_'+sorted[k][1]+'"   class="collapsed" aria-expanded="false" href="#collapse'+wardNo+'_'+sorted[k][1]+'" data-parent="#accordion_'+wardNo+'" data-toggle="collapse">Division '+sorted[k][1]+'</a></h4></div>';
            
            var inClass = '';
            if(k==0){
                inClass = 'in';
            }
            var table = wardLevelResult(cstmMapDataAd[key].ward_division[sorted[k][0]].results , sorted[k][1]);
            
      
            //var html_table = jQuery('<div>').append(jQuery(table).clone()).html();
     
            html+='<div aria-labelledby="heading'+wardNo+'_'+sorted[k][1]+'" role="tabpanel" id="collapse'+wardNo+'_'+sorted[k][1]+'" aria-expanded="false" class="panel-collapse collapse '+inClass+'"><div class="panel-body">'+table+'</div></div>'
            html+='</div>'; 
        }
    }
    html+='</div>';
  return html;
}

function doAdvanceSearchClear(){
    jQuery_2_0_3("#cstm_data_form").html('');
    jQuery_2_0_3("#analyze-inner-text").show();
    jQuery_2_0_3("#advance_search").find('.view_info').click();
    electionResultAd = [];
    cstmMapDataAd    = {};
    sortedWards = [];
    dataSetCounter = 0;
}

function preAdDownload(){
  
  var obj = jQuery("#downloadStuffAdvance");
  if(jQuery_2_0_3(obj).val()!=''){
    var type = jQuery_2_0_3(obj).val();
 
    if(type=='default'){
        doDownloadStuff(electionResultAd);
    }else if(type=='ward'){
        doDownloadStuffWard();
    }else if(type=='division'){
        doDownloadStuffDivision()
    }
  }else{
    alert("Please Select type First.");
  }
}



//Ward Level DownLoad
var doDownloadStuffWard = function(){
console.log("test");
    var particepent = [];
    var particepent_header = ['Ward'];
    for(var i=0;i < electionResultAd.length;i++){
      particepent.push(electionResultAd[i].name);
      particepent_header.push(electionResultAd[i].name);
    }
    //format header Accordingly
    var csvContent = 'data:text/csv;charset=utf-8,';
    var dataString;
    //Adjust Headre
    dataString = particepent_header.join(',');
    csvContent += dataString + '\n';
    var w_s_arr = sortedWards;
    for(var i=0; i< w_s_arr.length;i++){
        var testArr = [w_s_arr[i][1]];
        for(var k=1;k <= particepent.length;k++){
          testArr.push(0);
        }
        if(typeof cstmMapDataAd[w_s_arr[i][0]]){
            //console.log(cstmMapDataAd[w_s_arr[i][0]]);
            var row = sortResultsRootLevel(cstmMapDataAd[w_s_arr[i][0]].ward_result);
            for(var td=0;td < row.length;td++){
                var index = 0;
                for(var j=0;j < particepent.length;j++){
                    if(particepent[j]==row[td][0]){
                        index = j+1;
                        break;
                    }
                }
                //testArr.splice(index, 0, row[td][1]); 
                testArr[index]=row[td][1];  
            }
            dataString = testArr.join(',')
            csvContent += dataString + '\n';
        }   
    }
    openDownloadDialog(csvContent , 'WardResults');
};


// Do DownLoad for Divisions level
var doDownloadStuffDivision = function(){
    var particepent = [];
    var particepent_header = ['Ward','Division'];
    for(var i=0;i < electionResultAd.length;i++){
      particepent.push(electionResultAd[i].name);
      particepent_header.push(electionResultAd[i].name);
    }
    //format header Accordingly
    var csvContent = 'data:text/csv;charset=utf-8,';
    var dataString;
    //Adjust Headre
    dataString = particepent_header.join(',');
    csvContent += dataString + '\n';
    var w_s_arr = sortedWards;
    for(var i=0; i< w_s_arr.length;i++){
        
        if(typeof cstmMapDataAd[w_s_arr[i][0]]){
            //console.log(cstmMapDataAd[w_s_arr[i][0]]);
            var sorted = sortedWardsDivisions[w_s_arr[i][1]];
            for(var outer=0;outer < sorted.length;outer++){
                
                //console.log(sorted);//cstmMapDataAd[key].ward_division[sorted[k][0]].results
                var row = sortResultsRootLevel(cstmMapDataAd[w_s_arr[i][0]].ward_division[sorted[outer][0]].results);
                var ward = w_s_arr[i][1];
                if(w_s_arr[i][1] < 10){
                    //ward ="0"+w_s_arr[i][1];
                }
                var divi = sorted[outer][1];
                if(sorted[outer][1] < 10){
                    //divi ="0"+sorted[outer][1];
                }
                //var ward_div = ward+divi;
                var testArr = [ward];
                testArr.push(divi);
                //testArr = [];
                for(var k=1;k <= particepent.length;k++){
                  testArr.push(0);
                }
                for(var td=0;td < row.length;td++){
                    var index = 0;
                    for(var j=0;j < particepent.length;j++){
                        if(particepent[j]==row[td][0]){
                            index = j+2;
                            break;
                        }
                    }
                    //testArr.splice(index, 0, row[td][1]); 
                    testArr[index]=row[td][1];  
                }
                dataString = testArr.join(',')
                csvContent += dataString + '\n';
            }
        }   
        
    }
    openDownloadDialog(csvContent , 'divisionResults');
};

//Do Actual Dowload 
function openDownloadDialog(csvContent , name){
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    //var name = 'Election Result';
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){      // If Internet Explorer, return version number
            //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            tableString = 'sep=,\r\n' + csvContent;
            myFrame.document.open("text/html", "replace");
            myFrame.document.write(tableString);
            myFrame.document.close();
            myFrame.focus();
            myFrame.document.execCommand('SaveAs', true, name+'.csv');  
    }else{
        var a = document.createElement('a');
        a.href     = encodeURI(csvContent);
        a.target   = '_blank';
        a.download = name+'.csv';
        a.id       ='forDownload';
        document.body.appendChild(a);
        a.click();
        jQuery_2_0_3(a).remove();
    }
}


function sortResultsRootLevel(wardInfo){
    var arr = [];
    var index = 0;
    var total_votes = 0;
    var len = wardInfo.length;
    var str = '{';
    wardInfo.forEach(function(v) {
        total_votes+= parseFloat(v['votes']);
        str += '"' + v['name'] + '":"' + v['votes'] + '"';
        index++;
        if (index < len) {
            str += ' , ';
        }
    });
    str += '}';
    var cc = JSON.parse(str);
    var array = [];
    for (a in cc) {
        array.push([a, cc[a]])
    }
    array.sort(function(a, b) {
        return a[1] - b[1]
    });
    array.reverse();
    
    return array;
}