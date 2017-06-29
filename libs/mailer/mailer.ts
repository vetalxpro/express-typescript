import { createTransport, Transporter } from 'nodemailer';
import { config } from '../../config';

export const mailer: Transporter = createTransport(config.mailer.yandex);
