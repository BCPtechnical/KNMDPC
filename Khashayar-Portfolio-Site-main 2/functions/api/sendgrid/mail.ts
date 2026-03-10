import { isValidEmail } from '../../../src/utils/validateEmail';
import {
  Env,
  InvalidEmailError,
} from '../../utils/interfaces';

export const validateFormData = (): boolean => {
  return true;
};

export const createSendgridRequest = (
  requestorEmail: string,
  sendgridApiToken: string,
  senderEmail: string,
  recipientEmail: string,
  message: string,
) => {
  if (!isValidEmail(requestorEmail)) {
    throw new InvalidEmailError();
  }

  return new Request(`https://api.sendgrid.com/v3/mail/send`, {
    method: `POST`,
    headers: {
      Authorization: `Bearer ` + sendgridApiToken,
      'Content-Type': `application/json`,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: recipientEmail,
            },
          ],
          subject: `Contact Form Submission`,
        },
      ],
      content: [
        {
          type: `text/html`,
          value: message,
        },
      ],
      from: {
        email: senderEmail,
      },
      reply_to: {
        email: requestorEmail,
      },
    }),
  });
};

export const sendSendgridRequest = async (request: Request) => {
  const response = await fetch(request);
  return response;
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const contextForm: FormData = await context.request.formData();
    const requestorEmail = contextForm.get(`email`) || ``;
    const sendgridApiToken = context.env.SENDGRID_API_TOKEN;
    const senderEmail = context.env.SENDER_EMAIL;
    const recipientEmail = context.env.RECIPIENT_EMAIL;
    const message = contextForm.get(`message`) || ``;

    // ── 1. Env var checks ──────────────────────────────────────────────────
    if (!sendgridApiToken) {
      console.error(`[mail.ts] SENDGRID_API_TOKEN is not set`);
      return new Response(`SENDGRID_API_TOKEN is not set`, { status: 500 });
    }
    if (!senderEmail) {
      console.error(`[mail.ts] SENDER_EMAIL is not set`);
      return new Response(`SENDER_EMAIL is not set`, { status: 500 });
    }
    if (!recipientEmail) {
      console.error(`[mail.ts] RECIPIENT_EMAIL is not set`);
      return new Response(`RECIPIENT_EMAIL is not set`, { status: 500 });
    }

    // ── 2. Form field checks ───────────────────────────────────────────────
    if (requestorEmail === `` || message === ``) {
      console.error(`[mail.ts] Missing form fields`);
      return new Response(`Missing FormData`, { status: 400 });
    }

    // ── 3. Build and send SendGrid request ────────────────────────────────
    const sendgridRequest = createSendgridRequest(
      requestorEmail as string,
      sendgridApiToken,
      senderEmail,
      recipientEmail,
      message as string,
    );
    const sendgridResponse = await sendSendgridRequest(sendgridRequest);

    // ── 4. Return exact SendGrid error so client can see what went wrong ───
    if (!sendgridResponse.ok) {
      const errorBody = await sendgridResponse.text();
      console.error(`[mail.ts] SendGrid error ${sendgridResponse.status}:`, errorBody);
      return new Response(`SendGrid error: ${sendgridResponse.status} - ${errorBody}`, {
        status: sendgridResponse.status,
      });
    }

    console.log(`[mail.ts] Email sent successfully`);
    return new Response(`OK`, { status: 200 });

  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    console.error(`[mail.ts] Unexpected error:`, errMessage);
    return new Response(`Application Error: ${errMessage}`, { status: 500 });
  }
};
