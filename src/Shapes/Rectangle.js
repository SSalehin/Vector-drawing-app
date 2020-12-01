import Shape from "./Shape";

class Rectangle extends Shape {
	constructor(startX, startY, endX, endY) {
		super("RECTANGLE");
		this.setStates(startX, startY, endX, endY);
	}

	setStates = (startX, startY, endX, endY) => {
		this.centerX = (startX + endX) / 2;
		this.centerY = (startY + endY) / 2;
		this.points = [
			[startX - this.centerX, startY - this.centerY],
			[endX - this.centerX, startY - this.centerY],
			[endX - this.centerX, endY - this.centerY],
			[startX - this.centerX, endY - this.centerY],
		];
	};
}

export default Rectangle;
