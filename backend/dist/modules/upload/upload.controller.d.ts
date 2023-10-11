import { UploadService } from './upload.service';
import { FileDTO } from './upload.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: FileDTO): Promise<{
        data: {
            path: string;
        };
        error: null;
    } | {
        data: null;
        error: import("@supabase/storage-js").StorageError;
    }>;
}
