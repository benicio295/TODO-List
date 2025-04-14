export enum TypeErrors {
	HASH_PASSWORD_ERROR = 'HPE-001',
	ERROR_ORM_DATABASE = 'ODE-001'
}

export class AppError extends Error {
	constructor(
		message: string,
		cause: unknown,
		private _typeError: TypeErrors
	) {
		super(message, { cause });
		this.stack = this.stack?.replace('Error:', `Error [${this._typeError}]:`);
	}

	toString() {
		return `[${this._typeError}] - ${this.message}`;
	}
}
