export interface Env {
  SENDGRID_API_TOKEN: string;
  SENDER_EMAIL: string;
  RECIPIENT_EMAIL: string;
}

export class InvalidEmailError extends Error {
  constructor() {
    super();
    this.name = `InvalidEmailError`;
  }
}
