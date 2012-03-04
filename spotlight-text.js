/**
   spotlight-text/spotlight-text.js
   (C) 2012 Bradley Momberger.
   @version 1.0
   Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

   Notes:
   This library will draw into a canvas the text specified in the text box, with a "sweeping spotlight" animation that both shows and hides the text.
*/
(function(){
	 var interval = 2500, //(ms)
     context = $("#layer_0")[0].getContext("2d"),
     maxradius = Math.sqrt((120 + 100) * (120 + 100) + (600-230) * (600-230)),
     width = $("#layer_0").width(),
     height = $("#layer_0").height(),
     radialOffsetX = 230,
     radialOffsetY = 220,
     textOffsetX = 50,
     textOffsetY = 85,
     drawNextFrame = false,
     fillText,
     lastVectorX = 1;

    function drawFrame() {
		var frameStartTime = new Date().getTime();

		context.fillStyle= "rgb(0,0,0)"
		context.fillRect(0, 0, width, height);
		context.fillStyle = "rgb(255, 255, 255)";
		context.save();
		context.beginPath();
		context.moveTo(radialOffsetX, radialOffsetY);
		//Create fraction of interval time as fraction of circle in radians
        var t = new Date().getTime() % interval / interval * Math.PI * 2;
		context.arc(radialOffsetX, radialOffsetY, maxradius, t, t + Math.PI, false );
		var vectorX = -maxradius * Math.sin(t);
		var vectorY = maxradius * Math.cos(t);
		drawParticles(vectorX, vectorY, 1);

		context.closePath();
		context.clip();
		if(lastVectorX >= 0 && vectorX < 0)
			fillText = $("#text_entry").val();

		lastVectorX = vectorX;

		context.font = "75px sans-serif";
		context.fillText(fillText, textOffsetX, textOffsetY);
		context.restore(); // reset clipping window

		context.beginPath();
		context.moveTo(radialOffsetX, radialOffsetY);
		context.arc(radialOffsetX, radialOffsetY, maxradius, t + Math.PI - 0.5, t + Math.PI, false );
		context.fill();

		context.beginPath();
		context.moveTo(radialOffsetX, radialOffsetY);
		context.arc(radialOffsetX, radialOffsetY, maxradius, t - 0.5, t, false );
		context.fill();

		vectorX = -maxradius * Math.sin(t - 0.5);
		vectorY = maxradius * Math.cos(t - 0.5);
		drawParticles(vectorX, vectorY, -1);

		if(drawNextFrame) 
			setTimeout(drawFrame, 30 - (new Date().getTime() - frameStartTime));
    }

	 function drawParticles(vectorX, vectorY, direction) {
		 if(vectorX == 0)return;
		 for(var i = 0; i < height ; i+=2) {
			 var baseX = vectorY / vectorX * (i + radialOffsetY - height) + radialOffsetX;
			 var t = Math.random();
			 var offsetY = height - i;
			 var offsetX = direction * Math.random() * (width - baseX);
			 var x = Math.random(), y = 1-x, z = x-y/2;
			 offsetX *= z;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
			 offsetX *= x;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
			 offsetX *= y;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
			 offsetX *= z;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
			 offsetX *= x;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
			 offsetX *= y;
			 context.fillRect(baseX + offsetX, offsetY, 2, 2);
		 }
	 }

     $("#startToggle").click(
		 function(){
			 if(drawNextFrame) {
				 //stop case
				 $(this).val("Start spotlight");
				 drawNextFrame = false;
			 } else {
				 //start case
				 $(this).val("Stop spotlight");
				 drawNextFrame = true;
				 drawFrame();
			 }
		 });
})();