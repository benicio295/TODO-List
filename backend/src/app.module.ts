import { Module } from '@nestjs/common';
import { modules } from './modules';

@Module({
	imports: [...modules]
})
export class AppModule {}
