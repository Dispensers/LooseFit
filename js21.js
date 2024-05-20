/* -------- Main Window -------- */

class MainWindow {
	constructor() {
		console.log(`${window.innerHeight}px`);
		console.log(`${window.innerWidth}px`);
		console.log(`${window.devicePixelRatio}`);
		
		this.innerHeight = window.innerHeight;
		this.innerWidth = window.innerWidth;
		this.devicePixelRatio = window.devicePixelRatio;
	}
}

let mainWindow = new MainWindow();


/* -------- Utility Functions -------- */

function wait(duration) {
	return new Promise((resolve, reject) => {setTimeout(resolve, duration)});
}

function disableScrolling() {
	document.body.classList.add("DisableScrolling");
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

	window.onscroll = function() {window.scrollTo(scrollLeft, scrollTop);};
}

function enableScrolling() {
	document.body.classList.remove("DisableScrolling");
	window.onscroll = function() {};
}


/* -------- Published -------- */

function publishedOnClick(eventObject) {
	console.log("publishedOnClick called", eventObject);
	const target = eventObject.target;
	target.style.color = "#551A8B";
	const id = target.id;
	indexAsString = id.split("-")[1];
	index = Number(indexAsString);
	console.log(id, indexAsString, index);

	disableScrolling();
	const newPunterPuzzle = new Puzzle(puzzleSpecs[index]);
	reconfigure(newPunterPuzzle);
	mainWall.show();	
	punter.solveBiz.wake();
}

class Published {
	constructor() {
		const publishedRef = document.querySelector("#iwTCPublishedPuzzles-2");
		for (let i = 0; i < puzzleSpecs.length; i++) {
			const puzzleSpec = puzzleSpecs[i];
			const puzzleRef = document.createElement("button");
			puzzleRef.id = "iwTCPublishedPuzzle-" + String(i);
			puzzleRef.type = "button";
			puzzleRef.style =
				"margin:0; padding:0.3em 0 0.3em 0; border:none; background-color:transparent; " +
				"box-sizing:border-box; width:12.5%; " +
				"font-size:2.5em; text-decoration-line:underline;";
			if (i == 0) {
				puzzleRef.style.color = "#551A8B";
			}
			else {
				puzzleRef.style.color = "#0000EE";
			}
			puzzleRef.append(String(puzzleSpec.number));
			puzzleRef.addEventListener("click", publishedOnClick);
			publishedRef.append(puzzleRef);
		}
	}
}


/* -------- Puzzle -------- */

class Puzzle {
	constructor(puzzleSpec) {
		this.number = puzzleSpec.number;
		this.publishedOn = puzzleSpec.publishedOn;
		this.words = puzzleSpec.wordSpec;
		this.solution = [undefined]
		for (let i = 1; i <= 5; i++) {
			const place = new LinePosition(puzzleSpec.solutionSpec[i][0], puzzleSpec.solutionSpec[i][1]);
			this.solution.push(place);
		}
		this.hintLetter = puzzleSpec.hintSpec[0];
		this.hintPlace = new LinePosition(puzzleSpec.hintSpec[1][0], puzzleSpec.hintSpec[1][1]);
		this.featuredWordBlurb = puzzleSpec.featuredWordBlurb;
	}
	
	deconstruct() {
	}
};


/* -------- Main Wall -------- */

const mainWallSpec = {
	numGridRows: 120,
	numGridColumns: 60
};

class MainWall {
	constructor(mainWallSpec) {
		this.wallRef = document.querySelector("#mainWall");

		let innerDimension = 0
		let gridDimension = 0
		if ((mainWindow.innerHeight / mainWallSpec.numGridRows) <= (mainWindow.innerWidth / mainWallSpec.numGridColumns)) {
			innerDimension = mainWindow.innerHeight;
			gridDimension = mainWallSpec.numGridRows;
		}
		else {
			innerDimension = mainWindow.innerWidth;
			gridDimension = mainWallSpec.numGridColumns;
		}

		const percent = innerDimension / 100;
		let fontSize = 0;
		let reducingInnerDimension = innerDimension + 1;
		do {
			reducingInnerDimension = reducingInnerDimension - 1;
			fontSize = Math.trunc((reducingInnerDimension / gridDimension) * mainWindow.devicePixelRatio) / mainWindow.devicePixelRatio;
			console.log('mw fontSize', fontSize);
		} while ((innerDimension - (fontSize * gridDimension)) < (2 * percent));
		console.log('mw final fontSize', fontSize);
		this.wallRef.style.fontSize = `${fontSize}px`;
		this.fontSize = fontSize;
		
		const spareHeight = mainWindow.innerHeight - (this.fontSize * mainWallSpec.numGridRows);
		console.log('mw spareHeight', spareHeight);
		const deviceSpareHeight = spareHeight * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareHeight', deviceSpareHeight);
		const roundedDeviceSpareHeight = Math.trunc(deviceSpareHeight / 2) * 2;
		console.log('mw roundedDeviceSpareHeight', roundedDeviceSpareHeight);
		const roundedSpareHeight = roundedDeviceSpareHeight / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareHeight', roundedSpareHeight);
		this.topPosition = roundedSpareHeight / 2;
		this.wallRef.style.top = `${this.topPosition}px`;

		this.width = this.fontSize * mainWallSpec.numGridColumns
		const spareWidth = mainWindow.innerWidth - this.width;
		console.log('mw spareWidth', spareWidth);
		const deviceSpareWidth = spareWidth * mainWindow.devicePixelRatio;
		console.log('mw deviceSpareWidth', deviceSpareWidth);
		const roundedDeviceSpareWidth = Math.trunc(deviceSpareWidth / 2) * 2;
		console.log('mw roundedDeviceSpareWidth', roundedDeviceSpareWidth);
		const roundedSpareWidth = roundedDeviceSpareWidth / mainWindow.devicePixelRatio;
		console.log('mw roundedSpareWidth', roundedSpareWidth);
		this.leftPosition = roundedSpareWidth / 2;
		this.wallRef.style.left = `${this.leftPosition}px`;
	}

	show() {
		this.wallRef.style.display = `grid`;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
	}
}


/* -------- Info Wall -------- */

