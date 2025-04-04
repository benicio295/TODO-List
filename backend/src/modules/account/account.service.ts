import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDTO } from './dtos/account.dto';
import { IAccountRepository } from './repositories/account.repository.interface';
import { hashPassword } from './utils/hash-password.util';

@Injectable()
export class AccountService {
	// eslint-disable-next-line no-empty-function
	constructor(@Inject('ACCOUNT_REPOSITORY') private _accountRepository: IAccountRepository) {}

	async createAccount(account: CreateAccountDTO): Promise<boolean> {
		const { email, name, password } = account;
		const hashedPassword = await hashPassword(password);
		const hasError = await this._accountRepository.addAccount({ name, email, password: hashedPassword });
		return hasError;
	}
}
