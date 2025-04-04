import { CreateAccountDTO } from '../dtos/account.dto';

export interface IAccountRepository {
	addAccount(account: CreateAccountDTO): Promise<boolean>;
}
