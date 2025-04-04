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
