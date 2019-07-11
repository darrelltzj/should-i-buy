const tf = require("@tensorflow/tfjs-node");
const { getDailyPrices } = require("./services/api");
const { buildCnn } = require("./services/model");
const {
  parseRawDailyPrices,
  parseTrainingSets,
  scaleToPercent,
  scaleToOriginal
} = require("./services/processData");

const shouldIBuy = async (symbol, { trainingPeriod, epochs }) => {
  try {
    const rawDailyPrices = await getDailyPrices(symbol);

    const parsedPrices = await parseRawDailyPrices(rawDailyPrices);

    const closingPrices = await parsedPrices.map(prices => prices.close);

    const minClosingPrice = Math.min(...closingPrices);

    const maxClosingPrice = Math.max(...closingPrices);

    // === SCALE DATA ===
    const scaledClosingPrices = await scaleToPercent(
      closingPrices,
      minClosingPrice,
      maxClosingPrice
    );

    const { trainingSetX, trainingSetY } = parseTrainingSets(
      scaledClosingPrices,
      trainingPeriod
    );

    const scaledInput = scaledClosingPrices.slice(
      scaledClosingPrices.length - trainingPeriod
    );

    // === SET TENSOR DATA ===
    const tensorTrainingSetX = tf
      .tensor1d(trainingSetX)
      .reshape([closingPrices.length - trainingPeriod, trainingPeriod, 1]);

    const tensorTrainingSetY = tf.tensor1d(trainingSetY);

    const tensorInput = tf
      .tensor1d(scaledInput)
      .reshape([1, trainingPeriod, 1]);

    // === BUILD TRAIN PREDICT ===
    const model = buildCnn(trainingPeriod);

    // console.log("Training...");

    await model.fit(tensorTrainingSetX, tensorTrainingSetY, { epochs });

    // console.log("Training complete!");

    const predictedValueScaled = await model.predict(tensorInput).data();

    // === SCALE PREDICTION TO ORIGINAL ===
    const predictedValue = scaleToOriginal(
      predictedValueScaled,
      minClosingPrice,
      maxClosingPrice
    );

    console.log(`Timestamp: ${new Date()}`);

    console.log(
      `Previous closing price for ${symbol}: ${
        closingPrices[closingPrices.length - 1]
      }`
    );

    console.log(`Predicted closing price for ${symbol}: ${predictedValue[0]}`);

    const output = predictedValue > closingPrices[closingPrices.length - 1];

    console.log(`Should I buy ${symbol}? ${output ? "Yes" : "No"}`);

    return output;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

shouldIBuy("AAPL", { trainingPeriod: 10, epochs: 100 });
