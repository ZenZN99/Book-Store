import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from 'src/services/book.service';
import type { RequestWithUser } from 'src/types/express';
import { AuthGuard } from 'src/middlewares/authGuard';
import { CreateBookDto } from 'src/dtos/book/createBook.dto';
import { UpdateBookDto } from 'src/dtos/book/updateBook.dto';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('books')
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @Get('user/books')
  @UseGuards(AuthGuard)
  getUserBooks(@Req() req: RequestWithUser) {
    const userId = req.user._id;
    return this.bookService.getBookUser(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  createBook(
    @Req() req: RequestWithUser,
    @Body() dto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user._id;
    return this.bookService.createBook(dto, file, userId);
  }

  @Get(':bookId')
  getBookById(@Param('bookId') id: string) {
    return this.bookService.getBookById(id);
  }

  @Put(':bookId')
  @UseGuards(AuthGuard)
  updateBook(
    @Req() req: RequestWithUser,
    @Param('bookId') id: string,
    @Body() dto: UpdateBookDto,
  ) {
    const userId = req.user._id;
    return this.bookService.updateBook(dto, userId, id);
  }

  @Delete(':bookId')
  @UseGuards(AuthGuard)
  deleteBook(@Req() req: RequestWithUser, @Param('bookId') id: string) {
    const userId = req.user._id;
    return this.bookService.deleteBook(userId, id);
  }
}
