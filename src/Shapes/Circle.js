import Shape from "./Shape";

class Circle extends Shape {
	constructor(startX, startY, endX, endY) {
		super("CIRCLE");
		this.setStates(startX, startY, endX, endY);
	}

	setStates = (startX, startY, endX, endY) => {
		this.centerX = startX;
		this.centerY = startY;

		const radius = Math.sqrt((startX - endX) * (startX - endX) + (startY - endY) * (startY - endY));
		this.points = [];

		const numVert = 32;
		for (let i = 0; i < numVert; i++) {
			const angle = ((2 * Math.PI) / numVert) * i;
			this.points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
		}
	};
}

export default Circle;