function backOnClick() {
	//console.log("backOnClick called");
	infoWall.hide();
	//disableScrolling();
	mainWall.show();
	disableScrolling();
	}

function demonstrationOnClick () {
	//console.log("demonstrationOnClick called");
	demo.enter();
	}

class InfoWall {
	constructor(topPosition, leftPosition, fontSize, punterPuzzle) {
		this.wallRef = document.querySelector("#infoWall");

		this.wallRef.style.top = `${topPosition}px`;
		this.wallRef.style.left = `${leftPosition}px`;
		this.wallRef.style.fontSize = `${fontSize}px`;

		const puzzleDataRef = document.querySelector("#iwPuzzleData");
		puzzleDataRef.innerHTML = "<strong>Puzzle " + String(punterPuzzle.number) + "&emsp;&boxh;&emsp;published on " + punterPuzzle.publishedOn + "</strong>";

		const featuredWordRef = document.querySelector("#iwTCFeaturedWord");
		featuredWordRef.innerHTML = punterPuzzle.featuredWordBlurb;

		this.separator2Ref = document.querySelector("#iwSeparator-2");
		this.separator2TopPosition = undefined;

		this.controlBack = new Control("#iwCtrlBack", backOnClick);
		this.controlBack.enable();
		this.controlBack.unfade();		
		this.controlDemo = new Control("#iwdCtrlDemonstration", demonstrationOnClick);
		this.controlDemo.enable();
		this.controlDemo.unfade();
	}
	
	show() {
		this.wallRef.style.display = `grid`;
		const separator2Rect = this.separator2Ref.getBoundingClientRect();
		//console.log(separator2Rect);
		this.separator2TopPosition = separator2Rect.top;
	}

	hide() {
		this.wallRef.style.display = `none`;
	}
	
	deconstruct() {
		this.wallRef.style.display = `none`;
		this.controlDemo.deconstruct();
		this.controlBack.deconstruct();
	}
}


/* -------- Cross/Tick -------- */

function crossTickFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashCrossTick(crossTickRef, solveBiz) {
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	await wait(300);
	crossTickRef.style.display = `none`;
	await wait(300);
	crossTickRef.style.display = `block`;
	crossTickFlashed(solveBiz)
}

class CrossTick {
	constructor(crossTickId) {
		this.ref = document.querySelector(crossTickId);
	}
	
	showTick(solveBiz) {
		this.ref.innerHTML = "<strong>&check;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	showCross(solveBiz) {
		this.ref.innerHTML = "<strong>&cross;</strong>"
		this.ref.style.display = `block`;
		flashCrossTick(this.ref, solveBiz);
	}
	
	hide() {
		this.ref.style.display = `none`;
	}
	
	deconstruct() {
		this.ref.style.display = `none`;
	}
}


/* -------- Grid -------- */

//deconstruct() not present and not necessary - too difficult to make all the calls to it.
class RowColumn {
	constructor(row, column) {
		this.row = row;
		this.column = column;
	}
}

//deconstruct() not present and not necessary - too difficult to make all the calls to it.
class LinePosition {
	constructor(line, position) {
		this.line = line;
		this.position = position;
	}
}

//deconstruct() not present and not necessary - too difficult to make all the calls to it.
class Intersection {
	constructor(self, other) {
		this.self = self;
		this.other = other;
	}
}

class Line {
	constructor(num, matrixCoords, intersections) {
		this.colourHighlighted = `rgb(0%,0%,80%)`;
		this.colourUnhighlighted = `black`;
		this.helper = undefined;
		this.num = num;
		this.matrixCoords = matrixCoords;
		this.intersections = intersections;
		this.isOccupied = false;
		this.characters = new Array(8);
		this.elementMatrix = undefined;
	}
	
	setHelper(helper) {
		this.helper = helper;
		this.elementMatrix = helper.getElementMatrix();
	}

	reset() {
		this.isOccupied = false;
	}

	addWord(spelling, startPosition) {
		for (let position = 1; position < 8; position++) {
			this.characters[position] = " ";
		}
		for (let position = startPosition; position < startPosition + spelling.length; position++) {
			const letter = spelling[position - startPosition];
			this.characters[position] = letter;
		}
		this.isOccupied = true;
	}

	hasWord() {
		return this.isOccupied;
	}

	renderLetter(letter, position, colour) {
		const matrixCoord = this.matrixCoords[position];
		this.elementMatrix[matrixCoord.row][matrixCoord.column].textContent = letter;
		this.elementMatrix[matrixCoord.row][matrixCoord.column].style.color = colour;
		
	}

	unrenderLetter(position) {
		const matrixCoord = this.matrixCoords[position];
		this.elementMatrix[matrixCoord.row][matrixCoord.column].textContent = " ";		
	}
	
	refresh(colour) {
		if (!this.isOccupied) {
			for (let position = 1; position < 8; position++) {
				const matrixCoord = this.matrixCoords[position];
				this.elementMatrix[matrixCoord.row][matrixCoord.column].textContent = " ";
			}
		}
		else {
			for (let position = 1; position < 8; position++) {
				this.renderLetter(this.characters[position], position, colour);
			}
		}
	}
	
	refreshUnhighlighted() {
		this.refresh(this.colourUnhighlighted);
	}
	
	refreshHighlighted() {
		this.refresh(this.colourHighlighted);
	}
			
	doesWordFit(spelling, startPosition) {
		if (this.isOccupied) return false;
		for (let intersection of this.intersections) {
			const otherLine = this.helper.getLine(intersection.other.line);
			if (!otherLine.isOccupied) continue;
			const otherLetter = otherLine.characters[intersection.other.position];
			if (spelling[intersection.self.position - startPosition] != otherLetter) return false;
		}
		return true;
	}
	
	whereDoesWordFit(spelling) {
		if (this.isOccupied) return [];
		if (spelling.length == 5) {
			if (this.doesWordFit(spelling, 2)) return [new LinePosition(this.num, 2)]; else return [];
		}
		if (spelling.length == 7) {
			if (this.doesWordFit(spelling, 1)) return [new LinePosition(this.num, 1)]; else return [];
		}
		let possibleFits = [];
		if (this.doesWordFit(spelling, 1)) possibleFits.push(new LinePosition(this.num, 1));
		if (this.doesWordFit(spelling, 2)) possibleFits.push(new LinePosition(this.num, 2));
		return possibleFits;
	}
	
