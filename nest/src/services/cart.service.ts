import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import Book from 'src/models/Book';
import Cart, { CartItems } from 'src/models/Cart';

@Injectable()
export class CartService {
  async addedToCart(bookId: string, userId: Types.ObjectId) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      const newItem: CartItems = {
        bookId: book._id,
        quantity: 1,
        totalPrice: book.price,
      };

      cart = new Cart({
        userId: userId,
        items: [newItem],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === book._id.toString(),
      );

      if (itemIndex > -1 && cart.items[itemIndex]) {
        cart.items[itemIndex].quantity += 1;
        cart.items[itemIndex].totalPrice =
          cart.items[itemIndex].quantity * book.price;
      } else {
        const newItem: CartItems = {
          bookId: book._id,
          quantity: 1,
          totalPrice: book.price,
        };
        cart.items.push(newItem);
      }
    }

    await cart.save();

    return cart;
  }
  async getCartUser(userId: Types.ObjectId) {
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      throw new NotFoundException('لم يتم العثور على العربة');
    }
    return cart;
  }

  async deleteItemCart(bookId: string, userId: Types.ObjectId) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      throw new NotFoundException('لم يتم العثور على العربة');
    }
    const exists = cart.items.some((id) => id.toString() === bookId);
    if (!exists) {
      throw new NotFoundException('الكتاب غير موجود في السلة');
    }
    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);
    await cart.save();

    return cart;
  }
  async updateQuantity(bookId: string, userId: Types.ObjectId, quantity: number) {
    if (!Types.ObjectId.isValid(bookId)) {
      throw new BadRequestException('معرف الكتاب غير صالح');
    }

    const cart = await Cart.findOne({
      userId: userId,
    }).populate('items.bookId', 'title price image');

    if (!cart) {
      throw new NotFoundException('السلة غير موجودة');
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.bookId._id.toString() === bookId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('الكتاب غير موجود في السلة');
    }

    const book = await Book.findById(bookId);
    if (!book) {
      throw new NotFoundException('الكتاب غير موجود');
    }

    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].totalPrice = quantity * book.price;

    await cart.save();
    return cart;
  }
  async deleteAllCartItems(userId:Types.ObjectId) {
  const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      throw new NotFoundException('لم يتم العثور على العربة');
    }
    cart.items = [];
    await cart.save();
    return cart;
  }
}
