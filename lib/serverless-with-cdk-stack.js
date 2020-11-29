"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessWithCdkStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class ServerlessWithCdkStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // create dynamo db table
        const table = new dynamodb.Table(this, 'BooksTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'booksInformartion'
        });
        //Code for lambda with basic hello world.
        const helloLambda = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const booksLambda = new lambda.Function(this, 'BooksHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'books.handler'
        });
        // write to db
        const writeLambda = new lambda.Function(this, 'WriteHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'writetodb.handler'
        });
        // code for api gateway
        //API that includes the following HTTP endpoints: ANY /, GET /books, POST /books, GET /books/{book_id}, DELETE /books/{book_id}
        const api = new apigw.RestApi(this, 'myapigateway');
        api.root.addMethod('ANY');
        // lambda integration with api gateway
        const apiHelloInteg = new apigw.LambdaIntegration(helloLambda);
        const apiBooksInteg = new apigw.LambdaIntegration(booksLambda);
        const dbBooksInteg = new apigw.LambdaIntegration(writeLambda);
        //add Resource
        const apiHello = api.root.addResource('hello');
        apiHello.addMethod('GET', apiHelloInteg);
        apiHello.addMethod('POST', dbBooksInteg);
        //books resource
        const books = api.root.addResource('books');
        books.addMethod('GET', apiBooksInteg);
        books.addMethod('POST', dbBooksInteg);
        //const book = books.addResource('{book_id}');
        // books.addMethod('GET');
        //books.addMethod('DELETE'); 
        //Lambda integration with API gateway
        //const getlambda = new lambda.Function(...);
        //new apigw.LambdaRestApi(this,'GetLmbda',)  
    }
}
exports.ServerlessWithCdkStack = ServerlessWithCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVybGVzcy13aXRoLWNkay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlcmxlc3Mtd2l0aC1jZGstc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLDhDQUE4QztBQUM5QyxpREFBaUQ7QUFDakQsa0RBQWtEO0FBQ2xELE1BQWEsc0JBQXVCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDbkQsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUNsRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MseUJBQXlCO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsWUFBWSxFQUFDO1lBQ2pELFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ2pFLFNBQVMsRUFBRSxtQkFBbUI7U0FDL0IsQ0FBQyxDQUFDO1FBRUgseUNBQXlDO1FBQ3pDLE1BQU8sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsY0FBYyxFQUFFO1lBQzVELE9BQU8sRUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtTQUUzQixDQUFDLENBQUM7UUFFSCxNQUFPLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLGNBQWMsRUFBRTtZQUM1RCxPQUFPLEVBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDM0IsQ0FBQyxDQUFDO1FBQ0gsY0FBYztRQUNkLE1BQU8sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsY0FBYyxFQUFFO1lBQzVELE9BQU8sRUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsbUJBQW1CO1NBQzdCLENBQUMsQ0FBQztRQUNDLHVCQUF1QjtRQUN2QiwrSEFBK0g7UUFDL0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxjQUFjLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixzQ0FBc0M7UUFDckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsY0FBYztRQUNkLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3hDLGdCQUFnQjtRQUNoQixNQUFNLEtBQUssR0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxhQUFhLENBQUMsQ0FBQztRQUNyQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxZQUFZLENBQUMsQ0FBQztRQUN2Qyw4Q0FBOEM7UUFDN0MsMEJBQTBCO1FBQ3pCLDZCQUE2QjtRQUMvQixxQ0FBcUM7UUFFbkMsNkNBQTZDO1FBQzdDLDZDQUE2QztJQUtoRCxDQUFDO0NBQ0Y7QUEzREQsd0RBMkRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJztcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJsZXNzV2l0aENka1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgLy8gY3JlYXRlIGR5bmFtbyBkYiB0YWJsZVxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsJ0Jvb2tzVGFibGUnLHtcbiAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAnaWQnLCB0eXBlOiBkeW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklORyB9LFxuICAgICAgdGFibGVOYW1lOiAnYm9va3NJbmZvcm1hcnRpb24nXG4gICAgfSk7XG5cbiAgICAvL0NvZGUgZm9yIGxhbWJkYSB3aXRoIGJhc2ljIGhlbGxvIHdvcmxkLlxuICAgIGNvbnN0ICBoZWxsb0xhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywnSGVsbG9IYW5kbGVyJywge1xuICAgICAgcnVudGltZTogIGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJ1xuXG4gIH0pOyBcblxuICBjb25zdCAgYm9va3NMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsJ0Jvb2tzSGFuZGxlcicsIHtcbiAgICBydW50aW1lOiAgbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICBoYW5kbGVyOiAnYm9va3MuaGFuZGxlcidcbn0pOyBcbi8vIHdyaXRlIHRvIGRiXG5jb25zdCAgd3JpdGVMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsJ1dyaXRlSGFuZGxlcicsIHtcbiAgcnVudGltZTogIGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICBoYW5kbGVyOiAnd3JpdGV0b2RiLmhhbmRsZXInXG59KTsgXG4gICAgLy8gY29kZSBmb3IgYXBpIGdhdGV3YXlcbiAgICAvL0FQSSB0aGF0IGluY2x1ZGVzIHRoZSBmb2xsb3dpbmcgSFRUUCBlbmRwb2ludHM6IEFOWSAvLCBHRVQgL2Jvb2tzLCBQT1NUIC9ib29rcywgR0VUIC9ib29rcy97Ym9va19pZH0sIERFTEVURSAvYm9va3Mve2Jvb2tfaWR9XG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWd3LlJlc3RBcGkodGhpcywnbXlhcGlnYXRld2F5Jyk7XG4gICAgICAgYXBpLnJvb3QuYWRkTWV0aG9kKCdBTlknKTtcbiAgICAvLyBsYW1iZGEgaW50ZWdyYXRpb24gd2l0aCBhcGkgZ2F0ZXdheVxuICAgICBjb25zdCBhcGlIZWxsb0ludGVnID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGhlbGxvTGFtYmRhKTtcbiAgICAgY29uc3QgYXBpQm9va3NJbnRlZyA9IG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbihib29rc0xhbWJkYSk7XG4gICAgIGNvbnN0IGRiQm9va3NJbnRlZyA9IG5ldyBhcGlndy5MYW1iZGFJbnRlZ3JhdGlvbih3cml0ZUxhbWJkYSk7XG4gICAgIC8vYWRkIFJlc291cmNlXG4gICAgIGNvbnN0IGFwaUhlbGxvID0gYXBpLnJvb3QuYWRkUmVzb3VyY2UoJ2hlbGxvJyk7XG4gICAgIGFwaUhlbGxvLmFkZE1ldGhvZCgnR0VUJyxhcGlIZWxsb0ludGVnKTtcbiAgICAgYXBpSGVsbG8uYWRkTWV0aG9kKCdQT1NUJyxkYkJvb2tzSW50ZWcpO1xuICAgICAvL2Jvb2tzIHJlc291cmNlXG4gICAgIGNvbnN0IGJvb2tzID0gIGFwaS5yb290LmFkZFJlc291cmNlKCdib29rcycpO1xuICAgICBib29rcy5hZGRNZXRob2QoJ0dFVCcsYXBpQm9va3NJbnRlZyk7XG4gICAgIGJvb2tzLmFkZE1ldGhvZCgnUE9TVCcsZGJCb29rc0ludGVnKTtcbiAgIC8vY29uc3QgYm9vayA9IGJvb2tzLmFkZFJlc291cmNlKCd7Ym9va19pZH0nKTtcbiAgICAvLyBib29rcy5hZGRNZXRob2QoJ0dFVCcpO1xuICAgICAvL2Jvb2tzLmFkZE1ldGhvZCgnREVMRVRFJyk7IFxuICAgLy9MYW1iZGEgaW50ZWdyYXRpb24gd2l0aCBBUEkgZ2F0ZXdheVxuXG4gICAgIC8vY29uc3QgZ2V0bGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbiguLi4pO1xuICAgICAvL25ldyBhcGlndy5MYW1iZGFSZXN0QXBpKHRoaXMsJ0dldExtYmRhJywpICBcblxuICAgIFxuICBcblxuICB9XG59XG4iXX0=