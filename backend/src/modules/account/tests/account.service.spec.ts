import { Test } from '@nestjs/testing/test';
import { AccountService } from '../account.service';
import { IAccountRepository } from '../repositories/account.repository.interface';

describe('AccountService', () => {
	let accountService: AccountService = {} as AccountService;
	let accountRepository: IAccountRepository = {} as IAccountRepository;
	const mockAccountData = {
		name: 'Lorem Ipsum',
		email: 'lorem@gmail.com',
		password: 'loremipsum'
	};

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				AccountService,
				{
					provide: 'ACCOUNT_REPOSITORY',
					useValue: {
						addAccount: jest.fn()
					}
				}
			]
		}).compile();
		accountService = moduleRef.get<AccountService>(AccountService);
		accountRepository = moduleRef.get<IAccountRepository>('ACCOUNT_REPOSITORY');
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should method createAccount return false when account is created', async () => {
		jest.spyOn(accountRepository, 'addAccount').mockResolvedValue(false);
		const result = await accountService.createAccount(mockAccountData);

		expect(result).toBe(false);
	});
});
