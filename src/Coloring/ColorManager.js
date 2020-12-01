import ColorPicker from "./ColorPicker";
import WeightPicker from "./WeightPicker";

//--------Singleton--------------
class ColorManager {
	domElement = null;
	parent = null;
	fillColorPicker = null;
	strokeColorPicker = null;
	strokeWeightPicker = null;

	get fillColor() {
		return this.fillColorPicker.value;
	}
	get strokeColor() {
		return this.strokeColorPicker.value;
	}
	get strokeWeight() {
		return this.strokeWeightPicker.value;
	}

	constructor() {
		if (ColorManager.instance instanceof ColorManager)
			return ColorManager.instance;
		ColorManager.instance = this;

		this.domElement = document.querySelector("#color-manager");

		this.fillColorPicker = new ColorPicker("Fill color");
		this.fillColorPicker.attatchTo(this.domElement);

		this.strokeColorPicker = new ColorPicker("Stroke color");
		this.strokeColorPicker.attatchTo(this.domElement);

		this.strokeWeightPicker = new WeightPicker();
		this.strokeWeightPicker.attatchTo(this.domElement);
	}

	attatchTo = parent => {
		this.parent = parent;
		parent.appendChild(this.domElement);
	};

	assignShape = shape => {
		this.fillColorPicker.subscriber = null;
		this.strokeColorPicker.subscriber = null;
		this.strokeWeightPicker.subscriber = null;
		if (shape != null) {
			this.fillColorPicker.setValue(shape.fillColor);
			this.fillColorPicker.subscriber = shape.setFillColor;

			this.strokeColorPicker.setValue(shape.strokeColor);
			this.strokeColorPicker.subscriber = shape.setStrokeColor;

			this.strokeWeightPicker.setValue(shape.strokeWeight);
			this.strokeWeightPicker.subscriber = shape.setStrokeWeight;
		}
	};
}

export default ColorManager;
