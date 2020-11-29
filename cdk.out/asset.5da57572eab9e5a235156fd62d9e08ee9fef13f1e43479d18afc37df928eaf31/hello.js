exports.handler = async (event) => {
    // TODO implement
    console.log("request:",JSON.stringify(event,undefined,2));
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
