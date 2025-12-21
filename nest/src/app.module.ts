import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './services/user.service';
import { UserController } from './Controllers/user.controller';
import { BookController } from './Controllers/book.controller';
import { BookService } from './services/book.service';
import { CartController } from './Controllers/cart.controller';
import { CartService } from './services/cart.service';
import { TransactionController } from './Controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    BookController,
    CartController,
    TransactionController
  ],
  providers: [
    AppService,
    UserService,
    BookService,
    CartService,
    TransactionService
  ],
})
export class AppModule {}
