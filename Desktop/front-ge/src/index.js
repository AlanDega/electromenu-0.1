import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as firebase from "firebase/app";
import "firebase/messaging";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import { getOrders, uploadToken } from "../src/apollo/server";
import i18n from './i18n'

import { server_url } from "./config/config";
import App from './app'
const GET_ORDERS = gql`${getOrders}`
const UPLOAD_TOKEN = gql`${uploadToken}`

const firebaseConfig = {
    apiKey: "AIzaSyDMdQgtlgOMpMDo88n-w9fK4WceOYnuZkk",
    authDomain: "gourmet-express-255904.firebaseapp.com",
    databaseURL: "https://gourmet-express-255904.firebaseio.com",
    projectId: "gourmet-express-255904",
    storageBucket: "gourmet-express-255904.appspot.com",
    messagingSenderId: "784836339807",
    appId: "1:784836339807:web:576c7dcbed066116ad93ea",
    measurementId: "G-E1PM4NC711"
};

/*const firebaseConfig = {
  apiKey: "AIzaSyDCnSTWqbN7NWg9oVDzWz5dvhw2dX-RTb0",
  authDomain: "foodapp-77e88.firebaseapp.com",
  databaseURL: "https://foodapp-77e88.firebaseio.com",
  projectId: "foodapp-77e88",
  storageBucket: "foodapp-77e88.appspot.com",
  messagingSenderId: "678143951107",
  appId: "1:678143951107:web:498eca9a1eca6c0b"
};*/

const cache = new InMemoryCache()
const httpLink = createUploadLink({
  uri: `${server_url}graphql`,
})

const client = new ApolloClient({
  link: httpLink,
  cache
});

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
//messaging.usePublicVapidKey("BBFzJyX1yDzhRcnK07MEBYKqI5muEFTwnxPwg94IdPTAbFi1KstIQVeyuvWAo3-5LH_oBsfivWns53iMXEuS6Lg");
messaging.usePublicVapidKey("BBoy_MSQwlOuo_JvyVNJJRlw5JG4tHG1DWk79Ab4Ecp8JXs_zqjzR2R7Pq-mNLHVVuACKS4GvZIpAfj8RiYQ-fM");
messaging.requestPermission().then(function () {
  messaging.getToken().then(function (currentToken) {
    if (currentToken) {
      client.mutate({ mutation: UPLOAD_TOKEN, variables: { pushToken: currentToken } })
        .then(() => {
        })
        .catch(() => {
        })
    } else {
    }
  }).catch(function () {
  });
}).catch(function () {
});

messaging.onMessage(function (payload) {
  
  var notificationTitle = 'Nueva Orden';
  var notificationOptions = {
    body: payload.data.orderid,
    icon: 'https://panel.gourmetexpress.co/assets/images/logo.png'
  };

  let nt = new Notification(notificationTitle, notificationOptions)
  
  nt.onclick = function (event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    //window.open('https://enatega.com/dashboard');
    window.open('https://panel.gourmetexpress.co/dashboard');
    nt.close();
  }

  // console.log('Message received. ', payload);
  client.query({ query: GET_ORDERS, fetchPolicy: 'network-only' })
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
  ,
  document.getElementById("root")
);
