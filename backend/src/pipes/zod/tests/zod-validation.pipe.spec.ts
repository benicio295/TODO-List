import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '../zod-validation.pipe';

describe('ZodValidationPipe', () => {
	const mockSchema = z.object({
		name: z.string(),
		age: z.number(),
		email: z.string().email()
	});
	const mockMetadata = { type: 'body' as const, metatype: Object, data: '' };
	let pipe: ZodValidationPipe = {} as ZodValidationPipe;

	beforeAll(() => {
		pipe = new ZodValidationPipe(mockSchema);
	});

	it('should return the parsed value when validation succeeds', () => {
		const mockAccount = {
			name: 'John Doe',
			age: 30,
			email: 'john@example.com'
		};

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result = pipe.transform(mockAccount, mockMetadata);
		expect(result).toEqual(mockAccount);
	});

	it('should throw BadRequestException when validation fails', () => {
		const mockInvalidAccount = {
			name: 'John Doe',
			age: 30,
			email: 'invalid-email'
		};

		expect(() => {
			pipe.transform(mockInvalidAccount, mockMetadata);
		}).toThrow(BadRequestException);
	});
});
