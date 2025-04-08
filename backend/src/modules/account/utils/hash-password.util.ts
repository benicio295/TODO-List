import { randomBytes, scrypt } from 'crypto';
import { AppError, TypeErrors } from '../../../app.exception';

export function hashPassword(password: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const binaryPassword = Buffer.from(password, 'utf-8');
		const randomSalt = randomBytes(16).toString('hex');

		scrypt(binaryPassword, randomSalt, 64, (error, derivedKey) => {
			if (error)
				reject(new AppError('Error hashing password', error.cause, TypeErrors.HASH_PASSWORD_ERROR));

			const hashedPassword = randomSalt + ':' + derivedKey.toString('hex');
			resolve(hashedPassword);
		});
	});
}
