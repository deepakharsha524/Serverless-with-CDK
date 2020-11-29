import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
export class ServerlessWithCdkStack1 extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // create dynamo db table
    const table = new dynamodb.Table(this,'BooksTable',{
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'booksInformartion'
    });
    const booktable = new dynamodb.Table(this,'BooksnewTable',{
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'bookInfo'
    });
    
    //Code for lambda with basic hello world.
    const  helloLambda = new lambda.Function(this,'HelloHandler', {
      runtime:  lambda.Runtime.NODEJS_10_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'

  }); 

  const  booksLambda = new lambda.Function(this,'BooksHandler', {
    runtime:  lambda.Runtime.NODEJS_10_X,
    code: lambda.Code.fromAsset('lambda'),
    handler: 'books.handler'
}); 
// write to db
const  writeLambda = new lambda.Function(this,'WriteHandler', {
  runtime:  lambda.Runtime.NODEJS_10_X,
  code: lambda.Code.fromAsset('lambda'),
  handler: 'writetodb.handler'
}); 
const  hardwriteLambda = new lambda.Function(this,'HardWriteHandler', {
  runtime:  lambda.Runtime.NODEJS_10_X,
  code: lambda.Code.fromAsset('lambda'),
  handler: 'hardwritetodb.handler'
}); 
   // Grant read write permission for lambda
   table.grantReadWriteData(hardwriteLambda);
   booktable.grantReadWriteData(writeLambda);
    // code for api gateway
    //API that includes the following HTTP endpoints: ANY /, GET /books, POST /books, GET /books/{book_id}, DELETE /books/{book_id}
    const api = new apigw.RestApi(this,'myapigateway');
       api.root.addMethod('ANY');
    // lambda integration with api gateway
     const apiHelloInteg = new apigw.LambdaIntegration(helloLambda);
     const apiBooksInteg = new apigw.LambdaIntegration(booksLambda);
     const dbBooksInteg = new apigw.LambdaIntegration(hardwriteLambda);
     const BooksInteg = new apigw.LambdaIntegration(writeLambda);
     //add Resource
     const apiHello = api.root.addResource('hello');
     apiHello.addMethod('GET',apiHelloInteg);
     apiHello.addMethod('POST',dbBooksInteg);
     //books resource
     const books =  api.root.addResource('books');
     books.addMethod('GET',apiBooksInteg);
     books.addMethod('POST',BooksInteg);
   //const book = books.addResource('{book_id}');
    // books.addMethod('GET');
     //books.addMethod('DELETE'); 
   //Lambda integration with API gateway

     //const getlambda = new lambda.Function(...);
     //new apigw.LambdaRestApi(this,'GetLmbda',)  

    
  

  }
}
