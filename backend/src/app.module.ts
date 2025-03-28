import { Module } from '@nestjs/common';
import { modules } from './modules';
import { globalModules } from './modules/global';

@Module({
	imports: [...modules, ...globalModules]
})
export class AppModule {}