	displayLetter(letter, position) {
		this.renderLetter(letter, position, this.colourUnhighlighted);
	}

	undisplayLetter(position) {
		this.unrenderLetter(position);
	}

	deconstruct() {
		for (let position = 1; position < 8; position++) {
			const matrixCoord = this.matrixCoords[position];
			this.elementMatrix[matrixCoord.row][matrixCoord.column].textContent = " ";
		}
	}
}

class Grid {
	constructor(name) {
		this.elementMatrix = [undefined];
		for (let i = 1; i <= 7; i++) {
			this.elementMatrix[i] = new Array(8)
		};

		const cellCoords = ["12", "16",
							"21", "22", "23", "24", "25", "26", "27",
							"32", "36",
							"41", "42", "43", "44", "45", "46", "47",
							"52", "56",
							"61", "62", "63", "64", "65", "66", "67",
							"72", "76"
						   ];

		for (let coord of cellCoords) {
			const cellId = "#" + name + "Cell-" + coord;
			const cellElement = document.querySelector(cellId);
			const letters = [...coord];
			const row = Number(letters[0]);
			const column = Number(letters[1]);
			this.elementMatrix[row][column] = cellElement;
		};

		this.lines = [undefined];
		this.lines[1] = new Line (
							1,
							[undefined,
							 new RowColumn(2, 1),
							 new RowColumn(2, 2),
							 new RowColumn(2, 3),
							 new RowColumn(2, 4),
							 new RowColumn(2, 5),
							 new RowColumn(2, 6),
							 new RowColumn(2, 7)
							],
							[new Intersection(new LinePosition(0, 2), new LinePosition(4, 2)), 
							 new Intersection(new LinePosition(0, 6), new LinePosition(5, 2))
							]
					);
				
		this.lines[2] = new Line(
							2,
							[undefined,
							 new RowColumn(4, 1),
							 new RowColumn(4, 2),
							 new RowColumn(4, 3),
							 new RowColumn(4, 4),
							 new RowColumn(4, 5),
							 new RowColumn(4, 6),
							 new RowColumn(4, 7)
							],
							[new Intersection(new LinePosition(0, 2), new LinePosition(4, 4)), 
							 new Intersection(new LinePosition(0, 6), new LinePosition(5, 4))
							]
						);
					
		this.lines[3] = new Line(
							3,
							[undefined,
							 new RowColumn(6, 1),
							 new RowColumn(6, 2),
							 new RowColumn(6, 3),
							 new RowColumn(6, 4),
							 new RowColumn(6, 5),
							 new RowColumn(6, 6),
							 new RowColumn(6, 7)
							],
							[new Intersection(new LinePosition(0, 2), new LinePosition(4, 6)), 
							 new Intersection(new LinePosition(0, 6), new LinePosition(5, 6))
							]
						);
				
		this.lines[4] = new Line(
							4,
							[undefined,
							 new RowColumn(1, 2),
							 new RowColumn(2, 2),
							 new RowColumn(3, 2),
							 new RowColumn(4, 2),
							 new RowColumn(5, 2),
							 new RowColumn(6, 2),
							 new RowColumn(7, 2)
							],
							[new Intersection(new LinePosition(0, 2), new LinePosition(1, 2)), 
							 new Intersection(new LinePosition(0, 4), new LinePosition(2, 2)), 
							 new Intersection(new LinePosition(0, 6), new LinePosition(3, 2))
							]
						);
				
		this.lines[5] = new Line(
							5,
							[undefined,
							 new RowColumn(1, 6),
							 new RowColumn(2, 6),
							 new RowColumn(3, 6),
							 new RowColumn(4, 6),
							 new RowColumn(5, 6),
							 new RowColumn(6, 6),
							 new RowColumn(7, 6)
							],
							[new Intersection(new LinePosition(0, 2), new LinePosition(1, 6)), 
							 new Intersection(new LinePosition(0, 4), new LinePosition(2, 6)), 
							 new Intersection(new LinePosition(0, 6), new LinePosition(3, 6))
							]
						);

		this.forwardTryCycles = [undefined,
								 undefined,
								 undefined,
								 undefined,
								 undefined,
								 [new LinePosition(1, 2),
								  new LinePosition(2, 2),
								  new LinePosition(3, 2),
								  new LinePosition(4, 2),
								  new LinePosition(5, 2)
								 ],
								 [new LinePosition(1, 1),
								  new LinePosition(1, 2),
								  new LinePosition(2, 1),
								  new LinePosition(2, 2),
								  new LinePosition(3, 1),
								  new LinePosition(3, 2),
								  new LinePosition(4, 1),
								  new LinePosition(4, 2),
							      new LinePosition(5, 1),
								  new LinePosition(5, 2)
								 ],
								 [new LinePosition(1, 1),
								  new LinePosition(2, 1),
								  new LinePosition(3, 1),
								  new LinePosition(4, 1),
								  new LinePosition(5, 1),
								 ]
								];

		this.backwardTryCycles = [undefined,
								  undefined,
								  undefined,
								  undefined,
								  undefined,
								  [new LinePosition(5, 2),
								   new LinePosition(4, 2),
								   new LinePosition(3, 2),
		   						   new LinePosition(2, 2),
								   new LinePosition(1, 2)
								   ],
								  [new LinePosition(5, 2),
								   new LinePosition(5, 1),
								   new LinePosition(4, 2),
								   new LinePosition(4, 1),
								   new LinePosition(3, 2),
								   new LinePosition(3, 1),
								   new LinePosition(2, 2),
								   new LinePosition(2, 1),
								   new LinePosition(1, 2),
								   new LinePosition(1, 1)
								  ],
								  [new LinePosition(5, 1),
								   new LinePosition(4, 1),
								   new LinePosition(3, 1),
								   new LinePosition(2, 1),
								   new LinePosition(1, 1),
								  ]
								 ];
	
		this.isComplete = false;
		this.isHighlightOn = false;
		this.highlightPlace = undefined;
	}

	completeInitialisation() {
		for (let i = 1; i < this.lines.length; i++) {
			this.lines[i].setHelper(this);
		}
	}

