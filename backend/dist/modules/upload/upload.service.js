"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const superbase_config_1 = require("../../database/superbase.config");
const sharp = require('sharp');
let UploadService = class UploadService {
    async upload(file) {
        if (!file || !file.originalname || !file.buffer) {
            throw new Error('Invalid file object');
        }
        const resizedImageBuffer = await sharp(file.buffer)
            .resize({ width: 50, height: 50, fit: 'cover' })
            .toBuffer();
        console.log(resizedImageBuffer);
        const data = await superbase_config_1.default.storage
            .from('img_bucket')
            .upload(file.originalname, resizedImageBuffer, {
            upsert: true,
        });
        console.log(data);
        return data;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map