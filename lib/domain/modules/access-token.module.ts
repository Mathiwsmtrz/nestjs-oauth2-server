import { DynamicModule, Module } from '@nestjs/common';
import { AccessTokenEntity } from '../access-token.entity';
import { Connection } from 'typeorm';
import { ACCESS_TOKEN_PROVIDER } from './modules.dto';

@Module({})
export class AccessTokenModule {
  static forRoot(CONNECTION_PROVIDER): DynamicModule {
    return {
      module: AccessTokenModule,
      providers: [
        {
          provide: ACCESS_TOKEN_PROVIDER,
          inject: [CONNECTION_PROVIDER],
          useFactory: (connection: Connection) =>
            connection.getRepository(AccessTokenEntity),
        },
      ],
      exports: [ACCESS_TOKEN_PROVIDER]
    };
  }
};