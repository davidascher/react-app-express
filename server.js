"use strict";
/**
 * Server application.
 *
 * @jsx React.DOM
 */

var express     = require('express');
var browserify  = require('browserify');
var reactify    = require('reactify');
var servePage   = require('react-app-middleware');
var serveJS     = require('connect-browserify');

var opts = {
  debug: true,
  watch: true
}

// configure client code bundle, consult browserify docs for more but please do
// not change the line marked with DO NOT CHANGE!!! comment
function createBundler() {
  return browserify()
    .require('./client.js', {expose: './app'}) // DO NOT CHANGE!!!
    .transform(reactify);
}

// this is just an express app, add whatever you want
var app = express();

// serve client code via browserify
app.get('/assets/bundle.js', serveJS(createBundler(), {
  debug: opts.debug,
  watch: opts.watch
}));

// some API to get started with
app.get('/api', function(req, res) {
  res.send({message: 'Hello'});
});

// server pre-rendered UI
app.use(servePage(createBundler(), {
  debug: opts.debug,
  watch: opts.watch
}));

// start listening on 3000 port, now you can open http://localhost:3000 in your
// browser
app.listen(3000);
