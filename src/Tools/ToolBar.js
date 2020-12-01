import App from "../App";
import ShapeFactory from "../Factories/ShapeFactory";
import RectangleFactory from "../Factories/RectangleFactory";
import CircleFactory from "../Factories/CircleFactory";
import PolygonFactory from "../Factories/PolygonFactory";
import MoveTool from "./MoveTool";
import RotateTool from "./RotateTool";
import ScaleTool from "./ScaleTool";

class ToolBar {
	domElement = null;

	appDocument = null;

	creationButtons = {
		rectangle: null,
		circle: null,
	};

	utilityButtons = {
		selection: null,
		move: null,
		rotate: null,
		scale: null,
		moveUp: null,
		moveDown: null,
		delete: null,
	};

	constructor() {
		if (ToolBar.instance instanceof ToolBar) return ToolBar.instance;
		ToolBar.instance = this;

		if (!(App.instance instanceof App)) new App();

		this.domElement = document.querySelector("#toolbar");

		this.#createButton("CREATE_RECTANGLE");
		this.#createButton("CREATE_CIRCLE");
		this.#createButton("CREATE_POLYGON");

		this.#createButton("SELECT");
		this.#createButton("MOVE");
		this.#createButton("ROTATE");
		this.#createButton("SCALE");
		this.#createButton("MOVE_UP");
		this.#createButton("MOVE_DOWN");
		this.#createButton("DELETE");
	}

	#reassignSelected = element => {
		const selectedButton = this.domElement.querySelector(".selected");
		if (selectedButton) selectedButton.classList.remove("selected");
		element.classList.add("selected");
	};

	#createButton = type => {
		const element = document.createElement("button");
		this.domElement.appendChild(element);

		if (type == "CREATE_RECTANGLE") {
			element.innerHTML = "<img src='icons/rectangle.png' alt='Box'>";
			element.classList.add("creation-tool");
			element.classList.add("selected");
			element.onclick = () => {
				ShapeFactory.instance.currentFactory = new RectangleFactory();
				App.instance.currentTool = new ShapeFactory();
				this.#reassignSelected(element);
			};
			this.creationButtons.rectangle = element;
		} else if (type == "CREATE_CIRCLE") {
			element.innerHTML = "<img src='icons/circle.png' alt='Circle'>";
			element.classList.add("creation-tool");
			element.onclick = () => {
				ShapeFactory.instance.currentFactory = new CircleFactory();
				App.instance.currentTool = new ShapeFactory();
				this.#reassignSelected(element);
			};
			this.creationButtons.circle = element;
		} else if (type == "CREATE_POLYGON") {
			element.innerHTML = "<img src='icons/polygon.png' alt='Polygon'>";
			element.classList.add("creation-tool");
			element.onclick = () => {
				ShapeFactory.instance.currentFactory = new PolygonFactory();
				App.instance.currentTool = new ShapeFactory();
				this.#reassignSelected(element);
			};
			this.creationButtons.circle = element;
		} else if (type == "SELECT") {
			element.innerHTML = "<img src='icons/select.png' alt='Select'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.currentTool = this.appDocument;
				this.#reassignSelected(element);
			};
			this.utilityButtons.selection = element;
		} else if (type == "MOVE") {
			element.innerHTML = "<img src='icons/move.png' alt='Move'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.currentTool = new MoveTool();
				this.#reassignSelected(element);
			};
			this.utilityButtons.move = element;
		} else if (type == "ROTATE") {
			element.innerHTML = "<img src='icons/rotate.png' alt='Rotate'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.currentTool = new RotateTool();
				this.#reassignSelected(element);
			};
			this.utilityButtons.rotate = element;
		} else if (type == "SCALE") {
			element.innerHTML = "<img src='icons/scale.png' alt='Scale'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.currentTool = new ScaleTool();
				this.#reassignSelected(element);
			};
			this.utilityButtons.scale = element;
		} else if (type == "MOVE_UP") {
			element.innerHTML = "<img src='icons/moveUp.png' alt='Move Up'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.appDocument.moveSelectedUp();
			};
			this.utilityButtons.moveUp = element;
		} else if (type == "MOVE_DOWN") {
			element.innerHTML = "<img src='icons/moveDown.png' alt='Move Down'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.appDocument.moveSelectedDown();
			};
			this.utilityButtons.moveDown = element;
		} else if (type == "DELETE") {
			element.innerHTML = "<img src='icons/delete.png' alt='Delete'>";
			element.classList.add("utility-tool");
			element.onclick = () => {
				App.instance.appDocument.deleteSelected();
			};
			this.utilityButtons.delete = element;
		}
	};

	attatchTo = element => element.appendChild(element);

	disable = () => {
		this.domElement.style.visibility = "hidden";
	};
	enable = () => (this.domElement.style.visibility = "visible");
}

export default ToolBar;
