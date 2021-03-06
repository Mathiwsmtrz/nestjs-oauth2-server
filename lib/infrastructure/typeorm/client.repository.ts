import {
    ClientRepositoryInterface,
    ClientEntity, ClientNotFoundException
} from "../../domain";
import {Repository} from "typeorm";
import {Inject, Injectable} from '@nestjs/common';
import { CLIENT_PROVIDER } from "../../domain/modules/modules.dto";

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
    constructor(
        @Inject(CLIENT_PROVIDER)
        private readonly repository: Repository<ClientEntity>
    ) {}

    async findAll(): Promise<ClientEntity[]> {
        return await this.repository.find();
    }

    async find(id: string): Promise<ClientEntity> {
        const client = await this.repository.findOne(id);

        if (!client) {
            throw ClientNotFoundException.withId(id);
        }

        return client;
    }

    async findByClientId(clientId: string): Promise<ClientEntity> {
        const client = await this.repository.findOne({
            where: {
                clientId: clientId
            }
        });

        if (!client) {
            throw ClientNotFoundException.withClientId(clientId);
        }

        return client;
    }

    async findByName(name: string): Promise<ClientEntity> {
        const client = await this.repository.findOne({
            where: {
                name: name
            }
        });

        if (!client) {
            throw ClientNotFoundException.withName(name);
        }

        return client;
    }

    async create(client: ClientEntity): Promise<ClientEntity> {
        return await this.repository.save(client);
    }

    async delete(client: ClientEntity): Promise<ClientEntity> {
        client.deletedAt = new Date();

        return await this.repository.save(client);
    }
}
