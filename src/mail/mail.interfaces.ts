export interface MailModuleOptions {
  apiKey: string;
  fromMail?: string;
  fromName?: string;
}

export interface SendgridMailOptions {
  content?: string;
  templateId?: number;
  variables?: MailVariable[];
  fromMail?: string;
  fromName?: string;
}

export interface MailVariable {
  key: string;
  value: string;
}
