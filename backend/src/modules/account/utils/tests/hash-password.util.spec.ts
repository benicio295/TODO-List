import * as crypto from 'crypto';
import { AppError } from '../../../../app.exception';
import { hashPassword } from '../hash-password.util';

describe('hashPassword', () => {
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

	it('Should successfully hash a password and return salt:hash format', async () => {
		const mockBinaryPassword = Buffer.from(password, 'utf-8');
		jest.spyOn(crypto, 'randomBytes').mockImplementation(() => {
			return {
				toString: () => 'mockedsalt12345678'
			} as Buffer;
		});

		spyOnScrypt(null, mockBinaryPassword);

		const result = await hashPassword(password);
		expect(result).toBe('mockedsalt12345678:' + mockBinaryPassword.toString('hex'));
	});

	it('Should throw AppError when scrypt fails', async () => {
		const mockError = new Error('Scrypt error');
		spyOnScrypt(mockError, Buffer.alloc(0));

		const result = hashPassword(password);
		await expect(result).rejects.toThrow(AppError);
	});
});
