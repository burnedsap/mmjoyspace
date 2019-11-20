"use strict";
/*
  Johan Karlsson (DonKarlssonSan)
  Dragging images
*/
var Rectangle = (function() {
	function Rectangle(pos, img) {
		this.pos = pos;
		this.img = img;
		this.width = img.width;
		this.height = img.height;
	}
	
	Rectangle.prototype.draw = function () {
		image(this.img, this.pos.x, this.pos.y);
	};
	
	Rectangle.prototype.hits = function (hitpos) {
		if (hitpos.x > this.pos.x && hitpos.x < this.pos.x + this.width && hitpos.y > this.pos.y && hitpos.y < this.pos.y + this.height) {
			return true;
		}
		
		return false;
	};
	
	return Rectangle;
}

());

let button1, button2;
var bg;
var back1, back2, back3, back4, back5, back6, back7;
var rects;
var dragRec;
var isDragging;
var clickOffset;
var back;
var bath, bed, coconut, coffee, color, cookie, guitar, ice1, ice2, leaf2, leaf3, lilly, mango, shell, sunflower;
var imarray = [];
var backarray = [];
function preload() {
	back1 = loadImage("1.jpg");
	back2 = loadImage("2.jpg");
	back3 = loadImage("3.jpg");
	back4 = loadImage("4.jpg");
	back5 = loadImage("5.jpg");
	back6 = loadImage("6.jpg");
	back7 = loadImage("7.jpg");
	bath = loadImage("bath tub.png");
	bed = loadImage("bed.png");
	coconut = loadImage("coconut trees.png");
	coffee = loadImage("coffee.png");
	color = loadImage("color.png");
	cookie = loadImage("cookie.png");
	guitar = loadImage("guitar.png");
	ice1 = loadImage("ice cream1.png");
	ice2 = loadImage("ice cream2.png");
	leaf2 = loadImage("leaf2.png");
	leaf3 = loadImage("leaf3.png");
	lilly = loadImage("lilly.png");
	mango = loadImage("mango.png");
	shell = loadImage("shell.png");
	sunflower = loadImage("sunflower.png");
	backarray = [back1, back2, back3, back4, back5, back6, back7];
	imarray = [bath, bed, coconut, coffee, color, cookie, guitar, ice1, ice2, leaf2, leaf3, lilly, mango, shell, sunflower];
	//	print(imarray);
}

function setup() {
	rects = [];
	placeImages();
	isDragging = false;
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('sketch-holder');

	button1 = document.getElementById('world-button');
	button1.addEventListener('click', () => {
		bg = backarray[floor(random(0, 7))];
	});	  

button2 = document.getElementById('save-button');
button2.addEventListener('click', () => {
		saveCanvas('My Joyspace', 'jpg');
	
	 });
	  	  
	  bg = back1;

}


function placeImages() {
	for (var i = 0; i < imarray.length; i++) {
		imarray[i].resize(0, 100);
		
		if(i<imarray.length/2) {
			var pos = createVector(75, map(i, 0, imarray.length/2, 50, windowHeight-50));
		}
		else {
			var pos = createVector(windowWidth-150, map(i, imarray.length/2, imarray.length, 50, windowHeight-50));
			console.log(pos);
		}
		rects.push(new Rectangle(pos, imarray[i]));
	}
}


function randomPos1(marginRight, marginBottom) {
	return createVector(50, random(50, windowHeight - marginBottom));
}

function randomPos2(marginRight, marginBottom) {
	return createVector(windowWidth-50, random(50, windowHeight - marginBottom));
}

function draw() {
	clear();
	bg.resize(windowWidth*0.6, 0);
		  imageMode(CENTER);
	
	image(bg, windowWidth/2, windowHeight/2);
	imageMode(CORNER)

	rects.forEach(function(r) {
		return r.draw();
	});

}

function mousePressed() {
	var m = createVector(mouseX, mouseY);
	var index;
	rects.forEach(function(r, i) {
		if (r.hits(m)) {
			clickOffset = p5.Vector.sub(r.pos, m);
			isDragging = true;
			dragRec = r;
			index = i;
		}
	});
	if (isDragging) {
		putOnTop(index);

	}
}

function putOnTop(index) {
	rects.splice(index, 1);
	rects.push(dragRec);
}

function mouseDragged() {
	if (isDragging) {
		var m = createVector(mouseX, mouseY);
		dragRec.pos.set(m).add(clickOffset);
	}
}

function mouseReleased() {
	isDragging = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}