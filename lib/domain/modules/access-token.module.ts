import { Module } from '@nestjs/common';
import { AccessTokenEntity } from 'domain/access-token.entity';
import { Connection } from 'typeorm';
import { ACCESS_TOKEN_PROVIDER, CONN_DYNAMIC_PROVIDER } from './modules.dto';

@Module({
  controllers: [],
  providers: [
    {
      provide: ACCESS_TOKEN_PROVIDER,
      inject: [CONN_DYNAMIC_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(AccessTokenEntity),
    },
  ],
  exports: [ACCESS_TOKEN_PROVIDER]
})
export class AccessTokenModule {};