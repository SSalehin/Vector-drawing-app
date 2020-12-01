import App from "../App";
import ToolBar from "./ToolBar";

class Scaletool {
	#isScaling = false;
	#startX = 0;
	#startY = 0;
	#originalPoints = [];

	constructor() {
		if (Scaletool.instance instanceof Scaletool) return Scaletool.instance;
		Scaletool.instance = this;
	}

	handleClick = event => {
		const selectedShape = App.instance.appDocument.selectedShape;
		if (selectedShape != null) {
			if (!this.#isScaling) {
				this.#isScaling = true;
				ToolBar.instance.disable();
				this.#startX = event.offsetX;
				this.#startY = event.offsetY;
				for (let i = 0; i < selectedShape.points.length; i++) {
					this.#originalPoints.push([...selectedShape.points[i]]);
				}
			} else {
				this.#isScaling = false;
				ToolBar.instance.enable();
				this.#startX = 0;
				this.#startY = 0;
				this.#originalPoints = [];
			}
		}
	};

	handleHover = event => {
		if (this.#isScaling) {
			const selectedShape = App.instance.appDocument.selectedShape;
			if (selectedShape != null) {
				const scaleX = (100 + (event.offsetX - this.#startX)) * 0.01;
				const scaleY = (100 + (event.offsetY - this.#startY)) * 0.01;
				for (let i = 0; i < this.#originalPoints.length; i++) {
					let x = this.#originalPoints[i][0];
					let y = this.#originalPoints[i][1];
					selectedShape.points[i][0] = x * scaleX;
					if (
						selectedShape.type == "RECTANGLE" ||
						selectedShape.type == "CIRCLE"
					) {
						selectedShape.points[i][1] = y * scaleX;
					} else if (selectedShape.type == "POLYGON") {
						selectedShape.points[i][1] = y * scaleY;
					}
				}
			}
		}
	};
}

export default Scaletool;
