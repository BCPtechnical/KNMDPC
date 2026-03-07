// eslint-disable-next-line import/no-extraneous-dependencies
import { http } from 'msw';
import { isValidEmail } from '../../../src/utils/validateEmail';

export const sendgridHandlers = [
  http.post(`https://api.sendgrid.com/v3/mail/send`, async ({ request }) => {
    const body: any = await request.json();
    if (
      request.headers.get(`Authorization`) === `Bearer testAuthToken` &&
      body.personalizations &&
      body.personalizations[0].to &&
      isValidEmail(body.personalizations[0].to[0].email) &&
      (body.personalizations[0].to[0].email === `trey@m-squared.studio` ||
        body.personalizations[0].to[0].email === `test@studio.com`) &&
      body.personalizations[0].subject &&
      body.content &&
      body.content[0].type === `text/html` &&
      body.content[0].value &&
      body.from &&
      isValidEmail(body.from.email) &&
      body.from.email === `trey@m-squared.studio` &&
      body.reply_to &&
      isValidEmail(body.reply_to.email)
    ) {
      return new Response(null, { status: 202 });
    } else {
      return new Response(null, { status: 400 });
    }
  }),
];
