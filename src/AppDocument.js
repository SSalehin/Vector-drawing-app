import ColorManager from "./Coloring/ColorManager";
import ShapeFactory from "./Factories/ShapeFactory";
import ToolBar from "./Tools/ToolBar";

class AppDocument {
	shapes = [];
	selected = -1;

	constructor() {
		if (!(ColorManager.instance instanceof ColorManager)) new ColorManager();
	}

	get selectedShape() {
		if (this.selected != -1) return this.shapes[this.selected];
		else return null;
	}

	addShape = shape => {
		this.shapes.push(shape);
		this.selected = this.shapes.length - 1;
		ColorManager.instance.assignShape(this.shapes[this.selected]);
	};

	moveSelectedUp = () => {
		if (this.selected != -1 && this.selected < this.shapes.length - 1) {
			const temp = this.shapes[this.selected];
			this.shapes[this.selected] = this.shapes[this.selected + 1];
			this.shapes[this.selected + 1] = temp;
			this.selected++;
		}
	};

	moveSelectedDown = () => {
		if (this.selected != -1 && this.selected > 0) {
			const temp = this.shapes[this.selected];
			this.shapes[this.selected] = this.shapes[this.selected - 1];
			this.shapes[this.selected - 1] = temp;
			this.selected--;
		}
	};

	deleteSelected = () => {
		if (this.selected != -1) {
			for (let i = this.selected; i < this.shapes.length - 1; i++) {
				this.shapes[i] = this.shapes[i + 1];
			}
			this.shapes.pop();
			this.selected = -1;
		}
	};

	drawAll = context => {
		for (let i = 0; i < this.shapes.length; i++) {
			if (i != this.selected) this.shapes[i].drawUnselected(context);
			else this.shapes[i].drawSelected(context);
		}
	};

	setCurrent = () => {
		ShapeFactory.instance.appDocument = this;
		ToolBar.instance.appDocument = this;
	};

	handleClick = event => {
		const x = event.offsetX;
		const y = event.offsetY;
		this.selected = -1;
		for (let i = this.shapes.length - 1; i >= 0; i--) {
			if (this.shapes[i].isHit(x, y)) {
				this.selected = i;
				break;
			}
		}
		if (this.selected != -1) {
			ColorManager.instance.assignShape(this.shapes[this.selected]);
		} else {
			ColorManager.instance.assignShape(null);
		}
	};

	handleHover = (x, y) => {};
}

export default AppDocument;
