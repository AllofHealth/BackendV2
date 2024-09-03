import { TermillDataInterface } from '../interface/termill.interface';
export declare class TermillProvider {
    private readonly baseUrl;
    private readonly apiKey;
    private readonly from;
    constructor();
    provideUrl(): string;
    constructBody(data: TermillDataInterface): {
        to: string;
        from: string;
        sms: string;
        type: string;
        api_key: string;
        channel: string;
    };
}
