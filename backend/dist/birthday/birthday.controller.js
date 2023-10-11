"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirthdayController = void 0;
const common_1 = require("@nestjs/common");
const birthday_service_1 = require("./birthday.service");
let BirthdayController = class BirthdayController {
    constructor(birthdayService) {
        this.birthdayService = birthdayService;
    }
    async sendBirthdayGreetings() {
        await this.birthdayService.sendBirthdayGreetings();
        return { message: 'Parabéns enviado com sucesso!' };
    }
};
exports.BirthdayController = BirthdayController;
__decorate([
    (0, common_1.Get)('send-greetings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BirthdayController.prototype, "sendBirthdayGreetings", null);
exports.BirthdayController = BirthdayController = __decorate([
    (0, common_1.Controller)('birthday'),
    __metadata("design:paramtypes", [birthday_service_1.BirthdayService])
], BirthdayController);
//# sourceMappingURL=birthday.controller.js.map