	reset() {
		for (let i = 1; i < this.lines.length; i++) {
			this.lines[i].reset();
		}
		this.isComplete = false;
		this.isHighlightOn = false;		
	}
		
	getElementMatrix() {
		return this.elementMatrix;
	}

	getLine(lineNum) {
		return this.lines[lineNum];
	}

	setHighlightOn(place) {
		this.isHighlightOn = true;
		this.highlightPlace = place;
	}
	
	setHighlightOff() {
		this.isHighlightOn = false;
	}
	
	getPossibleFits(spelling) {
		let allPossibleFits = [];
		for (let i = 1; i < this.lines.length; i++) {
			const possibleFits = this.lines[i].whereDoesWordFit(spelling);
			for (let fit of possibleFits) {	allPossibleFits.push(fit); }
		}
		return allPossibleFits;
	}
	
	addWord(spelling, place) {
		this.lines[place.line].addWord(spelling, place.position);
	}
	
	removeWord(place) {
		this.lines[place.line].reset();
	}
	
	refresh() {
		const highlightedLine = this.isHighlightOn ? this.highlightPlace.line : undefined;		
		for (let i = 1; i < this.lines.length; i++) {
			if (this.lines[i].hasWord()) continue;
			this.lines[i].refreshUnhighlighted();
		}
		for (let i = 1; i < this.lines.length; i++) {
			if (!this.lines[i].hasWord()) continue;
			if (i == highlightedLine) continue;
			this.lines[i].refreshUnhighlighted();
		}
		if (highlightedLine != undefined) this.lines[highlightedLine].refreshHighlighted();
	}

	isSamePlace(place1, place2) {
		return place1.line == place2.line && place1.position == place2.position;
	}
				 
	findTryCycleIndex(tryCycle, place) {
		for (let i = 0; i < tryCycle.length; i++) {
			if (this.isSamePlace(tryCycle[i], place)) return i;
		}
	}

	getNextPlaceInTryCycle(tryCycle, currentPlace) {
		const currentIndex = this.findTryCycleIndex(tryCycle, currentPlace);
		if (currentIndex == tryCycle.length - 1)
			return tryCycle[0]
		else
			return tryCycle[currentIndex + 1]	
	}
	
	getNextAvailablePlace(tryCycles, spelling, currentPlace) {
		const tryCycle = tryCycles[spelling.length]
		let nextPlace = this.getNextPlaceInTryCycle(tryCycle, currentPlace);
		while (true) {
			if (this.lines[nextPlace.line].doesWordFit(spelling, nextPlace.position)) {
				return nextPlace;
			}
			else {
				nextPlace = this.getNextPlaceInTryCycle(tryCycle, nextPlace);
			}
		}
	}
	
	getNextAvailablePlaceForward(spelling, currentPlace) {
		return this.getNextAvailablePlace(this.forwardTryCycles, spelling, currentPlace)
	}
	
	getNextAvailablePlaceBackward(spelling, currentPlace) {
		return this.getNextAvailablePlace(this.backwardTryCycles, spelling, currentPlace)
	}
	
	displayLetter(letter, place) {
		this.lines[place.line].displayLetter(letter, place.position);
	}

	undisplayLetter(place) {
		this.lines[place.line].undisplayLetter(place.position);
	}

	deconstruct() {
		for (let i = 1; i <= 5; i++) {
			this.lines[i].deconstruct();
		}
	}
};


/* -------- Controls -------- */

class Control {
	constructor(id, onClick) {
	this.id = id;
	this.onClick = onClick;
	this.ref = document.querySelector(id);
	this.isEnabled = false;
	this.isFrozen = false;
	this.wasEnabledBeforeFreeze = undefined;
	}

	enable() {
		if (this.isFrozen) return;
		if (!this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
			this.isEnabled = true;
		}
	}
	
	disable() {
		if (this.isFrozen) return;
		if (this.isEnabled) {
			if (this.OnClick !== null) {
				this.ref.removeEventListener("click", this.onClick);
			}
			this.isEnabled = false;
		}
	}

	fade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `0.5`;
	}
	
	unfade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `1.0`;
	}
	
	freeze() {
		if (this.isFrozen) return;
		this.wasEnabledBeforeFreeze = this.isEnabled;
		if (this.isEnabled) {
			this.ref.removeEventListener("click", this.onClick);
			this.isEnabled = false;
		}
		this.isFrozen = true;
	}
	
	unfreeze() {
		this.isEnabled = this.wasEnabledBeforeFreeze;
		if (this.isEnabled) {
			if (this.OnClick !== null) this.ref.addEventListener("click", this.onClick);
		}
		this.isFrozen = false;
	}
	
	deconstruct() {
		this.ref.removeEventListener("click", this.onClick);
	}
}

function wordControlFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashWordControl(spellingRef, solveBiz) {
	await wait(300);
	spellingRef.style.backgroundColor = `rgb(80%,0%,0%)`;
	await wait(300);
	spellingRef.style.backgroundColor = `white`;
	await wait(300);
	spellingRef.style.backgroundColor = `rgb(80%,0%,0%)`;
	await wait(300);
	spellingRef.style.backgroundColor = `white`;
	wordControlFlashed(solveBiz)
}

class WordControl extends Control {
	constructor(spelling, idWithoutHash, onClick) {
		const idWithHash = "#" + idWithoutHash;
		super(idWithHash, onClick);
		const spellingIdWithoutHash = idWithoutHash + "-spelling";
		const spellingIdWithHash = "#" + spellingIdWithoutHash;
		const ref = document.querySelector(idWithHash);
		ref.innerHTML = "<span id=" + '"' + spellingIdWithoutHash + '"' + ">&thinsp;" + spelling + "&thinsp;</span>";
		this.spellingRef = document.querySelector(spellingIdWithHash);
	}

	setHighlightOnLow() {
		this.spellingRef.style.color = `white`;
		this.spellingRef.style.backgroundColor = `black`;
	}

	setHighlightOnHigh() {
		this.spellingRef.style.color = `white`;
		this.spellingRef.style.backgroundColor = `rgb(0%,0%,80%)`;
	}
	
	setHighlightOff() {
		this.spellingRef.style.color = `black`;
		this.spellingRef.style.backgroundColor = `white`;
	}
	
