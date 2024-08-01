import { Injectable } from '@nestjs/common';
import { TERMILL_API_KEY, TERMILL_BASE_URL } from '../../../shared/constants';
import { TermillDataInterface } from '../interface/termill.interface';

@Injectable()
export class TermillProvider {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly from: string;

  constructor() {
    this.apiKey = TERMILL_API_KEY;
    this.baseUrl = TERMILL_BASE_URL;
    this.from = 'AllofHealth';
  }

  provideUrl() {
    return `${this.baseUrl}/api/sms/send`;
  }

  constructBody(data: TermillDataInterface) {
    const body = {
      to: data.to,
      from: this.from,
      sms: data.sms,
      type: 'plain',
      api_key: this.apiKey,
      channel: 'generic',
    };

    return body;
  }
}
