import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { MatchPassword } from './match-password.decorator';

export class RegisterDto {
  @IsNotEmpty({ message: 'الاسم الكامل مطلوب' })
  fullname: string;

  @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
  @IsEmail({}, { message: 'عنوان البريد الإلكتروني غير صالح' })
  email: string;

  @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
  @MinLength(8, { message: 'يجب أن تكون كلمة المرور من 8 أحرف على الأقل' })
  password: string;

  @IsNotEmpty({ message: 'تأكيد كلمة المرور مطلوب' })
  @MatchPassword('password', {
    message: 'كلمة المرور وتأكيدها غير متطابقين',
  })
  confirmPassword: string;
}