	flash(solveBiz) {
		flashWordControl(this.spellingRef, solveBiz);		
	}

	deconstruct() {
		super.deconstruct()
	}
}

function xwardControlFlashed(solveBiz) {solveBiz.unfreeze()}

async function flashXwardControl(ref, flasherRef, solveBiz) {
	ref.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	await wait(300);
	flasherRef.style.display = `block`;
	await wait(300);
	flasherRef.style.display = `none`;
	ref.style.display = `block`;
	xwardControlFlashed(solveBiz)
}

class XwardControl extends Control {
	constructor(id, onClick) {
		super(id, onClick);
		this.flasherRef = document.querySelector(id + "Flasher");
		this.flasherRef.style.display = `none`;
	}
	
	flash(solveBiz) {
		flashXwardControl(this.ref, this.flasherRef, solveBiz);		
	}

	//override fade() because an opacity of 0.5 is not enough
	fade() {
		if (this.isFrozen) return;
		this.ref.style.opacity = `0.3`;
	}
	deconstruct() {
		super.deconstruct()
		this.flasherRef.style.display = `none`;
	}
}


/* -------- Solve -------- */

class SolveIO {
	constructor(controls, crossTick) {
	//controls
	//an array of Control objects indexed by these names: "Backward", "Forward", "Information", "Hint", "Reset", "Solution", "Word1", "Word2", "Word3", "Word4", "Word5"
	this.controls = controls;
	this.crossTick = crossTick;
	}

	disableAllControls() {
		for (let name in this.controls) {
			this.controls[name].disable();
			this.controls[name].fade();
		}
	}

	disableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].disable();
			this.controls[controls[i]].fade();
		}
	}
	
	enableAllControls() {
		for (let name in this.controls) {
			this.controls[name].enable();
			this.controls[name].unfade();
		}
	}

	enableControls(controls) {
		for (let i in controls) {
			this.controls[controls[i]].enable();
			this.controls[controls[i]].unfade();
		}
	}
	
	enableAllControlsExcept(exceptions) {
		for (let name in this.controls) {
			if (!exceptions.includes(name)) {
				this.controls[name].enable();
				this.controls[name].unfade();
			}
			else {
				this.controls[name].disable();
				this.controls[name].fade();
			}
		}
	}
	
	freezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].freeze();
		}
	}
	
	unfreezeAllControls() {
		for (let name in this.controls) {
			this.controls[name].unfreeze();
		}
	}

	highlightLowWordControl(wordNum) {
		this.controls["Word" + String(wordNum)].setHighlightOnLow();
	}

	highlightHighWordControl(wordNum) {
		this.controls["Word" + String(wordNum)].setHighlightOnHigh();
	}

	unhighlightWordControl(wordNum) {
		this.controls["Word" + String(wordNum)].setHighlightOff();
	}

	unhighlightAllWordControls() {
		for (let i = 1; i <= 5; i++) {
			this.unhighlightWordControl(i)
		}
	}

	enableWordControl(wordNum) {
		const name = "Word" + String(wordNum);
		this.controls[name].enable();
		this.controls[name].unfade();				
	}

	disableWordControl(wordNum) {
		const name = "Word" + String(wordNum);
		this.controls[name].disable();
		this.controls[name].fade();		
	}

	flashXwardControl(name, solveBiz) {
		this.controls[name].flash(solveBiz);
	}
	
	flashWordControl(wordNum, solveBiz) {
		this.controls["Word" + String(wordNum)].flash(solveBiz);
	}
		
	hideCrossTick() {
		this.crossTick.hide();
	}
	
	showTick(solveBiz) {
		this.crossTick.showTick(solveBiz);
	}
	
	showCross(solveBiz) {
		this.crossTick.showCross(solveBiz);
	}
	
	deconstruct() {
	}
}

class Word {
	constructor(spelling) {
		this.spelling = spelling;
		this.inGrid = false;
		this.placeInGrid = null;
	}
	
	deconstruct() {
	}
}

class SolveBiz {	
	constructor(puzzle, grid, io) {
		this.puzzle = puzzle;
		this.grid = grid;
		this.io = io;
		
		this.words = [undefined];
		for (let i = 1; i <= 5; i++) {
			this.words[i] = new Word(puzzle.words[i]);
		}

		this.selectedWordNum = undefined;		
		this.callbackResolve = undefined;

		this.hintNumShows = 3;
		this.hintNumShowsRemaining = undefined;
		this.hintIsShowing = undefined;

		this.solutionNextIndex = undefined;

		this.sleep();
	}

	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	
	sleep() {
		this.io.disableAllControls();
	}
	
	wake() {
		this.io.enableAllControlsExcept(["Reset", "Forward", "Backward"]);
	}
	
	freeze() {
		this.io.freezeAllControls();
	}
	
	unfreeze() {
		this.io.unfreezeAllControls();
	}

	reset() {
		this.grid.reset();
		this.grid.refresh();
		this.io.unhighlightAllWordControls();
		this.io.hideCrossTick();
		for (let i = 1; i <= 5; i++) {
			this.words[i].inGrid = false;
		}
		this.selectedWordNum = undefined;
	}

	getNumWordsInGrid() {
		let count = 0;
		for (let i = 1; i <= 5; i++) {
			if (this.words[i].inGrid) count++;
		}
		return count;
	}

	review() {
		const numWordsInGrid = this.getNumWordsInGrid();

		if (numWordsInGrid == 5) {
			this.grid.setHighlightOff();
			this.grid.refresh();
			this.io.unhighlightAllWordControls();
			//+Reset etc??
			this.io.disableControls(["Word1", "Word2", "Word3", "Word4", "Word5", "Forward", "Backward"]);
			this.freeze();
			this.io.showTick(this);
			return;
		}

		if (this.selectedWordNum != undefined) {
			this.grid.setHighlightOn(this.words[this.selectedWordNum].placeInGrid);
			this.io.enableControls(["Forward", "Backward"]);
		}
		else {
			this.grid.setHighlightOff();
			this.io.disableControls(["Forward", "Backward"]);
		}

		if (numWordsInGrid == 0) {
			this.io.disableControls(["Reset"]);			
		}
		else {
			this.io.enableControls(["Reset"]);			
		}

		for (let i = 1; i <= 5; i++) {
			const word = this.words[i];
			if (!word.inGrid) {
				this.io.unhighlightWordControl(i);
			}
			else if (i == this.selectedWordNum) {
				this.io.highlightHighWordControl(i);
				this.io.enableWordControl(i);
			}
			else {
				this.io.highlightLowWordControl(i);
				this.io.enableWordControl(i);
			}
		}
		this.grid.refresh();
	}
	
