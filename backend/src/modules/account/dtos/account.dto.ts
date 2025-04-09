import { ApiProperty } from '@nestjs/swagger';
import z from 'zod';

const regexPassword = /^[A-Za-z0-9@#*!]+$/;

export const createAccountDTO = z
	.object({
		name: z
			.string()
			.regex(/^[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\s]+$/)
			.max(70),
		email: z.string().email().max(100),
		password: z.string().min(8).max(100).regex(regexPassword)
	})
	.required();

export type CreateAccountDTO = z.infer<typeof createAccountDTO>;

//Swagger
export class CreateAccountDTOSwagger {
	@ApiProperty({
		description: 'Name of the account holder',
		example: 'John Doe',
		maxLength: 70,
		pattern: '^[a-zA-ZáàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ\\s]+$'
	})
	name: string;

	@ApiProperty({
		description: 'Email of the account holder',
		example: 'john.doe@example.com',
		maxLength: 100
	})
	email: string;

	@ApiProperty({
		description: 'Password of the account holder',
		example: 'P@ssw0rd123',
		maxLength: 100,
		minLength: 8,
		pattern: '^[A-Za-z0-9@#*!]+$'
	})
	password: string;
}
