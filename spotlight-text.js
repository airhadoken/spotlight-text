(function(){
     var interval = 2000, //(ms)
     context = $("#layer_0")[0].getContext("2d"),
     maxradius = Math.sqrt((120 + 100) * (120 + 100) + (600-230) * (600-230)),
     width = 600,
     height = 120,
     radialOffsetX = 230,
     radialOffsetY = 220;

    function drawFrame() {
      context.clearRect(0, 0, width, height);
	context.save();
	context.beginPath();
	context.moveTo(radialOffsetX, radialOffsetY);
	//Create fraction of interval time as fraction of circle in radians
        var t = new Date().getTime() % interval / interval * Math.PI * 2;
	context.arc(radialOffsetX, radialOffsetY, maxradius, t, t + Math.PI, false );
	var vectorX = -maxradius * Math.cos(t);
	var vectorY = maxradius * Math.sin(t);
	drawParticles(vectorX, vectorY);

	context.closePath();
	context.clip();

      context.font = "75px sans-serif";
      context.fillStyle = "rgb(0, 0, 0)";
      context.fillText($("#text_entry").val(), 50, 100);
	context.restore(); // reset clipping window
      setTimeout(drawFrame, 10);
    }

     function drawParticles(vectorX, vectorY) {
	 for(var i = 0; i < 2000 ; i++) {
	     var offsetX = Math.random();
	     offsetX = Math.pow(offsetX, 4) * maxradius;
	     var signX = Math.random() >= 0.5 ? 1 : -1;
	     var t = Math.random();
	     var offsetY = radialOffsetY - t * vectorY;
	     offsetX = t * (vectorX) + signX * t * offsetX + radialOffsetX;
	     context.fillRect(offsetX, offsetY, 1, 1);
	 }
     }

    drawFrame();
})();