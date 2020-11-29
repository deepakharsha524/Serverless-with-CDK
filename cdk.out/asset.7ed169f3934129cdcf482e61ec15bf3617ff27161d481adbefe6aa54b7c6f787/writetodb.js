var AWS = require('aws-sdk');
const { callbackify } = require('util');
var region = process.env.AWS_REGION
AWS.config.update({region: region})
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

    const TableName = event.queryStringParameters.table;
    const Item = {};
       Item['book'] = event.queryStringParameters.book;
       Item['location'] = event.queryStringParameters.location;
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
