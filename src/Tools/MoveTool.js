import App from "../App";
import ToolBar from "./ToolBar";

class MoveTool {
	#currentShape = null;
	#isMoving = false;
	#startX = 0;
	#startY = 0;
	#centerX = 0;
	#centerY = 0;

	constructor() {
		if (MoveTool.instance instanceof MoveTool) return MoveTool.instance;
		MoveTool.instance = this;
	}

	handleClick = event => {
		this.#currentShape = App.instance.appDocument.selectedShape;
		if (this.#currentShape != null) {
			if (this.#isMoving == false) {
				this.#isMoving = true;
				ToolBar.instance.disable();
				this.#startX = event.offsetX;
				this.#startY = event.offsetY;
				this.#centerX = this.#currentShape.centerX;
				this.#centerY = this.#currentShape.centerY;
			} else {
				this.#isMoving = false;
				ToolBar.instance.enable();
				this.#startX = 0;
				this.#startY = 0;
			}
		}
	};

	handleHover = event => {
		if (this.#isMoving) {
			const moveX = event.offsetX - this.#startX;
			const moveY = event.offsetY - this.#startY;

			this.#currentShape.centerX = this.#centerX + moveX;
			this.#currentShape.centerY = this.#centerY + moveY;
		}
	};
}

export default MoveTool;
