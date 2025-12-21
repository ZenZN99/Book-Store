import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { LoginDto } from 'src/dtos/user/login.dto';
import { RegisterDto } from 'src/dtos/user/register.dto';
import { AdminGuard } from 'src/middlewares/adminGuard';
import { AuthGuard } from 'src/middlewares/authGuard';
import { UserService } from 'src/services/user.service';
import type { RequestWithUser } from 'src/types/express';

@Controller('/api/auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.userService.login(dto);
  }
  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() req: RequestWithUser) {
    const userId = req.user._id;
    return this.userService.me(userId);
  }
  @Put('profile')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  updateProfile(
    @Req() req: RequestWithUser,
    @UploadedFiles()
    files: { avatar?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const user = req.user;
    return this.userService.updateProfile(user, files);
  }
@Get('users')
@UseGuards(AuthGuard)
getAllUsers(@Req() req: RequestWithUser) {
  return this.userService.getAllUsers(req.user);
}

@Get(':id')
@UseGuards(AuthGuard)
getUserById(@Param('id') id: string, @Req() req: RequestWithUser) {
  return this.userService.getUserById(req.user, id);
}

@Delete(':id')
@UseGuards(AdminGuard)
deleteUserById(@Param('id') id: string, @Req() req: RequestWithUser) {
  return this.userService.deleteUserById(req.user, id);
}

}
