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

    // Debug: Check if env vars are set
    if (!sendgridApiToken) {
      return new Response(`Debug: SENDGRID_API_TOKEN is not set`, { status: 500 });
    }
    if (!senderEmail) {
      return new Response(`Debug: SENDER_EMAIL is not set`, { status: 500 });
    }
    if (!recipientEmail) {
      return new Response(`Debug: RECIPIENT_EMAIL is not set`, { status: 500 });
    }

    if (requestorEmail === `` || message === ``) {
      return new Response(`Missing FormData`, { status: 400 });
    }

    const sendgridRequest = createSendgridRequest(
      requestorEmail,
      sendgridApiToken,
      senderEmail,
      recipientEmail,
      message,
    );
    const sendgridResponse = await sendSendgridRequest(sendgridRequest);

    // Debug: If SendGrid returns an error, include the response body
    if (!sendgridResponse.ok) {
      const errorBody = await sendgridResponse.text();
      return new Response(`SendGrid error: ${sendgridResponse.status} - ${errorBody}`, {
        status: sendgridResponse.status,
      });
    }

    return sendgridResponse;
  } catch {
    return new Response(`Application Error.`, { status: 400 });
  }
};
