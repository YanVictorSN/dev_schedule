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
exports.BirthdayService = void 0;
const common_1 = require("@nestjs/common");
const sgMail = require("@sendgrid/mail");
const superbase_config_1 = require("../database/superbase.config");
const dotenv = require("dotenv");
dotenv.config();
let BirthdayService = class BirthdayService {
    constructor() { }
    async sendBirthdayGreetings() {
        const today = new Date();
        const { data, error } = await superbase_config_1.default
            .from('people')
            .select()
            .eq('birthdate', today.toISOString().split('T')[0]);
        if (error) {
            throw new Error(error.message);
        }
        if (data && data.length > 0) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            for (const person of data) {
                const msg = {
                    to: person.email,
                    from: process.env.SENDGRID_SENDER_EMAIL,
                    subject: 'Feliz Aniversário!',
                    text: `Feliz aniversário, ${person.name}`,
                };
                try {
                    await sgMail.send(msg);
                    console.log(`E-mail enviado com sucesso para ${person.name}`);
                }
                catch (error) {
                    console.error(`Erro ao enviar e-mail para ${person.name}:`, error);
                }
            }
        }
    }
};
exports.BirthdayService = BirthdayService;
exports.BirthdayService = BirthdayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BirthdayService);
//# sourceMappingURL=birthday.service.js.map