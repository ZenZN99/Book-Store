import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { RechargeBalanceDto } from 'src/dtos/transaction/recharge-balance.dto';
import { TransferBalanceDto } from 'src/dtos/transaction/transfer-balance.dto';
import { AuthGuard } from 'src/middlewares/authGuard';
import { TransactionService } from 'src/services/transaction.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AuthGuard)
  @Post('transfer')
  transferBalance(
    @Req() req: RequestWithUser,
    @Body() dto: TransferBalanceDto,
  ) {
    const userId = req.user._id;
    return this.transactionService.transferBalance(userId, dto.receiverId);
  }
  @UseGuards(AuthGuard)
  @Post('recharge')
  rechargeBalance(
    @Req() req: RequestWithUser,
    @Body() dto: RechargeBalanceDto,
  ) {
    const userId = req.user._id;
    return this.transactionService.rechargeBalance(userId, dto.amount);
  }
}