	wordClicked(wordNum) {
		//console.log("Word button clicked");
		//console.log(wordNum);
		//console.log(this.words[wordNum]);
		const word = this.words[wordNum];
		if (!word.inGrid) {
			//console.log("Word not in grid");
			const spelling = word.spelling;
			const possibleFits = this.grid.getPossibleFits(spelling);
			if (possibleFits.length == 0) {
				this.freeze();
				this.io.flashWordControl(wordNum, this);
				return;
			}
			const randomFit = possibleFits[this.getRandomInt(possibleFits.length)];
			this.grid.addWord(spelling, randomFit);
			word.inGrid = true;
			word.placeInGrid = randomFit;
			this.selectedWordNum = wordNum;
		}
		else if (this.selectedWordNum == wordNum) {
			//console.log("Word in grid. Selected");
			this.grid.removeWord(word.placeInGrid);
			word.inGrid = false;
			this.selectedWordNum = undefined;
		}
		else {
			//console.log("Word in grid. Not selected");
			this.selectedWordNum = wordNum;
		}
		this.review();
	}

	demoWordClicked(wordNum, lineNum, position) {
		//word is not in the grid
		const definedPlace = new LinePosition(lineNum, position);
		const word = this.words[wordNum];
		this.grid.addWord(word.spelling, definedPlace);
		word.inGrid = true;
		word.placeInGrid = definedPlace;
		this.selectedWordNum = wordNum;
		this.review();
	}

	forwardClicked() {
		//console.log("Forward button clicked");
		const word = this.words[this.selectedWordNum];
		const currentPlace = word.placeInGrid;
		this.grid.removeWord(currentPlace);
		const newPlace = this.grid.getNextAvailablePlaceForward(word.spelling, currentPlace);
		if (newPlace.line == currentPlace.line && newPlace.position == currentPlace.position) {
			this.grid.addWord(word.spelling, currentPlace);
			this.freeze();
			this.io.flashXwardControl("Forward", this);
		}
		else {
			word.placeInGrid = newPlace;
			this.grid.addWord(word.spelling, newPlace);
			this.review();
		}
	}

	backwardClicked() {
		//console.log("Backward button clicked");
		const word = this.words[this.selectedWordNum];
		const currentPlace = word.placeInGrid;
		this.grid.removeWord(currentPlace);
		const newPlace = this.grid.getNextAvailablePlaceBackward(word.spelling, currentPlace);
		if (newPlace.line == currentPlace.line && newPlace.position == currentPlace.position) {
			this.grid.addWord(word.spelling, currentPlace);
			this.freeze();
			this.io.flashXwardControl("Backward", this);
		}
		else {
			word.placeInGrid = newPlace;
			this.grid.addWord(word.spelling, newPlace);
			this.review();
		}
	}

	resetClicked() {
		this.reset();
		this.io.enableAllControlsExcept(["Reset", "Forward", "Backward"]);
	}

	hintTimerExpired() {
		if (this.hintIsShowing) {
			this.grid.undisplayLetter(this.puzzle.hintPlace);
			this.hintIsShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				this.io.enableAllControlsExcept(["Reset", "Forward", "Backward"]);
				return;
			}
		}
		else {
			this.grid.displayLetter(this.puzzle.hintLetter, this.puzzle.hintPlace);
			this.hintIsShowing = true;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}

	hintClicked() {
		this.io.disableAllControls();
		this.io.hideCrossTick();
		let isEmpty = true;
		for (let i = 1; i <= 5; i++) {
			if (this.words[i].inGrid) {
				isEmpty = false;
				break;
			}
		}
		if (isEmpty) {
			this.grid.displayLetter(this.puzzle.hintLetter, this.puzzle.hintPlace);
			this.hintIsShowing = true;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		else {
			this.reset();			
			this.hintIsShowing = false;
			this.hintNumShowsRemaining = this.hintNumShows;
		}
		setTimeout(punterHintTimerExpired, 1000);
	}

	hintWithCallbackTimerExpired() {
		if (this.hintShowing) {
			this.grid.undisplayLetter(this.puzzle.hintPlace);
			this.hintShowing = false;
			this.hintNumShowsRemaining--;
			if (this.hintNumShowsRemaining == 0) {
				this.io.enableAllControlsExcept(["Reset"]);
				this.callbackResolve();
				return;
			}
		}
		else {
			this.grid.displayLetter(this.puzzle.hintLetter, this.puzzle.hintPlace);
			this.hintShowing = true;			
		}
		setTimeout(demoHintTimerExpired, 1000);
	}

	hintWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.grid.displayLetter(this.puzzle.hintLetter, this.puzzle.hintPlace);
								this.hintShowing = true;
								this.hintNumShowsRemaining = this.hintNumShows;
								setTimeout(demoHintTimerExpired, 1000);
							}
					);
	}

	solutionTimerExpired() {
		this.grid.addWord(this.puzzle.words[this.solutionNextIndex], this.puzzle.solution[this.solutionNextIndex]);
		this.grid.refresh();
		this.solutionNextIndex++;
		if (this.solutionNextIndex == 6) {
			this.io.enableControls(["Reset", "Information"]);
			return;
		}
		setTimeout(punterSolutionTimerExpired, 1000);
	}

	solutionClicked() {
		this.io.disableAllControls();
		this.io.hideCrossTick();
		if (this.getNumWordsInGrid() == 0) {
			this.grid.addWord(this.puzzle.words[1], this.puzzle.solution[1]);
			this.grid.refresh();
			this.solutionNextIndex = 2;
		}
		else {
			this.reset();
			this.solutionNextIndex = 1;
		}
		setTimeout(punterSolutionTimerExpired, 1000);
	}
		
	solutionWithCallbackTimerExpired() {
		this.grid.addWord(this.puzzle.words[this.solutionNextIndex], this.puzzle.solution[this.solutionNextIndex]);
		this.grid.refresh();
		this.solutionNextIndex++;
		if (this.solutionNextIndex == 6) {
			this.io.enableControls(["Reset"]);
			this.callbackResolve();
			return;
		}
		setTimeout(demoSolutionTimerExpired, 1000);
	}

	solutionWithCallback() {
		return new 	Promise((resolve, reject) => {
								this.io.disableAllControls();
								this.callbackResolve = resolve;
								this.grid.addWord(this.puzzle.words[1], this.puzzle.solution[1]);
								this.grid.refresh();
								this.solutionNextIndex = 2;
								setTimeout(demoSolutionTimerExpired, 1000);
							}
					);
	}
	
	deconstruct() {
		for (let i = 1; i <= 5; i++) {
			this.words[i].deconstruct();
		}
	}
}


