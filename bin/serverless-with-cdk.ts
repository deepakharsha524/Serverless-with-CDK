#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServerlessWithCdkStack1 } from '../lib/serverless-with-cdk-stack1';

const app = new cdk.App();
//new ServerlessWithCdkStack(app, 'ServerlessWithCdkStack');
//passing eniroment variables like region.
new ServerlessWithCdkStack1(app, 'ServerlessWithCdkStack1',{
    env: {
        region: 'us-west-2'
    }
});