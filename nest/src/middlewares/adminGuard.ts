import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from "./authGuard"; 
import { Request } from 'express';

@Injectable()
export class AdminGuard extends AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    await super.canActivate(context);

    const req = context.switchToHttp().getRequest<Request>();
    const user = req['user'];

    if (!user) {
      throw new ForbiddenException('المستخدم غير موجود');
    }

    if (user.role !== 'Admin') {
      throw new ForbiddenException('ممنوع: المسؤولين فقط');
    }

    return true;
  }
}
