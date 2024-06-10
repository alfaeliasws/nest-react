import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { HeadlinerModule } from './headliner/headliner.module';

@Module({
  imports: [CommonModule, AdminModule, HeadlinerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
