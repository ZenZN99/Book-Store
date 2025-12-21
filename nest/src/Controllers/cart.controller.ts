import {
  Controller,
  Param,
  Post,
  Get,
  Put,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/authGuard';
import { CartService } from 'src/services/cart.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post(':bookId')
  @UseGuards(AuthGuard)
  addedToCart(@Param('bookId') bookId: string, @Req() req: RequestWithUser) {
    const userId = req.user._id;
    return this.cartService.addedToCart(bookId, userId);
  }
  @Get('user')
  @UseGuards(AuthGuard)
  getCartUser(@Req() req: RequestWithUser) {
    const userId = req.user._id;
   return this.cartService.getCartUser(userId);
  }

  @Delete(':bookId')
  @UseGuards(AuthGuard)
  deleteItemCart(@Param('bookId') bookId: string, @Req() req: RequestWithUser) {
    const userId = req.user._id;
    return this.cartService.deleteItemCart(bookId, userId);
  }

  @Put(':bookId')
  @UseGuards(AuthGuard)
  updateQuantity(
    @Param('bookId') bookId: string,
    @Req() req: RequestWithUser,
    quantity: number,
  ) {
    const userId = req.user._id;
    return this.cartService.updateQuantity(bookId, userId, quantity);
  }
  @Delete()
  @UseGuards(AuthGuard)
  deleteAllCartItems(
    @Req() req: RequestWithUser
  ){
    const userId = req.user._id;
    return this.cartService.deleteAllCartItems(userId)
  }
}
