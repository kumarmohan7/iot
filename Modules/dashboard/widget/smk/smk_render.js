
  /*
   All Emoncms code is released under the GNU Affero General Public License.
   See COPYRIGHT.txt and LICENSE.txt.

    ---------------------------------------------------------------------
    Emoncms - open source energy visualisation
    Part of the OpenEnergyMonitor project:
    http://openenergymonitor.org
  */

function smk_widgetlist()
{
  var widgets = {
    "smk":
    {
      "offsetx":-40,"offsety":-40,"width":80,"height":80,
      "menu":"Widgets",
      "options":["feedid","value"],
      "optionstype":["feedid_realtime","value"],
      "optionsname":[_Tr("Feed"),_Tr("Value")],
      "optionshint":[_Tr("Feed to set, control with caution, make sure device being controlled can operate safely in event of emoncms failure."),_Tr("Starting value")]
    }
  };

  smk_events();

  return widgets;
}

function smk_events()
{
  $('.smk').on("click", function(event) {
    var feedid = $(this).attr("feedid");
    if (assocfeed[feedid]!=undefined) feedid = assocfeed[feedid]; // convert tag:name to feedid

    var invalue = $(this).attr("value");
    if (invalue == 0) outval = 1;
    if (invalue == 1) outval = 0;

    //feed.set(feedid,{'time':parseInt((new Date()).getTime()/1000),'value':outval});
    //input.set(feedid,{'value':outval});
    //$(this).feed.set(feedid,{'time':parseInt((new Date()).getTime()/1000),'value':outval});
    //input.set(feedid,{'value':outval});
    //$(this).feed.set(feedid,{'value':outval});
    
    
    var jqxhr; //jQuery XMLHttpRequest
    //outval = 1;

/*
    jqxhr = $.ajax({
        	  type: "GET",
        	  url: "https://smartiot.co.in/iot/input/post?apikey=3d016f8c936534ea442894aaf91365c6&node=My_Room",
        	  data: "&json={SW2:"+outval+"}",
        	  timeout:1000
        	});
*/    
    jqxhr = $.ajax({
        	  type: "GET",
        	  url: "https://iot.smartiot.co.in/feed/update.json?id="+feedid+"&time=UNIXTIME&value="+outval,
        	  timeout:1000
        	});
    
    console.log(jqxhr);
    
    
    
    $(this).attr("value",outval);
    var id = "can-"+$(this).attr("id");
    draw_smk(widgetcanvas[id], outval);
    associd[feedid]['value'] = outval;
  });
}

function smk_init()
{
  setup_widget_canvas('smk');
}

function smk_draw()
{
  $('.smk').each(function(index)
  {
    var feedid = $(this).attr("feedid");
    if (assocfeed[feedid]!=undefined) feedid = assocfeed[feedid]; // convert tag:name to feedid
    if (associd[feedid] == undefined) { console.log("Review config for feed id of " + $(this).attr("class")); return; }
    var val = associd[feedid]['value']*1;
    var id = "can-"+$(this).attr("id");
    draw_smk(widgetcanvas[id], val);
  });
}

function smk_slowupdate()
{
  //smk_draw();
}

function smk_fastupdate()
{
    smk_draw();
}


function draw_smk(circle,status)
{
  if (!circle) return;
  
    var width = circle.canvas.width;
    var height = circle.canvas.height;
    var borderx = Math.min(40, Math.floor(width/2));
    var bordery = Math.min(40, Math.floor(height/2));
    var dimension = Math.max(10, Math.min(width-borderx, height-bordery));
    var offsetx = Math.floor((width - dimension) / 2.0);
    var offsety = Math.floor((height - dimension) / 2.0);
    
    circle.clearRect(0,0,width,height);

    if (status==0) {			// red
      circle.fillStyle = "#C11B17";
    } else if (status==1) {			// green
      circle.fillStyle = "#019F62";
    } else if (status==2) {			// grey
      circle.fillStyle = "#4A4344";
    } else if (status==3) {			//Blue
     circle.fillStyle = "#00B5E2";
    } else if (status ==4) {		// Purple
     circle.fillStyle = "#FF0188";
    } else if (status==5)  {		// yellow
      circle.fillStyle = "#E4C700";
    } else {				// Black
      circle.fillStyle = "#000000";
    }
    circle.beginPath();
    circle.arc(width/2,height/2,dimension/2, 0,Math.PI * 2);
    circle.closePath();
    circle.fill()
}

/*
function draw_smk(circle,status)
{
  if (!circle) return;
  circle.clearRect(0,0,80,80);

  circle.fillStyle = "#ddd";
  circle.beginPath();
  circle.arc(40,40,25, 0,Math.PI * 2,false);
  circle.closePath();
  circle.fill()

  var radgrad = circle.createRadialGradient(40,40,0,40,40,20);

  if (status==0) {                              // red
    radgrad.addColorStop(0, '#F75D59');
    radgrad.addColorStop(0.9, '#C11B17');
  } else if (status>0 && status <=1) {          // green
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
  } else if (status>1 && status <=2) {          // grey
    radgrad.addColorStop(0, '#736F6E');
    radgrad.addColorStop(0.9, '#4A4344');
  } else if (status>2 && status <=3) {          // Blue
    radgrad.addColorStop(0, '#00C9FF');
    radgrad.addColorStop(0.9, '#00B5E2');
  } else if (status>3 && status <=4) {          // Purple
    radgrad.addColorStop(0, '#FF5F98');
    radgrad.addColorStop(0.9, '#FF0188');
  } else if (status>4 && status <=5)   {        // yellow
    radgrad.addColorStop(0, '#F4F201');
    radgrad.addColorStop(0.9, '#E4C700');
  } else {					  // Black
    radgrad.addColorStop(0, '#000000');
    radgrad.addColorStop(0.9, '#000000');
  }

  radgrad.addColorStop(1, 'rgba(1,159,98,0)');
  // draw shapes
  circle.fillStyle = radgrad;
  circle.fillRect(20,20,60,60);
}
*/
