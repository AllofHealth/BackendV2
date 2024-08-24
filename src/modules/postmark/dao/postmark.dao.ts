import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';
import { AuthConfiguration } from '@/shared/config/auth.configuration';
import { POSTMARK_SERVER_TOKEN } from '@/shared/constants';

@Injectable()
export class PostmarkDao {
  constructor(private readonly config: AuthConfiguration) {}
  provideClient() {
    const client = new ServerClient(POSTMARK_SERVER_TOKEN);
    return client;
  }

  async fetchTemplates() {
    const client = this.provideClient();
    return await client.getTemplates();
  }
}
