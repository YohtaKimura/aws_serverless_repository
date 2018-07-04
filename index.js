var fs = require("fs");
var AWS = require("aws-sdk");

var putObjectToS3 = (bucket, key, data) => {
  var s3 = new AWS.S3();
  var params = {
    ContentType: "text/html",
    Bucket: bucket,
    Key: key,
    Body: data
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};

exports.handler = (event, context, callback) => {
  var body = JSON.parse(event.body);
  var responseBody = {
    response: body.user
  };
  var newPage =
    "<!DOCTYPE html>\
               <html>\
                <head>\
                </head>\
                <body>\
                  <p style='color: blue;'>Hello " +
    body.user +
    ":D</p>\
                </body>\
               </html>";

  putObjectToS3(process.env.BUCKET_NAME, "index.html", newPage);

  var response = {
    statusCode: 200,
    headers: {
      my_header: "my_value"
    },
    body: JSON.stringify(responseBody),
    isBase64Encoded: false
  };

  callback(null, response);
};
