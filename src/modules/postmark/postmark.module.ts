import { Module } from '@nestjs/common';
import { PostmarkService } from './service/postmark.service';
import { PostmarkDao } from './dao/postmark.dao';

@Module({
  providers: [PostmarkService, PostmarkDao],
  exports: [PostmarkService, PostmarkDao],
})
export class PostmarkModule {}
