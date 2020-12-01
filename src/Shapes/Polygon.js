import Shape from "./Shape";

class Polygon extends Shape {
	constructor(startX, startY) {
		super("POLYGON");

		this.centerX = 0;
		this.centerY = 0;

		this.points = [
			[startX, startY],
			[startX, startY],
		];
	}

	finalizeStates = () => {
		let totalX = 0;
		let totalY = 0;
		for (let i = 0; i < this.points.length; i++) {
			totalX += this.points[i][0];
			totalY += this.points[i][1];
		}

		this.centerX = totalX / this.points.length;
		this.centerY = totalY / this.points.length;

		for (let i = 0; i < this.points.length; i++) {
			this.points[i][0] -= this.centerX;
			this.points[i][1] -= this.centerY;
		}
	};
}

export default Polygon;
