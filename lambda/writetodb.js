var AWS = require('aws-sdk');
//const { callbackify } = require('util');
var region = process.env.AWS_REGION
AWS.config.update({region: region})

var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
exports.handler = (event, context, callback) => {
var params = {
  TableName: event.queryStringParameters.table,
  //TableName: 'bookInfo',
  Item: {
    'id': event.queryStringParameters.id,
    'book':  event.queryStringParameters.book
    //'id': 'one',
    //'book': 'java'
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    callback(err,  null);  
  } else {
    console.log("Success", data);
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
                     callback(data.Item, response);
  }

});
};
/*var AWS = require('aws-sdk');
//const { callbackify } = require('util');
var region = process.env.AWS_REGION
AWS.config.update({region: region})
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const TableName = event.queryStringParameters.table;
    const Item = {};
       Item['id'] = event.queryStringParameters.id;
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
       };
};*/

