// const fs = require('fs');
// const mnist = require('mnist');
// const set = mnist.set(8000, 2000);
// fs.writeFileSync(__dirname + './data/training.json', JSON.stringify(set.training));
// fs.writeFileSync(__dirname + './data/test.json', JSON.stringify(set.test));

//////////////////////////


// lofi data loader
function loadJSON(path) {
    var xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr);
                }
            }
        };
        xhr.open('GET', path, true);
        xhr.send();
    });
}

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

///////////////////////////////
const brain = require('brain.js');
// lofi destructuring
const layer = brain.layer;
const convolution = layer.convolution;
const fullyConnected = layer.fullyConnected;
const input = layer.input;
const relu = layer.relu;
const output = layer.output;
const pool = layer.pool;
const softMax = layer.softMax;
const target = layer.target;

//////////////////////////////



var net = new brain.FeedForward({
    inputLayer: () => input({ height: 28, width: 28 }),
    hiddenLayers: [
        input => convolution({ filters: 8, stride: 1, padding: 2, filterHeight: 5, filterWidth: 5, filterCount: 8 }, input),
        input => relu(input),
        input => pool({ filters: 8, filterWidth: 2, filterHeight: 2, filterCount: 8, stride: 2 }, input),
        input => convolution({ filters: 16, stride: 1, padding: 2, filterHeight: 5, filterWidth: 5, filterCount: 16 }, input),
        input => relu(input),
        input => pool({ filterWidth: 3, filterHeight: 3, filterCount: 16, stride: 3 }, input),
        input => fullyConnected({ depth: 10 }, input),
        input => softMax({ width: 10 }, input)
    ],
    outputLayer: input => target({ width: 1, height: 10 }, input)
});

loadJSON('data/training.json')
    .then(function (trainingData) {
        net.train(trainingData);
    });

//   loadJSON('data/test.json')
//     .then(function(testData) {
//       document.body.appendChild(toImage(randomImageData(testData)));
//     });