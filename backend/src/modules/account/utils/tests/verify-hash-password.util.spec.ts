import * as crypto from 'crypto';
import { AppError } from '../../../../app.exception';
import { verifyHashPassword } from '../verify-hash-password.util';

describe('verifyHashPassword', () => {
	const password = 'securePassword123';

	function spyOnScrypt(error: Error | null, mockBinaryPassword: Buffer) {
		jest.spyOn(crypto, 'scrypt').mockImplementation((password, salt, keylen, options, callback) => {
			if (typeof callback === 'function') {
				callback(error, mockBinaryPassword);
			} else if (typeof options === 'function') {
				(options as (err: Error | null, derivedKey: Buffer) => void)(error, mockBinaryPassword);
			} else {
				return mockBinaryPassword;
			}
			return undefined;
		});
	}

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('Should successfully verify password and return true value', async () => {
		const mockBinaryPassword = Buffer.from(password, 'utf-8');
		const hashedPassword = `mockedsalt12345678:${mockBinaryPassword.toString('hex')}`;
		spyOnScrypt(null, mockBinaryPassword);

		const result = await verifyHashPassword(password, hashedPassword);
		expect(result).toBe(true);
	});

	it('Should throw AppError when scrypt fails', async () => {
		const mockError = new Error('Scrypt error');
		spyOnScrypt(mockError, Buffer.alloc(0));

		const result = verifyHashPassword(password, 'mockedsalt12345678:mockedhash');
		await expect(result).rejects.toThrow(AppError);
	});
});
