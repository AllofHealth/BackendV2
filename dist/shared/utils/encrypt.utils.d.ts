interface Encrypt {
    data: string;
    key?: string;
}
export declare function encrypt(args: Encrypt): string;
export declare function decrypt(args: Encrypt): string;
export {};
