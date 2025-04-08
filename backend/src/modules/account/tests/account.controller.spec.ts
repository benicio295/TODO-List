import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AccountController } from '../account.controller';
import { AccountService } from '../account.service';
import { AccountRepository } from '../repositories/account.repository';

describe('AccountController', () => {
	let accountController: AccountController = {} as AccountController;
	let accountService: AccountService = {} as AccountService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [PrismaModule],
			providers: [
				AccountService,
				{
					provide: 'ACCOUNT_REPOSITORY',
					useClass: AccountRepository
				}
			],
			controllers: [AccountController]
		}).compile();

		accountService = moduleRef.get<AccountService>(AccountService);
		accountController = moduleRef.get<AccountController>(AccountController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('createUser', () => {
		const mockCreateUser = {
			name: 'John Doe',
			email: 'john.doe@example.com',
			password: 'password123'
		};

		it('should call createAccount and return account created', async () => {
			jest.spyOn(accountService, 'createAccount').mockResolvedValue(false);

			const response = await accountController.createUser(mockCreateUser);
			expect(response).toEqual({ message: 'Account Created', statusCode: HttpStatus.CREATED });
		});

		it('should call createAccount and return account already exists', async () => {
			jest.spyOn(accountService, 'createAccount').mockResolvedValue(true);

			const response = accountController.createUser(mockCreateUser);
			await expect(response).rejects.toThrow('Account already exists');
		});

		it('should call createAccount and return an internal error', async () => {
			jest.spyOn(accountService, 'createAccount').mockRejectedValue(new Error('Internal Error'));

			const response = accountController.createUser(mockCreateUser);
			await expect(response).rejects.toThrow('Internal Server Error');
		});
	});
});