/* -------- Punter -------- */

function punterInformationOnClick() {
	//console.log("informationOnClick called");
	mainWall.hide();
	infoWall.show();
	enableScrolling();
}

function punterForwardOnClick() {punter.solveBiz.forwardClicked();};
function punterBackwardOnClick() {punter.solveBiz.backwardClicked();};
function punterResetOnClick() {punter.solveBiz.resetClicked();};
function punterHintOnClick() {punter.solveBiz.hintClicked();};
function punterHintTimerExpired() {punter.solveBiz.hintTimerExpired();};
function punterSolutionOnClick() {punter.solveBiz.solutionClicked();};
function punterSolutionTimerExpired() {punter.solveBiz.solutionTimerExpired();};

let punterWordOnClicks = [undefined,
						  function() {punter.solveBiz.wordClicked(1)},
						  function() {punter.solveBiz.wordClicked(2)},
						  function() {punter.solveBiz.wordClicked(3)},
						  function() {punter.solveBiz.wordClicked(4)},
						  function() {punter.solveBiz.wordClicked(5)},
						 ];

class Punter {
	constructor(puzzle) {
		this.puzzle = puzzle;
		
		this.controls = [];
		this.controls["Information"] = new Control("#mwdCtrlInformation", punterInformationOnClick, null);
		this.controls["Hint"] = new Control("#mwdCtrlHint", punterHintOnClick, null);
		this.controls["Solution"] = new Control("#mwdCtrlSolution", punterSolutionOnClick, null);
		this.controls["Reset"] = new Control("#mwdCtrlReset", punterResetOnClick, null);
		this.controls["Forward"] = new XwardControl("#mwdCtrlForward", punterForwardOnClick);
		this.controls["Backward"] = new XwardControl("#mwdCtrlBackward", punterBackwardOnClick);

		const wordIdRoot = "mwdpWord-";
		for (let i = 1; i <= 5; i++) {
			const wordId = wordIdRoot + String(i);
			this.controls["Word" + String(i)] = new WordControl(this.puzzle.words[i], wordId, punterWordOnClicks[i]);
		}

		this.crossTick = new CrossTick("#mwCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.grid = new Grid("mwdp");
		this.grid.completeInitialisation();

		this.solveBiz = new SolveBiz(this.puzzle, this.grid, this.solveIO);
	}
	
	deconstruct() {
		//console.log("Punter.deconstruct called");
		this.solveBiz.deconstruct();
		this.grid.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		
		//console.log(this.controls);		
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
	}
}


/* -------- Demo -------- */

function demoHintTimerExpired() {demo.solveBiz.hintWithCallbackTimerExpired();};
function demoSolutionTimerExpired() {demo.solveBiz.solutionWithCallbackTimerExpired();}

class Demo {
	constructor() {
		const puzzleSpec = {
			number: undefined,
			solveBy: undefined,
			wordSpec: [undefined, "ARCANE", "CAREER", "EARNER", "ARENA", "BANANAS"],
			solutionSpec: [undefined, [2, 2], [3, 1], [5, 1], [1, 2], [4, 1]],
			hintSpec: ["R", [1, 3]]
		};
		this.puzzle = new Puzzle(puzzleSpec);
		
		this.controls = [];
		this.controls["Information"] = new Control("#iwdCtrlInformation", null);
		this.controls["Hint"] = new Control("#iwdCtrlHint", null);
		this.controls["Solution"] = new Control("#iwdCtrlSolution", null);
		this.controls["Reset"] = new Control("#iwdCtrlReset", null);
		this.controls["Forward"] = new XwardControl("#iwdCtrlForward", null);
		this.controls["Backward"] = new XwardControl("#iwdCtrlBackward", null);
		this.controls["Word1"] = new WordControl(this.puzzle.words[1], "iwdpWord-1", null);
		this.controls["Word2"] = new WordControl(this.puzzle.words[2], "iwdpWord-2", null);
		this.controls["Word3"] = new WordControl(this.puzzle.words[3], "iwdpWord-3", null);
		this.controls["Word4"] = new WordControl(this.puzzle.words[4], "iwdpWord-4", null);
		this.controls["Word5"] = new WordControl(this.puzzle.words[5], "iwdpWord-5", null);

		this.crossTick = new CrossTick("#iwdCrossTick");
		this.solveIO = new SolveIO(this.controls, this.crossTick);	

		this.grid = new Grid("iwdp");
		this.grid.completeInitialisation();

		this.solveBiz = new SolveBiz(this.puzzle, this.grid, this.solveIO);
	}
	
	enter() {
		infoWall.controlBack.disable();
		infoWall.controlBack.fade();
		infoWall.controlDemo.disable();
		infoWall.controlDemo.fade();
		
		infoWall.separator2Ref.scrollIntoView({behavior:"smooth"});
		
		demoExecuteScript();
	}
	
	exit() {
		infoWall.controlBack.enable();
		infoWall.controlBack.unfade();
		infoWall.controlDemo.enable();
		infoWall.controlDemo.unfade();
		
		window.scrollTo({top:0, left:0, behavior:"smooth"});
	}
	
