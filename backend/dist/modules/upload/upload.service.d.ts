import { FileDTO } from './upload.dto';
export declare class UploadService {
    upload(file: FileDTO): Promise<{
        data: {
            path: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
}
