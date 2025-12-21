import { IsNumber, Min } from 'class-validator';

export class RechargeBalanceDto {
  @IsNumber()
  @Min(1)
  amount: number;
}