	deconstruct() {
		this.solveBiz.deconstruct();
		this.grid.deconstruct();
		this.solveIO.deconstruct();
		this.crossTick.deconstruct();
		for (let control in this.controls) {
			this.controls[control].deconstruct();
		}
		for (let i = 1; i <= this.puzzle.numDispensers; i++) {
			this.dispensers[i].deconstruct();
		}
		this.puzzle.deconstruct();
	}
}

const demoScript = [
	"Word1,3,1",
	"Pause",
	"Forward",
	"Pause",
	"Forward",
	"Pause",			
	"Forward",
	"Pause",
	"Forward",
	"Pause",
	"Forward",
	"Pause",
	"Forward",
	"Pause",							
	"Backward",
	"Pause",
	"Word1",
	"Pause",
	"Pause",
	"Word3,2,2",		
	"Pause",							
	"Word5,1,1",
	"Pause",
	"Forward",
	"Pause",
	"Pause",
	"Word3",
	"Pause",				
	"Word3",
	"Pause",
	"Pause",
	"Word5",
	"Pause",
	"Forward",
	"Pause",
	"Word2,5,1",
	"Pause",			
	"Backward",
	"Pause",			
	"Word1,1,2",
	"Pause",	
	"Forward",	
	"Pause",
	"Word4,1,2",
	"Pause",
	"Word3,5,1",
	"Pause",
	"Pause",
	"Pause",
	"Pause",
	"Reset",
	"Pause",
	"Pause",
	"Hint",
	"Pause",
	"Pause",
	"Solution"
];

function demoShowSpot(spotRef, opacity) {
	spotRef.style.display = `block`;
	spotRef.style.opacity = `${opacity}`;
	}
	
function demoHideSpot(spotRef) {
	spotRef.style.display = `none`;
	}

async function demoExecuteScript() {
	let spotRefLookUp = [];
	const iwdControls = ["Hint", "Solution", "Reset", "Forward", "Backward"]
	for (let control of iwdControls) spotRefLookUp[control] = document.querySelector("#iwdSpot" + control);
	for (let w = 1; w <= 5; w++) spotRefLookUp["Word" + String(w)] = document.querySelector("#iwdpSpotWord-" + String(w));
	
	const spotFadeSequence = [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4];

	//waiting for smooth scroll to complete
	await wait(1000);
	disableScrolling();
	
	demo.solveBiz.wake();
	await wait(1000);
	for (let command of demoScript) {
		if (command === "Pause") {
			await wait(500);
			continue;
		}
		
		const control = command.split(",")[0];
		const spotRef = spotRefLookUp[control];
		for (let opacity of spotFadeSequence) {
			demoShowSpot(spotRef, opacity);
			await wait(100);
		}
		
		switch(command) {
		case "Hint":
			await demo.solveBiz.hintWithCallback();
			break;
		case "Solution":
			await demo.solveBiz.solutionWithCallback();
			break;
		case "Reset":
			demo.solveBiz.resetClicked();
			break;
		case "Forward":
			demo.solveBiz.forwardClicked();
			break;
		case "Backward":
			demo.solveBiz.backwardClicked();
			break;
		case "Word1":
			demo.solveBiz.wordClicked(1);
			break;
		case "Word2":
			demo.solveBiz.wordClicked(2);
			break;
		case "Word3":
			demo.solveBiz.wordClicked(3);
			break;
		case "Word4":
			demo.solveBiz.wordClicked(4);
			break;
		case "Word5":
			demo.solveBiz.wordClicked(5);
			break;
		default:
			const splitWordCommand = command.split(",");
			demo.solveBiz.demoWordClicked(Number(splitWordCommand[0][4]), Number(splitWordCommand[1]), Number(splitWordCommand[2]));
			break;
		}
		
		demoHideSpot(spotRef);
		await wait(1000);
	}
	
	await wait(1500);
	demo.solveBiz.reset();
	demo.solveBiz.sleep();	
	
	await wait(1000);
	enableScrolling();
	demo.exit();
}


/* -------- Configuration -------- */

let mainWall = undefined;
let punter = undefined;
let infoWall = undefined;
let demo = undefined;

function configure() {
	//const punterPuzzle = new Puzzle(punterPuzzleSpec);
	const punterPuzzle = new Puzzle(puzzleSpecs[0]);
	mainWall = new MainWall(mainWallSpec);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	demo = new Demo();	
}


function reconfigure(punterPuzzle) {
	//demo.deconstruct();
	infoWall.deconstruct();
	punter.deconstruct();
	//mainWall.deconstruct();
	//mainWall = new MainWall(mainWallSpec);
	punter = new Punter(punterPuzzle);
	infoWall = new InfoWall(mainWall.topPosition, mainWall.leftPosition, mainWall.fontSize, punterPuzzle);
	//demo = new Demo();		
}


/* -------- Begin -------- */

const published = new Published();
configure();


/* -------- Preamble -------- */
/*
async function performPreamble() {	
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	punter.solveBiz.unfreeze();
	disableScrolling();
}
*/
async function performPreamble() {
	mainWall.show();
	
	await wait(1000);

	const surroundInformationRef = document.querySelector("#mwdSurroundInformation");
	surroundInformationRef.style.display = `block`;
	await wait(500);
	surroundInformationRef.style.display = `none`;

	await wait(750);

	mainWall.hide();
	infoWall.show();

	await wait(1500);

	const surroundInstructionsRef = document.querySelector("#iwSurroundInstructions");
	surroundInstructionsRef.style.display = `block`;
	await wait(750);
	surroundInstructionsRef.style.display = `none`;

	await wait(750);

	const separator2Ref = document.querySelector("#iwSeparator-2");
	separator2Ref.scrollIntoView({behavior: "smooth"});

	await wait(1000);
	
	const surroundDemonstrationRef = document.querySelector("#iwdSurroundDemonstration");
	surroundDemonstrationRef.style.display = `block`;
	await wait(750);
	surroundDemonstrationRef.style.display = `none`;

	await wait(1000);

	infoWall.hide();
	mainWall.show();
	
	infoWall.controlBack.unfreeze();
	infoWall.controlDemo.unfreeze();
	//punter.solveBiz.unfreeze();
	punter.solveBiz.wake();
	disableScrolling();
}

infoWall.controlBack.freeze();
infoWall.controlDemo.freeze();
//punter.solveBiz.wake();
//punter.solveBiz.freeze();
performPreamble();


