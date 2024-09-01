import { MethodNotAllowedException, MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.fillter';
import { RolesGuard } from './cats/guard/roles.guard';
import { LoggingInterceptor } from './cats/interceptors/logging.interceptor';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';

// @Module({
//   imports: [CatsModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//     // Class middleware
//       // .apply(LoggerMiddleware)
//       // .forRoutes({path: 'cats', method: RequestMethod.GET});
//       // forRoutes(CatsController);
//       // apply() method may either take a single middleware, or multiple arguments to specify multiple middlewares.

//       // .exclude(
//       //   {path: 'cats', method: RequestMethod.GET},
//       //   {path: 'cats', method: RequestMethod.POST},
//       //   'cats/(.*)';
//       // )
//       // The exclude() method supports wildcard parameters using the path-to-regexp package.

//     // Functional middleware
//       .apply(logger)
//       .exclude(
//         {path:'cats', method: RequestMethod.POST}
//       )
//       .forRoutes(CatsController);
//     }

//     // Multiple middleware
//     // consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
// }

@Module({
  imports:[CatsModule],
  providers: [
    {
      // provide: APP_FILTER,
      // useClass: HttpExceptionFilter,
      // provide:APP_PIPE,
      // useClass: ValidationPipe,
      // provide:APP_GUARD,
      // useClass: RolesGuard,
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }
  ]
})
export class AppModule {}