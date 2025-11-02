import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HandleResponseInterceptor } from './handle-response/handle-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new HandleResponseInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
