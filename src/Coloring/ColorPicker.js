class ColorPicker {
	value = {
		r: 50,
		g: 25,
		b: 180,
		a: 255,
	};

	parent = null;
	#preview = null;
	domElement = null;
	subscriber = null;

	redElement = null;
	blueElement = null;
	greenElement = null;
	alphaElement = null;

	constructor(name) {
		const element = document.createElement("div");
		element.classList.add("color-picker");
		this.domElement = element;
		this.subscriber = null;

		const heading = document.createElement("h6");
		heading.innerText = name;
		element.appendChild(heading);

		const colorGroup = document.createElement("div");
		colorGroup.classList.add("color-group");
		element.appendChild(colorGroup);

		const preview = document.createElement("section");
		preview.classList.add("color-preview");

		colorGroup.appendChild(preview);
		this.#preview = preview;
		this.#update();

		const valueList = document.createElement("ul");
		colorGroup.appendChild(valueList);

		this.redElement = this.#createRangeSlider("red");
		valueList.appendChild(this.redElement);
		this.greenElement = this.#createRangeSlider("green");
		valueList.appendChild(this.greenElement);
		this.blueElement = this.#createRangeSlider("blue");
		valueList.appendChild(this.blueElement);
		this.alphaElement = this.#createRangeSlider("alpha");
		valueList.appendChild(this.alphaElement);

		this.value = {
			r: Math.random() * 255,
			g: Math.random() * 255,
			b: Math.random() * 255,
			a: 255,
		};

		this.#update();
	}

	setValue = value => {
		this.value = { ...value };
		this.redElement.querySelector("input").value = value.r.toString();
		this.greenElement.querySelector("input").value = value.g.toString();
		this.blueElement.querySelector("input").value = value.b.toString();
		this.alphaElement.querySelector("input").value = value.a.toString();
		this.#update();
	};

	attatchTo = parent => {
		this.parent = parent;
		parent.appendChild(this.domElement);
	};

	#update = () => {
		this.#preview.style.backgroundColor =
			"rgba(" + this.value.r + "," + this.value.g + "," + this.value.b + "," + this.value.a + ")";

		//Notify the subscriber
		if (this.subscriber) this.subscriber({ ...this.value });
	};

	#createRangeSlider = componentName => {
		const listEntry = document.createElement("li");

		const label = document.createElement("label");

		const element = document.createElement("input");
		element.type = "range";
		element.min = 0;
		element.max = 255;
		element.step = 0.01;
		if (componentName == "red") {
			label.innerText = "R:";
			label.style = "color: red";
			element.value = this.value.r;
			element.class = "color-slider red-amount";
			element.oninput = () => {
				this.value.r = Number(element.value);
				this.#update();
			};
		} else if (componentName == "green") {
			label.innerText = "G:";
			label.style = "color: green";
			element.value = this.value.g;
			element.class = "color-slider green-amount";
			element.oninput = () => {
				this.value.g = Number(element.value);
				this.#update();
			};
		} else if (componentName == "blue") {
			label.innerText = "B:";
			label.style = "color: blue";
			element.value = this.value.b;
			element.class = "color-slider blue-amount";
			element.oninput = () => {
				this.value.b = Number(element.value);
				this.#update();
			};
		} else if (componentName == "alpha") {
			label.innerText = "A:";
			label.style = "color: darkgray";
			element.max = 1.0;
			element.value = this.value.a / 255;
			element.class = "color-slider alpha-amount";
			element.oninput = () => {
				this.value.a = Number(element.value);
				this.#update();
			};
		}

		listEntry.appendChild(label);
		listEntry.appendChild(element);
		return listEntry;
	};
}

export default ColorPicker;
