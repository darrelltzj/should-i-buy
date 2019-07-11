require("dotenv").config();
const axios = require("axios");

module.exports.getDailyPrices = async symbol => {
  const res = await axios({
    method: "GET",
    url: "https://www.alphavantage.co/query",
    params: {
      datatype: "json",
      function: "TIME_SERIES_DAILY",
      symbol,
      apikey: process.env.ALPHA_VANTAGE_API_KEY
    }
  });
  return res.data["Time Series (Daily)"];
};
