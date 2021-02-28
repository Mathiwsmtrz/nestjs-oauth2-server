import { DynamicModule, Module } from '@nestjs/common';
import { ClientEntity } from '../client.entity';
import { Connection } from 'typeorm';
import { CLIENT_PROVIDER } from './modules.dto';

@Module({})
export class ClientModule {
  static forRoot(CONNECTION_PROVIDER): DynamicModule {
    return {
      module: ClientModule,
      providers: [
        {
          provide: CLIENT_PROVIDER,
          inject: [CONNECTION_PROVIDER],
          useFactory: (connection: Connection) =>
            connection.getRepository(ClientEntity),
        },
      ],
      exports: [CLIENT_PROVIDER]
    };
  }
};