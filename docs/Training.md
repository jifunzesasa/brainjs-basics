# Training
Use *train()* to train the network with an array of training data. The network has to be trained with all the data in bulk in one call to *train()* . More training patterns will probably take longer to train, but will usually result in a network better at classifying new patterns. 


## Data format

#### For training with NeuralNetwork 
Each training pattern should have an input and an output , both of which can be either an array of numbers from 0 to 1 or a hash of numbers from 0 to 1 . For the color contrast demo it looks something like this:

```js
const net = new brain.NeuralNetwork();

net.train([{ input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 } }, { input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 } }, { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } }]);

const output = net.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.99, black: 0.002 }
```

Here's another variation of the above example. (Note that input objects do not need to be similar.)
```js
net.train([{input: { r: 0.03, g: 0.7 }, output: { black: 1 }},            {input: { r: 0.16, b: 0.2 }, output: { white: 1 }}, {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]); 
 
const output = net.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.81, black: 0.18 }

```


#### For training with RNNTimeStep , LSTMTimeStep and GRUTimeStep 
Each training pattern can either: Be an array of numbers Be an array of arrays of numbers Example using an array of numbers:
```js
const net = new brain.recurrent.LSTMTimeStep(); 
 
net.train([[1, 2, 3]]); 
 
const output = net.run([1, 2]);  // 3
```



### Training 

Options train() takes a hash of options as its second argument:

The network will stop training whenever one of the two criteria is met: the training error has gone below the threshold (default 0.005 ), or the max number of iterations (default 20000 ) has been reached. 

By default training will not let you know how it's doing until the end, but set log to true to get periodic updates on the current training error of the network. The training error should decrease every time. The updates will be printed to console. If you set log to a function, this function will be called with the updates instead of printing to the console. 

The learning rate is a parameter that influences how quickly the network trains. It's a number from 0 to 1 . If the learning rate is close to 0 , it will take longer to train. If the learning rate is closer to 1 , it will train faster, but training results may be constrained to a local minimum and perform badly on new data.(Overfitting) The default learning rate is 0.3 . 

The momentum is similar to learning rate, expecting a value from 0 to 1 as well, but it is multiplied against the next level's change value. The default value is 0.1 

Any of these training options can be passed into the constructor or passed into the updateTrainingOptions(opts) method and they will be saved on the network and used during the training time. If you save your network to json, these training options are saved and restored as well (except for callback and log, callback will be forgotten and log will be restored using console.log). 

A boolean property called invalidTrainOptsShouldThrow is set to true by default. While the option is true , if you enter a training option that is outside the normal range, an error will be thrown with a message about the abnormal option. When the option is set to false , no error will be sent, but a message will still be sent to console.warn with the related information.

```js
net.train(data, { 
            // Defaults values --> expected validation
       iterations: 20000,    // the maximum times to iterate the training data --> number greater than 0       
       errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1       
       log: false,           // true to use console.log, when a function is supplied it is used --> Either true or a       
       logPeriod: 10,        // iterations between logging out --> number greater than 0       
       learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1       
       momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1       
       callback: null,       // a periodic call back that can be triggered while training --> null or function       
       callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number       
       timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0 });

```