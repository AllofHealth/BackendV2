import { ServerClient } from 'postmark';
export declare class PostmarkDao {
    provideClient(): ServerClient;
    fetchTemplates(): Promise<import("postmark/dist/client/models").Templates>;
}
