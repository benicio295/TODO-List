import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//Swagger config
	const config = new DocumentBuilder()
		.setTitle('TODO List API')
		.setDescription('API for task management and to-do lists')
		.setVersion('1.0')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);

	await app.listen(process.env.PORT as string);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
