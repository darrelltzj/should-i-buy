const tf = require("@tensorflow/tfjs-node");

module.exports.buildCnn = trainingPeriod => {
  const model = tf.sequential();

  model.add(
    tf.layers.inputLayer({
      inputShape: [trainingPeriod, 1]
    })
  );

  model.add(
    tf.layers.conv1d({
      kernelSize: 2,
      filters: 128,
      strides: 1,
      use_bias: true,
      activation: "relu",
      kernelInitializer: "VarianceScaling"
    })
  );

  model.add(
    tf.layers.averagePooling1d({
      poolSize: [2],
      strides: [1]
    })
  );

  model.add(
    tf.layers.conv1d({
      kernelSize: 2,
      filters: 64,
      strides: 1,
      use_bias: true,
      activation: "relu",
      kernelInitializer: "VarianceScaling"
    })
  );

  model.add(
    tf.layers.averagePooling1d({
      poolSize: [2],
      strides: [1]
    })
  );

  model.add(tf.layers.flatten({}));

  model.add(
    tf.layers.dense({
      units: 1,
      kernelInitializer: "VarianceScaling",
      activation: "linear"
    })
  );

  model.compile({
    optimizer: "adam",
    loss: "meanSquaredError"
  });

  return model;
};
