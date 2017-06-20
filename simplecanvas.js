var simpleCanvas = function() {

	let cursor;
	let canvas = null;
	let ctx = null;
	let paint = false;
	let radius = 3;
	let color = "#000000";

	let points 		= [];
	let offset 		= null;
	let lastclick 	= [];

	function setCursor(){

		let context;
		context = cursor.getContext('2d');

		context.canvas.width = (radius * 3);
		context.canvas.height = (radius * 3);

		var centerX = cursor.width / 2;
		var centerY = cursor.height / 2;


		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = color;
		context.fill();
		context.lineWidth = radius * 0.2;
		context.strokeStyle = '#000000';
		context.stroke();
		context.closePath();

		canvas.style.cursor = 'url('+cursor.toDataURL()+') ' +(radius * 1.5)+' ' +(radius * 1.5)+', auto';
	}

	function init(canvas_id){

		cursor = document.createElement('canvas');
		
		canvas = document.getElementById(canvas_id);
		canvas.addEventListener("mousemove", function(e){
			if(paint){
				addClick(e.pageX - offset.left, e.pageY - offset.top, true);
				redraw();
			}
		});

		setCursor();

		canvas.addEventListener("mousedown", function(e){

			offset = this.getBoundingClientRect();
			lastclick.push(points.length);

			// Mouse down location
			var mouseX = e.pageX - offset.left;
			var mouseY = e.pageY - offset.top;

			paint = true;
			addClick(mouseX, mouseY, false);
			redraw();
		});

		canvas.addEventListener("mouseup", function(e){
			paint = false;
	  		redraw();
		});

		ctx = canvas.getContext('2d');
	}

	function reset(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function clear(){
		points = [];
		lastclick = [];
		reset();
	}

	function undo(){

		let i = points.length;

		if(i === 0 || lastclick.length === 0){
			return false;
		}

		let x = lastclick.pop();

		for (i; i > x; i--) {
			points.pop();
		}

		redraw();
	}

	function setSize(w,h){
		ctx.canvas.width  = w;
		ctx.canvas.height = h;
	}

	function setColor(c){
		color = c;
		setCursor();
	}

	function setRadius(r){
		if(r==1){
			radius++;
		}else{
			radius--;
		}

		setCursor();
	}

	function addClick(x, y, dragging){

		points.push({
			x:x,
			y:y,
			c:color,
			s:radius,
			d:dragging
		});
	}

	function redraw(){

		reset();

		ctx.lineJoin = "round";

		let size = points.length;
		for(let i=0; i < size; i++) {

			let point = points[i];

			ctx.beginPath();
			if(point.d && i){
				ctx.moveTo(points[i-1].x, points[i-1].y);
			}else{
				ctx.moveTo(point.x-1, point.y);
			}

			ctx.lineTo(point.x, point.y);
			ctx.closePath();
			ctx.strokeStyle = point.c;
			ctx.lineWidth = point.s;
			ctx.stroke();
		}
	}

	return {
		init: init,
		setSize: setSize,
		clear: clear,
		setColor: setColor,
		setRadius: setRadius,
		undo: undo,
	};
}();