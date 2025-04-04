import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountRepository } from './repositories/account.repository';

@Module({
	imports: [PrismaModule],
	providers: [
		AccountService,
		{
			provide: 'ACCOUNT_REPOSITORY',
			useClass: AccountRepository
		}
	],
	controllers: [AccountController]
})
export class AccountModule {}
