import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from './knex/knex.provider';

@Injectable()
export class AppService {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex) {}

  async findAll() {
    return this.knex('Users').select('*');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
