import ColorManager from "../Coloring/ColorManager";
import CircleFactory from "./CircleFactory";
import RectangleFactory from "./RectangleFactory";
import App from "../App";

class ShapeFactory {
	currentFactory = null;

	rectangleFactory = null;
	circleFactory = null;

	appDocument = null;

	constructor() {
		if (ShapeFactory.instance instanceof ShapeFactory) return ShapeFactory.instance;
		ShapeFactory.instance = this;
		this.rectangleFactory = new RectangleFactory();
		this.circleFactory = new CircleFactory();
		this.currentFactory = this.rectangleFactory;
	}

	drawOngoing = context => {
		this.currentFactory.drawOngoing(context);
	};

	//Returns new Shape as it is created
	handleClick = event => {
		const newShape = this.currentFactory.handleClick(event.offsetX, event.offsetY);
		if (newShape != null) {
			App.instance.appDocument.addShape(newShape);
		}
	};

	handleHover = event => this.currentFactory.handleHover(event.offsetX, event.offsetY);
}

export default ShapeFactory;
