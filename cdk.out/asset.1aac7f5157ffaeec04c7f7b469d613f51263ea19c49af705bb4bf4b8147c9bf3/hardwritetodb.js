var AWS = require('aws-sdk');
//const { callbackify } = require('util');
var region = process.env.AWS_REGION
AWS.config.update({region: region})
//const dynamo = new AWS.DynamoDB.DocumentClient();
var dynamo = new AWS.DynamoDB({apiVersion: '2012-08-10'});
exports.handler = (event, context, callback) => {
    
    var params = {
  TableName: 'booksInformartion',
  Item: {
    'book' : {S: 'java'},
    'loc' : {S: 'Richard Roe'},
    'count': {N: '2'}
  }
};

// Call DynamoDB to add the item to the table
dynamo.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});

/*    console.log('*****************' +event+'**********************');
    const TableName = event.queryStringParameters.table;
    const Item = {};
       Item['book'] = event.queryStringParameters.book;
       Item['loc'] = event.queryStringParameters.loc;
       Item['count'] = event.queryStringParameters.count;

       dynamo.put({TableName, Item}), function (err, data) {
                 if (err) {
                      console.log('error', err);
                      callback(err,  null);    
                 } else {
                     var response = {
                        statusCode: 200,
                        headers: { 
                             'Content-Type': 'applicaiton/json',
                             'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                             'Access-Control-Allow-Credentials': 'true'
                        },
                        isBase64Encoded: false
                     };
                     console.log('success: returened ${data.Item}');
                     callback(null, response);
                 }
       };*/
};
//exports.handler = async (event) => {
    // TODO implement
    //console.log("request:",JSON.stringify(event,undefined,2));
    //const response = {
    //    statusCode: 200,
    //    body: JSON.stringify('Posting data to DB'),
    //};
    //return response;

// Load the AWS SDK for Node.js
//var AWS = require('aws-sdk');
// Set the region 
//AWS.config.update({region: 'REGION'});
