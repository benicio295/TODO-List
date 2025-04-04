export enum TypeErrors {
	HASH_PASSWORD_ERROR = 'HPE-001',
	ERROR_ORM_DATABASE = 'ODE-001'
}

export class AppError extends Error {
	constructor(
		message: string,
		cause: unknown,
		public typeError: TypeErrors
	) {
		super(message, { cause });
	}
}
