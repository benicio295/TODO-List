import { scrypt } from 'crypto';
import { AppError, TypeErrors } from '../../../app.exception';

export function verifyHashPassword(password: string, hashedPassword: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const [salt, hash] = hashedPassword.split(':');
		const binaryPassword = Buffer.from(password, 'utf-8');

		scrypt(binaryPassword, salt, 64, (error, derivedKey) => {
			if (error)
				reject(new AppError('Error verifying password', error.cause, TypeErrors.HASH_PASSWORD_ERROR));

			const isValidPassword = hash === derivedKey.toString('hex');
			resolve(isValidPassword);
		});
	});
}
