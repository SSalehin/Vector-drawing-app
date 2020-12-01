import Rectangle from "../Shapes/Rectangle";
import ColorManager from "../Coloring/ColorManager";
import ToolBar from "../Tools/ToolBar";

class RectangleFactory {
	state = null;

	#tempRectangle = null;

	#x0 = 0;
	#y0 = 0;

	constructor() {
		if (RectangleFactory.instance instanceof RectangleFactory)
			return RectangleFactory.instance;
		RectangleFactory.instance = this;

		if (!(ColorManager.instance instanceof ColorManager)) new ColorManager();
	}

	//Returns a new Rectangle if created, null otherwise
	handleClick = (positionX, positionY) => {
		if (this.state == null) {
			this.#x0 = positionX;
			this.#y0 = positionY;
			this.state = "drawing";
			this.#tempRectangle = new Rectangle(this.#x0, this.#y0, this.#x0, this.#y0);
			this.#tempRectangle.fillColor = ColorManager.instance.fillColor;
			this.#tempRectangle.strokeColor = ColorManager.instance.strokeColor;
			this.#tempRectangle.strokeWeight = ColorManager.instance.strokeWeight;
			ToolBar.instance.disable();
			return null;
		} else {
			this.state = null;
			this.#tempRectangle.setStates(this.#x0, this.#y0, positionX, positionY);
			const newRect = this.#tempRectangle;
			this.#tempRectangle = null;
			ToolBar.instance.enable();
			return newRect;
		}
	};

	//Pints the screen as a new shape is being created
	handleHover = (positionX, positionY) => {
		if (this.state != null) {
			this.#tempRectangle.setStates(this.#x0, this.#y0, positionX, positionY);
		}
	};

	drawOngoing = context => {
		if (this.state != null) {
			this.#tempRectangle.drawUnselected(context);
		}
	};
}

export default RectangleFactory;
