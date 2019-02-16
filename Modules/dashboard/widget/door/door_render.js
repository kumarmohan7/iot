/*
   All emon_widgets code is released under the GNU General Public License v3.
   See COPYRIGHT.txt and LICENSE.txt.

    ---------------------------------------------------------------------
    Part of the OpenEnergyMonitor project:
    http://openenergymonitor.org

    Author: Trystan Lea: trystan.lea@googlemail.com
    If you have any questions please get in touch, try the forums here:
    http://openenergymonitor.org/emon/forum
 */


function addOption(widget, optionKey, optionType, optionName, optionHint, optionData)
{
  widget["options"    ].push(optionKey);
  widget["optionstype"].push(optionType);
  widget["optionsname"].push(optionName);
  widget["optionshint"].push(optionHint);
  widget["optionsdata"].push(optionData);
}


function door_widgetlist()
{
  var widgets = {
    "door":
    {
      "offsetx":-40,"offsety":-40,"width":80,"height":80,
      "menu":"Widgets",
      "options":    [],
      "optionstype":[],
      "optionsname":[],
      "optionshint":[],
      "optionsdata":[]
    }
  };


  var directionDropBoxOptions = [        // Options for the type combobox. Each item is [typeID, "description"]
        [0,    "left"],
        [1,    "right"]
    ];

  addOption(widgets["door"], "feedid",     "feedid",           _Tr("Feed"),            _Tr("Feed value"),               []);
  addOption(widgets["door"], "direction", "dropbox",        _Tr("Direction"),      _Tr("Opening direction"),     directionDropBoxOptions);
  addOption(widgets["door"], "colour",    "colour_picker", _Tr("Open colour"), _Tr("Opened door colour"), []);

  return widgets;
}

function door_init()
{
  setup_widget_canvas('door');
  door_draw();
}

function door_draw() {
  $('.door').each(function(index)
  {
    var feedid = $(this).attr("feedid");
    if (associd[feedid] === undefined) { console.log("Review config for feed id of " + $(this).attr("class")); return; }
    var val = associd[feedid]['value'] * 1;
    var id = "can-"+$(this).attr("id");
    var dir = $(this).attr("direction");
    var colour = $(this).attr("colour");

    if (browserVersion >= 9)
      draw_door(widgetcanvas[id], val, dir, colour);
  });
}

function door_slowupdate() {
//  door_draw();
}

function door_fastupdate() {
    door_draw();
}

function draw_door(ctx, status, direction, colour_open){
  if (!ctx) 
    return;

  // Fix missing "#" on colour if needed
//  if (colour.indexOf("#") == -1)
  colour_open = "#" + colour_open;
  colour_closed = "rgb(100,100,100)";

  ctx.clearRect(0,0,80,80);

  if (status==1) {
    angle = 0.8;
  }
  else {
    angle = 0;
  }
  doorwidth = 6;
  doorlength = 50;

  ctx.translate(40, 60);

  // draw door frame
  ctx.fillStyle = "white";
  ctx.fillRect(-doorwidth/2, -doorlength-doorwidth/2, doorwidth, doorlength);
  ctx.fillStyle = "grey";
  ctx.fillRect(-doorwidth/2, -doorlength-doorwidth/2, doorwidth, doorwidth/2);

  if (direction==0)
    ctx.rotate(angle);
  else
    ctx.rotate(-angle);

//  // door shadow
//  ctx.shadowBlur=10;
//  ctx.shadowColor='black';
//  ctx.shadowOffsetX=5;
//  ctx.shadowOffsetY=2;

  // draw knob
  ctx.beginPath();
  if (direction==0)
    ctx.arc(doorwidth/2, -doorlength*0.8, doorwidth/2, 0, 2*Math.PI);
  else
    ctx.arc(-doorwidth/2, -doorlength*0.8, doorwidth/2, 0, 2*Math.PI);
  ctx.fillStyle = "grey";
  ctx.fill();

  // draw door
  ctx.beginPath();
  ctx.lineWidth = doorwidth;
  ctx.lineCap = "butt";
  ctx.moveTo(0,0);
  ctx.lineTo(0, -doorlength);
  if (status==1)
    ctx.strokeStyle = colour_open;
  else
    ctx.strokeStyle = colour_closed;
  ctx.stroke();

  // draw hinge
  ctx.beginPath();
  ctx.arc(0, 0, doorwidth*0.7, 0, 2*Math.PI);
  ctx.fillStyle = "grey";
  ctx.fill();

  ctx.shadowBlur=0;
  ctx.shadowOffsetX=0;
  ctx.shadowOffsetY=0;
  if (direction==0)
    ctx.rotate(-angle);
  else
    ctx.rotate(angle);
  ctx.translate(-40, -60);
}

/* 
function draw_door_ie8(circle, status, direction, colour_open){
  if (!circle) return;

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
  circle.arc(25,25,20, 0,Math.PI * 2,false);
  circle.closePath();
  circle.fill()
}

function draw_binary_led(circle,status){
  if (!circle) return;
  circle.clearRect(0,0,80,80);

  var radgrad = circle.createRadialGradient(40,40,0,40,40,20);

  if (status==0) {                               // red
    radgrad.addColorStop(0, '#F75D59');
    radgrad.addColorStop(0.9, '#C11B17');
  } else {                                       // green
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
  }

  radgrad.addColorStop(1, 'rgba(1,159,98,0)');
  // draw shapes
  circle.fillStyle = radgrad;
  circle.fillRect(20,20,60,60);
}

function draw_binary_led_ie8(circle,status){
  if (!circle) return;

  if (status==0) {			// red
    circle.fillStyle = "#C11B17";
  } else {			// green
    circle.fillStyle = "#019F62";
  }

  circle.beginPath();
  circle.arc(25,25,20, 0,Math.PI * 2,false);
  circle.closePath();
  circle.fill()
}
 */

