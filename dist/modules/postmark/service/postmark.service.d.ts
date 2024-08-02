import { PostmarkDao } from '../dao/postmark.dao';
import { PostMarkEmail } from '../interface/postmark.interface';
export declare class PostmarkService {
    private readonly postmarkDao;
    constructor(postmarkDao: PostmarkDao);
    sendEmail(args: PostMarkEmail): Promise<{
        success: number;
        message: string;
    }>;
}
