import ShapeFactory from "./Factories/ShapeFactory";
import ColorManager from "./Coloring/ColorManager";
import AppDocument from "./AppDocument";
import ToolBar from "./Tools/ToolBar";
import RectangleFactory from "./Factories/RectangleFactory";

class App {
	domElement = null;
	appDocument = null;
	canvas = null;
	context = null;
	toolBar = null;

	currentTool = null;

	constructor() {
		if (App.instance instanceof App) return App.instance;
		App.instance = this;

		this.domElement = document.querySelector("#app");
		document.body.appendChild(this.domElement);

		this.toolBar = new ToolBar(this.appDocument);

		//Initiate canvas
		this.canvas = document.querySelector("canvas");
		this.canvas.border = "3px solid black";
		//Handle canvas resizing properly
		this.canvas.height = this.canvas.clientHeight;
		this.canvas.width = this.canvas.clientWidth;
		window.onresize = () => {
			this.canvas.height = this.canvas.clientHeight;
			this.canvas.width = this.canvas.clientWidth;
		};

		this.canvas.addEventListener("click", event => this.currentTool.handleClick(event));
		this.canvas.addEventListener("mousemove", event => this.currentTool.handleHover(event));
		this.domElement.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");

		//Initiate dependencies
		if (!(ShapeFactory.instance instanceof ShapeFactory)) new ShapeFactory(this.appDocument);
		this.currentTool = ShapeFactory.instance;
		if (!(ColorManager.instance instanceof ColorManager)) new ColorManager();
		ColorManager.instance.attatchTo(this.domElement);
		this.appDocument = new AppDocument();
		this.appDocument.setCurrent();

		//Kick-off rendering loop
		this.#loop();
	}

	#loop = () => {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.appDocument.drawAll(this.context);
		ShapeFactory.instance.drawOngoing(this.context);
		requestAnimationFrame(this.#loop);
	};
}
export default App;
