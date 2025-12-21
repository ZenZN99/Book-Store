import {
  IsNotEmpty,
  IsString,
  IsNumberString,
} from "class-validator";

export class CreateBookDto {
  @IsNotEmpty({ message: "عنوان الكتاب مطلوب" })
  @IsString()
  title: string;

  @IsNotEmpty({ message: "وصف الكتاب مطلوب" })
  @IsString()
  description: string;

  @IsNotEmpty({ message: "السعر مطلوب" })
  @IsNumberString({}, { message: "السعر يجب أن يكون رقمًا" })
  price: string;

  @IsNotEmpty({ message: "الكمية مطلوبة" })
  @IsNumberString({}, { message: "الكمية يجب أن تكون رقمًا" })
  stock: string;

  @IsNotEmpty({ message: "التصنيف مطلوب" })
  @IsString()
  category: string;
}
