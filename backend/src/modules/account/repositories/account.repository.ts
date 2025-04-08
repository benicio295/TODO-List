import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppError, TypeErrors } from '../../../app.exception';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAccountDTO } from '../dtos/account.dto';
import { IAccountRepository } from './account.repository.interface';

@Injectable()
export class AccountRepository implements IAccountRepository {
	// eslint-disable-next-line no-empty-function
	constructor(private _prismaService: PrismaService) {}

	async addAccount(account: CreateAccountDTO): Promise<boolean> {
		try {
			await this._prismaService.account.create({ data: account });
			return false;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') return true;
			else throw new AppError('Error creating Account', error, TypeErrors.ERROR_ORM_DATABASE);
		}
	}
}
