import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { connectDB } from './utils/connectDB';
import dotenv from 'dotenv';
import { AllExceptionsFilter } from './middlewares/all-exceptions.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "https://www-book-store.netlify.app",
  });
  connectDB();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // إزالة أي حقول غير معرفة في DTO تلقائيًا
      forbidNonWhitelisted: true, // رمي خطأ إذا كان هناك حقول غير معرفة
      transform: true, // تحويل البيانات تلقائيًا إلى النوع المناسب في DTO
      
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
