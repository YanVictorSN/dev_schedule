"use strict";

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
