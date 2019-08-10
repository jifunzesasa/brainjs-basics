const brain = require('brain.js');
const fs = require('fs');
const mnist = require('mnist');

// const set = mnist.set(8000, 2000);
// fs.writeFileSync(__dirname + './data/training.json', JSON.stringify(set.training));
// fs.writeFileSync(__dirname + './data/test.json', JSON.stringify(set.test));


function randomImageData(data) {
    var i = (data.length * Math.random()).toFixed();
    return data[i];
}

function toImage(dataItem) {
    var canvas = document.createElement('canvas');
    canvas.style.backgroundColor = 'black';
    canvas.width = 28;
    canvas.height = 28;
    var ctx = canvas.getContext('2d');
    var imageArray = [];
    var length = 28 * 28;
    for (var i = 0; i < length; i++) {
        var color = dataItem.input[i] * 255;
        imageArray.push(color);
        imageArray.push(color);
        imageArray.push(color);
        imageArray.push(color);
    }
    ctx.putImageData(new ImageData(new Uint8ClampedArray(imageArray), 28, 28), 0, 0);
    return canvas;
}

const net = new brain.NeuralNetwork();
const data = require('./data/training.json');
const test_data = require('./data/test.json');

const trainingData = data.map(item => ({
    input: item.text,
    output: item.category
}));

net.train(trainingData, { iterations: 1000 });



document.body.appendChild(toImage(randomImageData(testData)));
