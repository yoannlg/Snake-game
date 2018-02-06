window.onload = function () {
	var canvasWidth = 900,
		canvasHeight = 600,
		blocSize = 30,
		ctx,
		delay = 400,
		snakee,
		applee,
		widthInBlocks = canvasWidth / blocSize,
		heightInBlocks = canvasHeight / blocSize;
 		

	init();

	function init() {
		var canvas = document.createElement('canvas');
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		canvas.style.border = "1px solid";
		canvas.style.display = 'flex';
		canvas.style.margin = 'auto';
		document.body.appendChild(canvas);
		ctx = canvas.getContext('2d');
		snakee = new Snake([[6, 4], [5, 4], [4, 4]], "right");
		applee = new Apple([10,10]);
		refreshCanvas();
	}

	function refreshCanvas() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		snakee.advance();
		snakee.draw();
		applee.draw();
		setTimeout(refreshCanvas, delay);
	}

	function drawBloc(ctx, position) {
		var x = position[0] * blocSize;
		var y = position[1] * blocSize;
		ctx.fillRect(x, y, blocSize, blocSize);
	}

	function Snake(body, direction) {
		this.body = body;
		this.direction = direction;
		this.draw = function () {
			ctx.save();
			ctx.fillStyle = '#ff0000';
			for (var i = 0; i < this.body.length; i++) {
				drawBloc(ctx, this.body[i]);
			}
			ctx.restore();
		};

		this.advance = function () {
			var nextPosition = this.body[0].slice();
			switch (this.direction) {
				case "left":
					nextPosition[0] -= 1;
					break;
				case "right":
					nextPosition[0] += 1;
					break;
				case "down":
					nextPosition[1] += 1;
					break
				case "up":
					nextPosition[1] -= 1;
					break;
			}
			this.body.unshift(nextPosition);
			this.body.pop();
		};

		this.setDirection = function (newDirection) {
			var allowedDirections;
			switch (this.direction) {
				case "left":
				case "right":
					allowedDirections = ["up", "down"];
					break;
				case "down":
				case "up":
					allowedDirections = ["left", "right"];
					break;
			};
			if (allowedDirections.indexOf(newDirection) > -1) {
				this.direction = newDirection;
			}
		};

		this.checkCollision = function(){
			var wallCollision = false;
			var snakeCollision = false;
			var head = this.body[0];
			var rest = this.body.slice(1);
			var snakeX = head[0];
			var snakeY = head[1];
			var minX = 0;
			var minY = 0;
			var maxX = widthInBlocks - 1;
			var marY = heightInBlocks - 1;
			var isNotBetweenHorzontalWalls = snakeX < minX || snakeX > maxX;
			var isNotBetweenVerticalWalls = snakeX < minY || snakeX > maxY;
			var headinBody = ;

			if(isNotBetweenHorzontalWalls || isNotBetweenVerticalWalls){
				return wallCollision = true;
			}

			if (tête in rest) {
				return snakeCollision = true;
			}
		}
	}

	function Apple(position){
		this.position = position;
		this.draw = function(){
			ctx.save();
			ctx.fillStyle = "#33cc33";
			ctx.beginPath();
			var radius = blocSize/2;
			var x = position[0]*blocSize+radius;
			var y = position[1]*blocSize+radius;
			ctx.arc(x, y, radius, 0, Math.PI*2, true);
			ctx.fill();
			ctx.restore();
		}
	}

	document.onkeydown = function handleKeyDown(e) {
		var key = e.keyCode;
		var newDirection;
		switch (key) {
			case 37:
			case 81:
				newDirection = "left";
				break;

			case 38:
			case 90:
				newDirection = "up";
				break;

			case 39:
			case 68:
				newDirection = "right";
				break;

			case 40:
			case 83:
				newDirection = "down";
				break;
		}
		snakee.setDirection(newDirection);
	}

}

