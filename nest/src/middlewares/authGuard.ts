import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import User from 'src/models/User';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('غير مصرح لك بالوصول');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded:any = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      );

      const user = await User.findById(decoded._id);
      if (!user) {
        throw new NotFoundException('المستخدم غير موجود');
      }

      req['user'] = user;
      return true;
    } catch {
      throw new UnauthorizedException('توكن غير صالح');
    }
  }
}
