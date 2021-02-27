import { Module } from '@nestjs/common';
import { ClientEntity } from 'index';
import { Connection } from 'typeorm';
import { CLIENT_PROVIDER, CONN_DYNAMIC_PROVIDER } from './modules.dto';

@Module({
  controllers: [],
  providers: [
    {
      provide: CLIENT_PROVIDER,
      inject: [CONN_DYNAMIC_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ClientEntity),
    },
  ],
  exports: [CLIENT_PROVIDER]
})
export class ClientModule {};