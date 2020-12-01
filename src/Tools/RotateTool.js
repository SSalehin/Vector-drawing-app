import App from "../App";
import ToolBar from "./ToolBar";

class RotateTool {
	#isRotating = false;
	#startX = 0;
	#originalPoints = [];

	constructor() {
		if (RotateTool.instance instanceof RotateTool) return RotateTool.instance;
		RotateTool.instance = null;
	}

	handleClick = event => {
		const selectedShape = App.instance.appDocument.selectedShape;
		if (selectedShape != null) {
			if (!this.#isRotating) {
				this.#isRotating = true;
				ToolBar.instance.disable();
				this.#startX = event.offsetX;
				for (let i = 0; i < selectedShape.points.length; i++) {
					this.#originalPoints.push([...selectedShape.points[i]]);
				}
			} else {
				this.#isRotating = false;
				ToolBar.instance.enable();
				this.#startX = 0;
				this.#originalPoints = [];
			}
		}
	};

	handleHover = event => {
		if (this.#isRotating) {
			const selectedShape = App.instance.appDocument.selectedShape;
			if (selectedShape != null) {
				const rotation = (event.offsetX - this.#startX) * 0.01;
				for (let i = 0; i < this.#originalPoints.length; i++) {
					let x = this.#originalPoints[i][0];
					let y = this.#originalPoints[i][1];
					selectedShape.points[i][0] =
						x * Math.cos(rotation) - y * Math.sin(rotation);
					selectedShape.points[i][1] =
						x * Math.sin(rotation) + y * Math.cos(rotation);
				}
			}
		}
	};
}

export default RotateTool;
