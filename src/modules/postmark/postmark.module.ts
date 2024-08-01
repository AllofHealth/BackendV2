import { Module } from '@nestjs/common';
import { PostmarkService } from './postmark.service';

@Module({
  providers: [PostmarkService]
})
export class PostmarkModule {}
