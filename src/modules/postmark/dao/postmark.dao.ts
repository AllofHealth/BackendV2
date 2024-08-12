import { POSTMARK_SERVER_TOKEN } from '@/shared/constants';
import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';

@Injectable()
export class PostmarkDao {
  provideClient() {
    const client = new ServerClient(POSTMARK_SERVER_TOKEN);
    return client;
  }

  async fetchTemplates() {
    const client = this.provideClient();
    return await client.getTemplates();
  }
}
