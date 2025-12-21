import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateBookDto } from 'src/dtos/book/createBook.dto';
import { UpdateBookDto } from 'src/dtos/book/updateBook.dto';
import Book from 'src/models/Book';
import cloudinary from 'src/utils/cloudinary';
import streamifier from 'streamifier';
@Injectable()
export class BookService {
  async getAllBooks() {
    const books = await Book.find().sort({ createdAt: -1 });
    return books;
  }
  async getBookById(bookId: string) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }
    return book;
  }
  async createBook(
    dto: CreateBookDto,
    file: Express.Multer.File,
    userId: Types.ObjectId,
  ) {
    try {
      const { title, description, price, stock, category } = dto;

      if (!file) {
        throw new BadRequestException('الرجاء رفع صورة كتاب');
      }

      const priceNumber = Number(price);
      const stockNumber = Number(stock);

      if (isNaN(priceNumber) || isNaN(stockNumber)) {
        throw new BadRequestException('السعر والكمية يجب أن يكونا أرقامًا');
      }

      if (priceNumber < 1 || stockNumber < 1) {
        throw new BadRequestException('القيمة يجب أن تكون أكبر من صفر');
      }

      const uploadToCloudinary = (): Promise<{
        secure_url: string;
        public_id: string;
      }> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: 'books', use_filename: true, unique_filename: false },
            (error, result) => {
              if (error) return reject(error);
              if (!result)
                return reject(
                  new Error('لم يتم الحصول على نتيجة من Cloudinary'),
                );
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            },
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      };

      const result = await uploadToCloudinary();

      const newBook = await Book.create({
        title,
        description,
        image: result.secure_url,
        price: priceNumber,
        stock: stockNumber,
        category,
        userId: userId,
      });

      return newBook;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('حدث خطأ اثناء انشاء كتاب');
    }
  }
  async updateBook(
    dto: UpdateBookDto,
    userId: Types.ObjectId,
    bookId: string,
  ) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const { title, description, price, stock, category } = dto;

    const priceNumber = Number(price);
    const stockNumber = Number(stock);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      throw new BadRequestException('السعر والكمية يجب أن يكونا أرقامًا');
    }

    if (priceNumber < 1 || stockNumber < 1) {
      throw new BadRequestException('القيمة يجب أن تكون أكبر من صفر');
    }

    const book = await Book.findOneAndUpdate(
      { _id: bookId, userId: userId },
      { title, description, price, stock, category },
      { new: true },
    );

    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }

    return book;
  }
  async deleteBook(userId: Types.ObjectId, bookId: string) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const book = await Book.findOneAndDelete(
      { _id: bookId, userId: userId },
      { new: true },
    );
    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }

    return book;
  }
  async getBookUser(userId: Types.ObjectId) {
    const books = await Book.find({
      userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
    return books;
  }
}
