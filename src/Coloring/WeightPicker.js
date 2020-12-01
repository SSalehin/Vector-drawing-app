class WeightPicker {
	//TRY static methods
	value = 2;

	parent = null;
	domElement = null;
	inputElem = null;

	subscriber = null;

	constructor() {
		const element = document.createElement("div");
		element.classList.add("weight-picker");
		this.domElement = element;

		const label = document.createElement("h6");
		label.innerText = "Stroke weight";
		this.domElement.appendChild(label);

		this.inputElem = document.createElement("input");
		this.inputElem.type = "range";
		this.inputElem.min = 0.1;
		this.inputElem.max = 20.0;
		this.inputElem.value = 2;
		this.inputElem.oninput = () => {
			this.value = parseFloat(this.inputElem.value);
			this.#update();
		};
		this.domElement.appendChild(this.inputElem);
	}

	setValue = value => {
		this.value = value;
		this.inputElem.value = value;
	};

	#update = () => {
		if (this.subscriber) this.subscriber(this.value);
	};

	attatchTo = parent => {
		this.parent = parent;
		parent.appendChild(this.domElement);
	};
}

export default WeightPicker;
