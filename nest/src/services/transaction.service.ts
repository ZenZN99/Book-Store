import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import Cart from 'src/models/Cart';
import Transaction from 'src/models/Transaction';
import User from 'src/models/User';

@Injectable()
export class TransactionService {
  async transferBalance(senderId: Types.ObjectId, receiverId: Types.ObjectId) {
    if (senderId.toString() === receiverId.toString()) {
      throw new BadRequestException('لا يمكن التحويل إلى نفسك');
    }

    const senderCart = await Cart.findOne({ userId: senderId });

    if (!senderCart || senderCart.items.length === 0) {
      throw new BadRequestException('سلة التسوق فارغة');
    }

    const totalAmount = senderCart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      throw new NotFoundException('لم يتم العثور على المستخدمين');
    }

    if (sender.balance < totalAmount) {
      throw new BadRequestException('الرصيد غير كافي');
    }

    sender.balance -= totalAmount;
    receiver.balance += totalAmount;

    await Promise.all([sender.save(), receiver.save()]);

    const transaction = await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount: totalAmount,
    });

    senderCart.items = [];
    await senderCart.save();

    return {
      success: true,
      transaction,
      totalAmount,
    };
  }
  async rechargeBalance(userId: Types.ObjectId, amount: number) {
    if (amount <= 0) {
      throw new BadRequestException('كمية غير صالحة');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    user.balance += amount;
    await user.save();

    return {
      success: true,
      balance: user.balance,
    };
  }
}
