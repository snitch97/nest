import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './http-exception.fillter';
import { AllExceptionFilter } from './all-exceptions.filter';
import { ValidationPipe } from './cats/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();