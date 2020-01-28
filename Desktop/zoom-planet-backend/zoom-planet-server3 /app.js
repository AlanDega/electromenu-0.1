const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const path = require('path');
const engines = require("consolidate");
const { graphqlUploadExpress } = require('graphql-upload');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const paypal = require('./routes/paypal');
const stripe = require('./routes/stripe');
const isAuth = require('./middleware/is-auth');
const config = require('./helpers/config');
const app = express();

app.engine("ejs", engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// app.use('/images/itemslist', express.static('public/images/itemslist'))
app.use(express.static('public'))

app.use(isAuth);

app.use('/paypal', paypal)
app.use('/stripe', stripe)

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/food-delivery-landingPage/index.html'));
});
/*
app.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname + '/static/food-delivery-landingPage/food-delivery-chat.html'));
});
*/
app.use("/dashboard", express.static(path.join(__dirname, '/build')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'))
})

mongoose
 .connect(`mongodb://gexpress:O1jo-1205-1974@144.91.86.95:27017/gourmet_express`, {
   useNewUrlParser: true
 })/*
  .connect(
    //`mongodb://dbuser:mlab55@ds339177.mlab.com:39177/foodappdev`
    // `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@ds149875.mlab.com:49875/${config.MONGO_DB}`
  )*/
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
