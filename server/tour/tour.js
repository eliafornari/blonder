"use strict"

let request = require('request');
let fs = require('fs');

exports.get = function (req, res) {

  var artist = req.params.artist;
  console.log(artist);

  var url = 'https://api.bandsintown.com/artists/'+artist+'/events.json?api_version=2.0&app_id=HIGHLYSUSPECT';
  request({
      url:url, //URL to hit
      method: 'GET'
      }, function(error, response, body){

          if(error) {
              console.log("GET entry error");
              console.log(error);
              res.status(response.statusCode).json(body);
          } else {
            var parsed= JSON.parse(body)
            res.status(response.statusCode).json(parsed);
          }
  });

};
