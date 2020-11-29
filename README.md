# Serverless_with_CDK
Serverless with lambda , api gateway and dynamo db
#AWS CDK

#Install NPM : https://nodejs.org/en/ 14.15.1

#Install Brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

brew doctor

export PATH="/usr/local/bin:$PATH"

brew install node




#Install CDK

sudo npm i -g aws-cdk


#Initialize a project:
$ mkdir test
$ cd test
$ cdk init app --language=typescript


#iTerm2 is an open source replacement for Apple's Terminal. It's highly customizable and comes with a lot of useful features.


brew cask install iterm2


#Default lambda js code


exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};



#Install CDK

npm i -g aws-cdk


#Initialize a project:
$ mkdir test
$ cd test
$ cdk init app --language=typescript


#Create a lamba function
Import lamba module from cdk

npm install  @aws-cdk/aws-lambda
