import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModuleModule } from './common-module/common-module.module';
import { UserModule } from './user/user.module';
import { ToDoModule } from './to-dos/to-do.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [
    CommonModuleModule,
    UserModule,
    ToDoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('v1/to-dos');
  }
}
