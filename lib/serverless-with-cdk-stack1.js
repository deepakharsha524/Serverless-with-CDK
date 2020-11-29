"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessWithCdkStack1 = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apigw = require("@aws-cdk/aws-apigateway");
const dynamodb = require("@aws-cdk/aws-dynamodb");
class ServerlessWithCdkStack1 extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // create dynamo db table
        const table = new dynamodb.Table(this, 'BooksTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'booksInformartion'
        });
        const booktable = new dynamodb.Table(this, 'BooksnewTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            tableName: 'bookInfo'
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
        const hardwriteLambda = new lambda.Function(this, 'HardWriteHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hardwritetodb.handler'
        });
        // Grant read write permission for lambda
        table.grantReadWriteData(hardwriteLambda);
        booktable.grantReadWriteData(writeLambda);
        // code for api gateway
        //API that includes the following HTTP endpoints: ANY /, GET /books, POST /books, GET /books/{book_id}, DELETE /books/{book_id}
        const api = new apigw.RestApi(this, 'myapigateway');
        api.root.addMethod('ANY');
        // lambda integration with api gateway
        const apiHelloInteg = new apigw.LambdaIntegration(helloLambda);
        const apiBooksInteg = new apigw.LambdaIntegration(booksLambda);
        const dbBooksInteg = new apigw.LambdaIntegration(hardwriteLambda);
        const BooksInteg = new apigw.LambdaIntegration(writeLambda);
        //add Resource
        const apiHello = api.root.addResource('hello');
        apiHello.addMethod('GET', apiHelloInteg);
        apiHello.addMethod('POST', dbBooksInteg);
        //books resource
        const books = api.root.addResource('books');
        books.addMethod('GET', apiBooksInteg);
        books.addMethod('POST', BooksInteg);
        //const book = books.addResource('{book_id}');
        // books.addMethod('GET');
        //books.addMethod('DELETE'); 
        //Lambda integration with API gateway
        //const getlambda = new lambda.Function(...);
        //new apigw.LambdaRestApi(this,'GetLmbda',)  
    }
}
exports.ServerlessWithCdkStack1 = ServerlessWithCdkStack1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVybGVzcy13aXRoLWNkay1zdGFjazEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXJ2ZXJsZXNzLXdpdGgtY2RrLXN0YWNrMS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLGlEQUFpRDtBQUNqRCxrREFBa0Q7QUFDbEQsTUFBYSx1QkFBd0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNwRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3Qyx5QkFBeUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxZQUFZLEVBQUM7WUFDakQsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDakUsU0FBUyxFQUFFLG1CQUFtQjtTQUMvQixDQUFDLENBQUM7UUFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLGVBQWUsRUFBQztZQUN4RCxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtZQUNqRSxTQUFTLEVBQUUsVUFBVTtTQUN0QixDQUFDLENBQUM7UUFFSCx5Q0FBeUM7UUFDekMsTUFBTyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxjQUFjLEVBQUU7WUFDNUQsT0FBTyxFQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNwQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxlQUFlO1NBRTNCLENBQUMsQ0FBQztRQUVILE1BQU8sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsY0FBYyxFQUFFO1lBQzVELE9BQU8sRUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDcEMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQUM7UUFDSCxjQUFjO1FBQ2QsTUFBTyxXQUFXLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxjQUFjLEVBQUU7WUFDNUQsT0FBTyxFQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNwQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxtQkFBbUI7U0FDN0IsQ0FBQyxDQUFDO1FBQ0gsTUFBTyxlQUFlLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBRTtZQUNwRSxPQUFPLEVBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3BDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLHVCQUF1QjtTQUNqQyxDQUFDLENBQUM7UUFDQSx5Q0FBeUM7UUFDekMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6Qyx1QkFBdUI7UUFDdkIsK0hBQStIO1FBQy9ILE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEQsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0Isc0NBQXNDO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sYUFBYSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVELGNBQWM7UUFDZCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQyxhQUFhLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxZQUFZLENBQUMsQ0FBQztRQUN4QyxnQkFBZ0I7UUFDaEIsTUFBTSxLQUFLLEdBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsOENBQThDO1FBQzdDLDBCQUEwQjtRQUN6Qiw2QkFBNkI7UUFDL0IscUNBQXFDO1FBRW5DLDZDQUE2QztRQUM3Qyw2Q0FBNkM7SUFLaEQsQ0FBQztDQUNGO0FBeEVELDBEQXdFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWd3IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5JztcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ0Bhd3MtY2RrL2F3cy1keW5hbW9kYic7XG5leHBvcnQgY2xhc3MgU2VydmVybGVzc1dpdGhDZGtTdGFjazEgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkNvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBjcmVhdGUgZHluYW1vIGRiIHRhYmxlXG4gICAgY29uc3QgdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywnQm9va3NUYWJsZScse1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6ICdib29rc0luZm9ybWFydGlvbidcbiAgICB9KTtcbiAgICBjb25zdCBib29rdGFibGUgPSBuZXcgZHluYW1vZGIuVGFibGUodGhpcywnQm9va3NuZXdUYWJsZScse1xuICAgICAgcGFydGl0aW9uS2V5OiB7IG5hbWU6ICdpZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH0sXG4gICAgICB0YWJsZU5hbWU6ICdib29rSW5mbydcbiAgICB9KTtcbiAgICBcbiAgICAvL0NvZGUgZm9yIGxhbWJkYSB3aXRoIGJhc2ljIGhlbGxvIHdvcmxkLlxuICAgIGNvbnN0ICBoZWxsb0xhbWJkYSA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywnSGVsbG9IYW5kbGVyJywge1xuICAgICAgcnVudGltZTogIGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdoZWxsby5oYW5kbGVyJ1xuXG4gIH0pOyBcblxuICBjb25zdCAgYm9va3NMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsJ0Jvb2tzSGFuZGxlcicsIHtcbiAgICBydW50aW1lOiAgbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICBoYW5kbGVyOiAnYm9va3MuaGFuZGxlcidcbn0pOyBcbi8vIHdyaXRlIHRvIGRiXG5jb25zdCAgd3JpdGVMYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsJ1dyaXRlSGFuZGxlcicsIHtcbiAgcnVudGltZTogIGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICBoYW5kbGVyOiAnd3JpdGV0b2RiLmhhbmRsZXInXG59KTsgXG5jb25zdCAgaGFyZHdyaXRlTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCdIYXJkV3JpdGVIYW5kbGVyJywge1xuICBydW50aW1lOiAgbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gIGhhbmRsZXI6ICdoYXJkd3JpdGV0b2RiLmhhbmRsZXInXG59KTsgXG4gICAvLyBHcmFudCByZWFkIHdyaXRlIHBlcm1pc3Npb24gZm9yIGxhbWJkYVxuICAgdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKGhhcmR3cml0ZUxhbWJkYSk7XG4gICBib29rdGFibGUuZ3JhbnRSZWFkV3JpdGVEYXRhKHdyaXRlTGFtYmRhKTtcbiAgICAvLyBjb2RlIGZvciBhcGkgZ2F0ZXdheVxuICAgIC8vQVBJIHRoYXQgaW5jbHVkZXMgdGhlIGZvbGxvd2luZyBIVFRQIGVuZHBvaW50czogQU5ZIC8sIEdFVCAvYm9va3MsIFBPU1QgL2Jvb2tzLCBHRVQgL2Jvb2tzL3tib29rX2lkfSwgREVMRVRFIC9ib29rcy97Ym9va19pZH1cbiAgICBjb25zdCBhcGkgPSBuZXcgYXBpZ3cuUmVzdEFwaSh0aGlzLCdteWFwaWdhdGV3YXknKTtcbiAgICAgICBhcGkucm9vdC5hZGRNZXRob2QoJ0FOWScpO1xuICAgIC8vIGxhbWJkYSBpbnRlZ3JhdGlvbiB3aXRoIGFwaSBnYXRld2F5XG4gICAgIGNvbnN0IGFwaUhlbGxvSW50ZWcgPSBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24oaGVsbG9MYW1iZGEpO1xuICAgICBjb25zdCBhcGlCb29rc0ludGVnID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGJvb2tzTGFtYmRhKTtcbiAgICAgY29uc3QgZGJCb29rc0ludGVnID0gbmV3IGFwaWd3LkxhbWJkYUludGVncmF0aW9uKGhhcmR3cml0ZUxhbWJkYSk7XG4gICAgIGNvbnN0IEJvb2tzSW50ZWcgPSBuZXcgYXBpZ3cuTGFtYmRhSW50ZWdyYXRpb24od3JpdGVMYW1iZGEpO1xuICAgICAvL2FkZCBSZXNvdXJjZVxuICAgICBjb25zdCBhcGlIZWxsbyA9IGFwaS5yb290LmFkZFJlc291cmNlKCdoZWxsbycpO1xuICAgICBhcGlIZWxsby5hZGRNZXRob2QoJ0dFVCcsYXBpSGVsbG9JbnRlZyk7XG4gICAgIGFwaUhlbGxvLmFkZE1ldGhvZCgnUE9TVCcsZGJCb29rc0ludGVnKTtcbiAgICAgLy9ib29rcyByZXNvdXJjZVxuICAgICBjb25zdCBib29rcyA9ICBhcGkucm9vdC5hZGRSZXNvdXJjZSgnYm9va3MnKTtcbiAgICAgYm9va3MuYWRkTWV0aG9kKCdHRVQnLGFwaUJvb2tzSW50ZWcpO1xuICAgICBib29rcy5hZGRNZXRob2QoJ1BPU1QnLEJvb2tzSW50ZWcpO1xuICAgLy9jb25zdCBib29rID0gYm9va3MuYWRkUmVzb3VyY2UoJ3tib29rX2lkfScpO1xuICAgIC8vIGJvb2tzLmFkZE1ldGhvZCgnR0VUJyk7XG4gICAgIC8vYm9va3MuYWRkTWV0aG9kKCdERUxFVEUnKTsgXG4gICAvL0xhbWJkYSBpbnRlZ3JhdGlvbiB3aXRoIEFQSSBnYXRld2F5XG5cbiAgICAgLy9jb25zdCBnZXRsYW1iZGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKC4uLik7XG4gICAgIC8vbmV3IGFwaWd3LkxhbWJkYVJlc3RBcGkodGhpcywnR2V0TG1iZGEnLCkgIFxuXG4gICAgXG4gIFxuXG4gIH1cbn1cbiJdfQ==