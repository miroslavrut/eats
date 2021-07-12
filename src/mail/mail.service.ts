import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { MailModuleOptions, SendgridMailOptions } from './mail.interfaces';
import got from 'got';
import {
  FROM_EMAIL,
  FROM_NAME,
  SENDINBLUE_API_URL,
  VERIFICATION_SUBJECT,
} from './mail.constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    sendToEmail: string,
    mailData: SendgridMailOptions,
  ) {
    const body: { [k: string]: any } = {
      sender: {
        email: mailData.fromMail ? mailData.fromMail : FROM_EMAIL,
        name: mailData.fromName ? mailData.fromName : FROM_NAME,
      },
      to: [{ email: sendToEmail }],
      subject,
    };

    if (mailData.content) {
      body.content = mailData.content;
    } else if (mailData.templateId) {
      body.templateId = mailData.templateId;
      body.params = mailData.variables.reduce(
        (obj, item) => Object.assign(obj, { [item.key]: item.value }),
        {},
      );
    }

    try {
      await got(SENDINBLUE_API_URL, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': this.options.apiKey,
        },
        json: body,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    this.sendEmail(VERIFICATION_SUBJECT, email, {
      templateId: 1,
      variables: [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
    });
  }
}
