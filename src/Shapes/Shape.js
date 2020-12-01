class Shape {
	type = null;
	centerX = 0;
	centerY = 0;
	rotation = 0;

	points = [];

	fillColor = null;

	strokeColor = null;

	strokeWeight = 0.1;

	constructor(type) {
		this.type = type;
	}

	drawUnselected = context => {
		this.#traceShape(context);
		if (this.points.length > 2) this.#drawFill(context);
		this.#drawStroke(context);
	};

	drawSelected = context => {
		this.#traceShape(context);
		this.#drawOutline(context);
		this.#drawFill(context);
		this.#drawStroke(context);
	};

	isHit = (x, y) => {
		const inside = (point, vs) => {
			// ray-casting algorithm based on
			// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

			var x = point[0],
				y = point[1];

			var inside = false;
			for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
				var xi = vs[i][0] + this.centerX,
					yi = vs[i][1] + this.centerY;
				var xj = vs[j][0] + this.centerX,
					yj = vs[j][1] + this.centerY;

				var intersect = yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
				if (intersect) inside = !inside;
			}

			return inside;
		};

		return inside([x, y], this.points);
	};

	#getStyle = option => {
		let source;
		if (option == "STROKE") source = this.strokeColor;
		else if (option == "FILL") source = this.fillColor;
		else
			source = {
				r: 255 - this.strokeColor.r,
				g: 255 - this.strokeColor.g,
				b: 255 - this.strokeColor.b,
				a: 255,
			};

		return "rgba(" + source.r + "," + source.g + "," + source.b + "," + source.a + ")";
	};

	#traceShape = context => {
		context.beginPath();
		context.moveTo(this.points[0][0] + this.centerX, this.points[0][1] + this.centerY);
		for (let i = 1; i < this.points.length; i++)
			context.lineTo(this.points[i][0] + this.centerX, this.points[i][1] + this.centerY);
		context.closePath();
	};

	#drawStroke = context => {
		context.strokeStyle = this.#getStyle("STROKE");
		context.lineWidth = this.strokeWeight;
		context.stroke();
	};

	#drawOutline = context => {
		context.strokeStyle = this.#getStyle("HIGHLIGHT");
		context.lineWidth = this.strokeWeight + 5;
		context.stroke();
	};

	#drawFill = context => {
		context.fillStyle = this.#getStyle("FILL");
		context.fill();
	};

	setFillColor = color => {
		this.fillColor = { ...color };
	};

	setStrokeColor = color => {
		this.strokeColor = { ...color };
	};

	setStrokeWeight = weight => {
		this.strokeWeight = weight;
	};
}

export default Shape;
