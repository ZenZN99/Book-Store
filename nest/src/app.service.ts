import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloNest(): string {
    return 'Hello Nest!';
  }
}
