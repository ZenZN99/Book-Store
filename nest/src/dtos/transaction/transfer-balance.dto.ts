import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class TransferBalanceDto {
  @IsMongoId()
  receiverId: Types.ObjectId;
}
