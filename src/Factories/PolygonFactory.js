import Polygon from "../Shapes/Polygon";
import ColorManager from "../Coloring/ColorManager";
import ToolBar from "../Tools/ToolBar";

class PolygonFactory {
	#tempPolygon = null;

	#x0 = -1;
	#y0 = -1;

	constructor() {
		if (PolygonFactory.instance instanceof PolygonFactory)
			return PolygonFactory.instance;
		PolygonFactory.instance = this;

		if (!(ColorManager.instance instanceof ColorManager)) new ColorManager();
	}

	//Returns a new Rectangle if created, null otherwise
	handleClick = (positionX, positionY) => {
		const distance = (point1, point2) =>
			Math.sqrt(
				(point1[0] - point2[0]) * (point1[0] - point2[0]) +
					(point1[1] - point2[1]) * (point1[1] - point2[1])
			);

		if (this.#tempPolygon == null) {
			this.#x0 = positionX;
			this.#y0 = positionY;
			this.#tempPolygon = new Polygon(this.#x0, this.#y0, this.#x0, this.#y0);
			this.#tempPolygon.fillColor = ColorManager.instance.fillColor;
			this.#tempPolygon.strokeColor = ColorManager.instance.strokeColor;
			this.#tempPolygon.strokeWeight = ColorManager.instance.strokeWeight;
			ToolBar.instance.disable();
		} else {
			const length = this.#tempPolygon.points.length;
			if (
				distance([this.#x0, this.#y0], this.#tempPolygon.points[length - 1]) < 10
			) {
				this.#tempPolygon.points.pop();
				this.#tempPolygon.finalizeStates();
				const newPoly = this.#tempPolygon;
				this.#tempPolygon = null;
				this.#x0 = -1;
				this.#y0 = -1;
				ToolBar.instance.enable();
				return newPoly;
			}
			let isClose = false;
			for (let i = 0; i < length - 1; i++) {
				const currentDistance = distance(
					[positionX, positionY],
					this.#tempPolygon.points[i]
				);
				if (currentDistance < 10) isClose = true;
			}
			if (!isClose) this.#tempPolygon.points.push([positionX, positionY]);
		}
	};

	//Pints the screen as a new shape is being created
	handleHover = (positionX, positionY) => {
		if (this.#tempPolygon) {
			const length = this.#tempPolygon.points.length;
			this.#tempPolygon.points[length - 1] = [positionX, positionY];
		}
	};

	drawOngoing = context => {
		if (this.#tempPolygon) {
			this.#tempPolygon.drawUnselected(context);
		}
	};
}

export default PolygonFactory;
