import { Body, Controller, HttpException, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod/zod-validation.pipe';
import { AccountService } from './account.service';
import { CreateAccountDTO, createAccountDTO } from './dtos/account.dto';

@Controller('account')
export class AccountController {
	// eslint-disable-next-line no-empty-function
	constructor(private _accountService: AccountService) {}

	@Post('create')
	@UsePipes(new ZodValidationPipe(createAccountDTO))
	async createUser(@Body() account: CreateAccountDTO) {
		let hasError = false;

		try {
			hasError = await this._accountService.createAccount(account);
		} catch {
			throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
		}

		if (!hasError) {
			return { message: 'Account Created', statusCode: HttpStatus.CREATED };
		} else throw new HttpException('Account already exists', HttpStatus.CONFLICT);
	}
}
