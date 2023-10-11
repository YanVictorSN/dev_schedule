"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const superbase_config_1 = require("../../database/superbase.config");
let ImagesService = class ImagesService {
    async getAllImageUrls() {
        const { data } = await superbase_config_1.default.storage.from('img_bucket').list();
        const listImages = [];
        for (const elemento of data) {
            const { data } = await superbase_config_1.default.storage
                .from('img_bucket')
                .getPublicUrl(elemento.name);
            const imageInfo = {
                name: elemento.name,
                url: data,
            };
            listImages.push(imageInfo);
        }
        const listImagesJSON = JSON.stringify(listImages);
        return listImagesJSON;
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)()
], ImagesService);
//# sourceMappingURL=images.service.js.map