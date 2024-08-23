import { ServerClient } from 'postmark';
import { AuthConfiguration } from '@/shared/config/auth.configuration';
export declare class PostmarkDao {
    private readonly config;
    constructor(config: AuthConfiguration);
    provideClient(): ServerClient;
    fetchTemplates(): Promise<import("postmark/dist/client/models").Templates>;
}
