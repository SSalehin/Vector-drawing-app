import Circle from "../Shapes/Circle";
import ColorManager from "../Coloring/ColorManager";
import ToolBar from "../Tools/ToolBar";

class CircleFactory {
	state = null;
	#tempCircle = null;

	#x0 = 0;
	#y0 = 0;

	constructor() {
		if (CircleFactory.instance instanceof CircleFactory)
			return CircleFactory.instance;
		CircleFactory.instance = this;

		if (!(ColorManager.instance instanceof ColorManager)) new ColorManager();
	}

	//Returns a new Rectangle if created, null otherwise
	handleClick = (positionX, positionY) => {
		if (this.state == null) {
			this.#x0 = positionX;
			this.#y0 = positionY;
			this.state = "drawing";
			this.#tempCircle = new Circle(this.#x0, this.#y0, this.#x0, this.#y0);
			this.#tempCircle.fillColor = ColorManager.instance.fillColor;
			this.#tempCircle.strokeColor = ColorManager.instance.strokeColor;
			this.#tempCircle.strokeWeight = ColorManager.instance.strokeWeight;
			ToolBar.instance.disable();
			return null;
		} else {
			this.state = null;
			this.#tempCircle.setStates(this.#x0, this.#y0, positionX, positionY);
			const newCircle = this.#tempCircle;
			this.#tempCircle = null;
			ToolBar.instance.enable();
			return newCircle;
		}
	};

	//Pints the screen as a new shape is being created
	handleHover = (positionX, positionY) => {
		if (this.state != null) {
			this.#tempCircle.setStates(this.#x0, this.#y0, positionX, positionY);
		}
	};

	drawOngoing = context => {
		if (this.state != null) {
			this.#tempCircle.drawUnselected(context);
		}
	};
}

export default CircleFactory;
