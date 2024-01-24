let mobilenet;
let video;
let label = '';
let left;
let right;
let train;

function modelReady() {
	console.log('Model is ready!!!');
	mobilenet.predict(gotResults);
}

function videoReady() {
	console.log('Video is ready!!!');
	mobilenet.predict(gotResults);
}

function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		label = result;
		fill(0);
		textSize(64);
		text(label, 10, height - 100);
		classifier.classify(gotResults);
	}
}

function whileTraining(loss) {
	if (loss === null) {
		console.log('Training Complete');
		classifier.classify(gotResults);
	} else {
		console.log(loss);
	}
}

function setup() {
	createCanvas(640, 580);
	video = createCapture(VIDEO);
	video.hide();
	background(0);
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);
	classifier = mobilenet.classification(video, videoReady);

	bookButton = createButton('Book');
	bookButton.mousePressed(function () {
		classifier.addImage('Book');
	});
	phoneButton = createButton('Phone');
	phoneButton.mousePressed(function () {
		classifier.addImage('Phone');
	});

	trainButton = createButton('Train');
	trainButton.mousePressed(function () {
		classifier.train(whileTraining);
	});
}

function draw() {
	background(0);
	image(video, 0, 0);
	// fill(255);
	// textSize(32);
	// text(label, 10, height - 34);
}
