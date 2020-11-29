# Serverless_with_CDK
Serverless with lambda , api gateway and dynamo db

# AWS CDK
# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template


# Install NPM : https://nodejs.org/en/ 14.15.1

# Install Brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

brew doctor

export PATH="/usr/local/bin:$PATH"

brew install node




# Install CDK

sudo npm i -g aws-cdk


# Initialize a project:
```
$ mkdir test
$ cd test
$ cdk init app --language=typescript
```

# iTerm2 is an open source replacement for Apple's Terminal. It's highly customizable and comes with a lot of useful features.


brew cask install iterm2


# Default lambda js code

```
exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
```


# Install CDK

npm i -g aws-cdk


# Initialize a project:
$ mkdir test
$ cd test
$ cdk init app --language=typescript


# Create a lamba function
Import lamba module from cdk

npm install  @aws-cdk/aws-lambda
