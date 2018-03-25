function cl(x){console.log(x)}
// init project
var express = require('express');
var app = express();

app.use(express.static('public'));


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/:img', function (req, res) {
  
  var options = {
  url: "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase="+req.params.img,
  headers: {
    'Api-Key': process.env.API_KEY
  }
};
  cl(options.url);
  
  var request = require('request');
  request(options, function (error, response, body) {
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode == 200) {

      body = JSON.parse(body);
      res.send(body);
      //res.send(body.images[0].display_sizes[0].uri);
      
    }
    else {

    }
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
