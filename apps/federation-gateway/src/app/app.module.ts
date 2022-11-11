import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { verify } from 'jsonwebtoken';

const handleContext = ({ req }) => {
  if (req && req.headers.authorization) {
    try {
      const jwtToken = req.headers.authorization.split('Bearer ')[1];
      const decodedJwt = verify(jwtToken, 'MY_NotSuperS3cr3t');
      return { user: decodedJwt };
    } catch (err) {
      //throw Http error if required.
      return;
    }
  }
  //throw Http error if required.
  else return;
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // ... Apollo server options
        cors: true,
        context: handleContext,
      },
      gateway: {
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }) {
              request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null);
            },
          });
        },
        pollIntervalInMs: 10000,
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://localhost:3331/graphql' },
            { name: 'tasks', url: 'http://localhost:3332/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
