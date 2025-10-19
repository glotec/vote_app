import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // 👈 ADD THIS

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 👈 CHANGE THIS

  // Serve static files from 'uploads' folder
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(process.env.PORT ?? 20255);
  await app.listen(process.env.PORT ?? 20255, '0.0.0.0');
  // console.log('App is running on:', await app.getUrl());
  console.log('Static files served from:', join(__dirname, '..', 'uploads'));
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { join } from 'path';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Serve static files from 'uploads' folder
//   app.useStaticAssets(join(__dirname, '..', 'uploads'), {
//     prefix: '/uploads/',
//   });

//   // Enable CORS
//   app.enableCors({
//     origin: 'http://localhost:5173', // Adjust this to match your frontend URL
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true, // Set this to true if using cookies or authentication headers
//   });

//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true, // 👈 Converts incoming values to proper types
//       whitelist: true, // 👈 Removes unexpected fields
//       forbidNonWhitelisted: true, // Optional: throws on unexpected fields
//     }),
//   );

//   await app.listen(process.env.PORT ?? 20255);
//   console.log('App is running on:', await app.getUrl());
// }
// bootstrap().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
