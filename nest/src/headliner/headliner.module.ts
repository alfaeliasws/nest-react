import { Module } from '@nestjs/common';
import { HeadlinerService } from './headliner.service';
import { HeadlinerController } from './headliner.controller';

@Module({
  providers: [HeadlinerService],
  controllers: [HeadlinerController],
})
export class HeadlinerModule {}
