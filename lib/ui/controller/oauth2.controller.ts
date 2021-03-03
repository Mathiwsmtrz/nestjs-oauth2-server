import {
    ClassSerializerInterceptor,
    Controller,
    ForbiddenException,
    Inject,
    Post,
    Body,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import {
    OAuth2Request,
    OAuth2Response
} from "../dto";

import {Oauth2GrantStrategyRegistry} from "../../domain/strategy";
import {ClientRepositoryInterface} from "../../domain/repository";

@Controller('oauth2')
@UseInterceptors(ClassSerializerInterceptor)
export class Oauth2Controller {

    /**
     * Constructor
     *
     * @param clientRepository
     * @param strategyRegistry
     */
    constructor(
        @Inject('ClientRepositoryInterface')
        private readonly clientRepository: ClientRepositoryInterface,
        private readonly strategyRegistry: Oauth2GrantStrategyRegistry
    ) {
    }

    @Post('token')
    @UsePipes(new ValidationPipe({ transform: true }))
    async token(@Body() request): Promise<OAuth2Response> {
        console.log(request);
        const client = await this.clientRepository.findByClientId(request.clientId);
        if (!await this.strategyRegistry.validate(request,client)) {
            throw new ForbiddenException("You are not allowed to access the given resource");
        }

        return await this.strategyRegistry.getOauth2Response(request, client);
    }
}
