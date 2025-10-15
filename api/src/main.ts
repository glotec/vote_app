import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Adjust this to match your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Set this to true if using cookies or authentication headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 👈 Converts incoming values to proper types
      whitelist: true, // 👈 Removes unexpected fields
      forbidNonWhitelisted: true, // Optional: throws on unexpected fields
    }),
  );

  await app.listen(process.env.PORT ?? 20255);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
