import {
	Body,
	ConflictException,
	Controller,
	HttpStatus,
	InternalServerErrorException,
	Post,
	UsePipes
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOperation
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../../pipes/zod/zod-validation.pipe';
import { AccountService } from './account.service';
import { CreateAccountDTO, createAccountDTO, CreateAccountDTOSwagger } from './dtos/account.dto';

@Controller('account')
export class AccountController {
	// eslint-disable-next-line no-empty-function
	constructor(private _accountService: AccountService) {}

	@Post('create')
	@UsePipes(new ZodValidationPipe(createAccountDTO))
	@ApiOperation({ summary: 'Create a new account' })
	@ApiBody({ type: CreateAccountDTOSwagger })
	@ApiBadRequestResponse({ description: 'Bad Request' })
	@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
	@ApiCreatedResponse({ description: 'Account Created' })
	@ApiConflictResponse({ description: 'Account already exists' })
	async createUser(@Body() account: CreateAccountDTO) {
		let hasError = false;

		try {
			hasError = await this._accountService.createAccount(account);
		} catch {
			throw new InternalServerErrorException('Internal Server Error');
		}

		if (!hasError) {
			return { message: 'Account Created', statusCode: HttpStatus.CREATED };
		} else throw new ConflictException('Account already exists');
	}
}
