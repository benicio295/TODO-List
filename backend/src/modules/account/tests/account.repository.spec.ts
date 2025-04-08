import { Test } from '@nestjs/testing';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError } from '../../../app.exception';
import { PrismaService } from '../../../modules/prisma/prisma.service';
import { AccountRepository } from '../repositories/account.repository';

describe('AccountRepository', () => {
	let accountRepository: AccountRepository = {} as AccountRepository;
	let prismaService: PrismaService = {} as PrismaService;
	const mockAccountData = {
		id: 'test-id',
		name: 'Mocked Name',
		email: 'mocked@gmail.com',
		password: 'mockedpassword',
		avatarImage: null,
		createdAt: new Date()
	};

	function spyCreateAddAccount() {
		const createSpy = jest.spyOn(prismaService.account, 'create');
		return createSpy;
	}

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [
				AccountRepository,
				{
					provide: PrismaService,
					useValue: {
						account: {
							create: jest.fn()
						}
					}
				}
			]
		}).compile();

		accountRepository = moduleRef.get<AccountRepository>(AccountRepository);
		prismaService = moduleRef.get<PrismaService>(PrismaService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('addAccount', () => {
		it('should return false when account is successfully created', async () => {
			spyCreateAddAccount().mockResolvedValue(mockAccountData);

			const result = await accountRepository.addAccount({
				name: mockAccountData.name,
				email: mockAccountData.email,
				password: mockAccountData.password
			});

			expect(result).toBe(false);
		});

		it('should return true when account creation fails due to unique constraint violation', async () => {
			const uniqueConstraintError = new PrismaClientKnownRequestError('Unique constraint failed', {
				code: 'P2002',
				clientVersion: '1.0.0'
			});

			spyCreateAddAccount().mockRejectedValue(uniqueConstraintError);
			const result = await accountRepository.addAccount({
				name: mockAccountData.name,
				email: mockAccountData.email,
				password: mockAccountData.password
			});

			expect(result).toBe(true);
		});

		it('should throw AppError when account creation fails with non-constraint error', async () => {
			const genericError = new Error('Database error');
			spyCreateAddAccount().mockRejectedValue(genericError);
			const result = accountRepository.addAccount({
				name: mockAccountData.name,
				email: mockAccountData.email,
				password: mockAccountData.password
			});

			await expect(result).rejects.toThrow(AppError);
		});
	});
});
