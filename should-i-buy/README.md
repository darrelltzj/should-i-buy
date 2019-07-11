# Should I Buy

## About

**Should I Buy** is a WORK IN PROGRESS. It is meant for the author to explore TensorFlow for JavaScript. The application is currently using Convolutional Neural Network (more commonly used for image recognition) to predict the next closing price of a stock based on a stock's previous closing price pattern.

The project is currenty based off this article:
https://towardsdatascience.com/stock-price-prediction-system-using-1d-cnn-with-tensorflow-js-machine-learning-easy-and-fun-fe5323e68ffb

## Disclaimer

**Should I Buy** is a project meant for learning purposes only. All users of **Should I Buy** are advised to conduct their own independent research into individual stocks before making a purchase decision. In no way should **Should I Buy** or its author(s) be liable for any loss of investments.

## How to use

Ensure that you have Node.js installed on your machine.

Recommended Engine
Node.js: 10.16.0
NPM: 6.9.0

Install Packages

```
npm i
```

Get an Alpha Vantage api token and set it in a .env file (see .env.example)

```
ALPHA_VANTAGE_API_KEY=G3TY0URT0K3NFR0MALPHAVANTAGE
```

Set your stock symbol in line 89 of index.js (example: AAPL)

```
shouldIBuy("AAPL", { trainingPeriod: 10, epochs: 100 });
```

Start Prediction

```
npm start
```

Wait for the application to train the model and make a prediciton
