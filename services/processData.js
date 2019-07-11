module.exports.parseRawDailyPrices = async rawData => {
  const rawDates = Object.keys(rawData);
  const rawDataArr = await rawDates.map(date => ({
    date,
    open: rawData[date]["1. open"],
    high: rawData[date]["2. high"],
    low: rawData[date]["3. low"],
    close: rawData[date]["4. close"],
    volume: rawData[date]["5. volume"]
  }));
  const sortedRawDataArr = await rawDataArr.sort((a, b) => {
    const aParts = a.date.split("-");
    const bParts = b.date.split("-");
    return (
      new Date(aParts[0], aParts[1] - 1, aParts[2]) -
      new Date(bParts[0], bParts[1] - 1, bParts[2])
    );
  });
  return sortedRawDataArr;
};

module.exports.parseTrainingSets = (scaledClosingPrices, trainingPeriod) => {
  const trainingSetX = [];
  const trainingSetY = [];
  for (let i = trainingPeriod; i < scaledClosingPrices.length; i++) {
    for (let j = i - trainingPeriod; j < i; j++) {
      trainingSetX.push(scaledClosingPrices[j]);
    }
    trainingSetY.push(scaledClosingPrices[i]);
  }
  return { trainingSetX, trainingSetY };
};

module.exports.scaleToPercent = (arr, min, max) =>
  arr.map(val => (val - min) / (max - min));

module.exports.scaleToOriginal = (arr, min, max) =>
  arr.map(val => val * (max - min) + min);
