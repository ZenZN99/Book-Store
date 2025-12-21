import { IsOptional, IsString, IsNumberString } from "class-validator";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumberString({}, { message: "السعر يجب أن يكون رقمًا" })
  price?: string;

  @IsOptional()
  @IsNumberString({}, { message: "الكمية يجب أن تكون رقمًا" })
  stock?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
