import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class AppService {
  constructor(@InjectQueue('demo') private queue: Queue) {}
  getHello(): string {
    this.queue.add('trong', { ok: 'lalral' });
    return 'Hello World!';
  }
}
