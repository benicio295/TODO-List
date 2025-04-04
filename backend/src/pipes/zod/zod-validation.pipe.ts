import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
	// eslint-disable-next-line no-empty-function
	constructor(private _schema: ZodSchema) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	transform(value: unknown, _: ArgumentMetadata) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const parsedValue = this._schema.parse(value);
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return parsedValue;
		} catch {
			throw new BadRequestException('Bad Request');
		}
	}
}
