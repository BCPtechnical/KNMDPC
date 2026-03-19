/* eslint-disable jest/no-mocks-import */
import { server } from '../__mocks__/msw/msw';
import { sendgridHandlers } from '../__mocks__/msw/sendgridMSWHandler';
import {
  createSendgridRequest,
  sendSendgridRequest,
} from '../apis/sendgrid/mail';
import { InvalidEmailError } from '../utils/interfaces';

beforeAll(async () => {
  server.use(...sendgridHandlers);
  server.listen();
});
afterEach(() => {
  jest.clearAllMocks();
});
afterAll(() => {
  server.close();
});

describe(`createSendgridRequest()`, () => {
  it(`creates a valid request to sendgrid with valid static fields`, async () => {
    const requestorEmail = `test@studio.com`;
    const sendgridApiToken = `testAuthToken`;
    const senderEmail = `trey@m-squared.studio`;
    const recipientEmail = `trey@m-squared.studio`;
    const message = `this is a test message for createSendgridRequest`;
    const validRequest = new Request(`https://api.sendgrid.com/v3/mail/send`, {
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
    const validRequestBody: any = await validRequest.json();

    const sendgridRequest = createSendgridRequest(
      requestorEmail,
      sendgridApiToken,
      senderEmail,
      recipientEmail,
      message,
    );
    const sendgridRequestBody: any = await sendgridRequest.json();

    expect(sendgridRequest.method).toEqual(validRequest.method);
    expect(sendgridRequest.headers.get(`Authorization`)).toEqual(
      validRequest.headers.get(`Authorization`),
    );
    expect(sendgridRequest.headers.get(`Content-Type`)).toEqual(
      validRequest.headers.get(`Content-Type`),
    );
    expect(sendgridRequestBody.personalizations).toEqual(
      validRequestBody.personalizations,
    );
    expect(sendgridRequestBody.content[0].type).toEqual(
      validRequestBody.content[0].type,
    );
    expect(sendgridRequestBody.from).toEqual(validRequestBody.from);
  });

  it(`creates a valid request to sendgrid where the reply_to.email is the context.request.json.email
  and the content[0].value is context.request.json.message`, async () => {
    const requestorEmail = `test@studio.com`;
    const requestorEmailB = `test@studio.com`;
    const sendgridApiToken = `testAuthToken`;
    const senderEmail = `trey@m-squared.studio`;
    const recipientEmail = `trey@m-squared.studio`;
    const message = `This is a test message`;

    const sendgridRequestA = createSendgridRequest(
      requestorEmail,
      sendgridApiToken,
      senderEmail,
      recipientEmail,
      message,
    );
    const sendgridRequestB = createSendgridRequest(
      requestorEmailB,
      sendgridApiToken,
      senderEmail,
      recipientEmail,
      message,
    );
    const sendgridRequestBodyA: any = await sendgridRequestA.json();
    const sendgridRequestBodyB: any = await sendgridRequestB.json();

    expect(sendgridRequestBodyA.reply_to.email).toEqual(requestorEmail);
    expect(sendgridRequestBodyA.content[0].value).toEqual(message);

    expect(sendgridRequestBodyB.reply_to.email).toEqual(requestorEmailB);
    expect(sendgridRequestBodyB.content[0].value).toEqual(message);
  });

  it(`should throw an error when the email sent in the context is not structured
  like a valid email.`, () => {
    const requestorEmail = `teststudio.com`;
    const sendgridApiToken = `testAuthToken`;
    const senderEmail = `trey@m-squared.studio`;
    const recipientEmail = `trey@m-squared.studio`;
    const message = `This is a test message`;
    expect(() => {
      createSendgridRequest(
        requestorEmail,
        sendgridApiToken,
        senderEmail,
        recipientEmail,
        message,
      );
    }).toThrow(new InvalidEmailError());
  });
});

describe(`sendSendgridRequest()`, () => {
  it(`shoots out a fetch request to sendgrid w/ a valid constructed request objectn and returns the sendgrid response`, async () => {
    const requestorEmail = `test@studio.com`;
    const sendgridApiToken = `testAuthToken`;
    const senderEmail = `trey@m-squared.studio`;
    const recipientEmail = `trey@m-squared.studio`;
    const message = `This is a test message`;
    const badSenderEmail = `gayboman@gmail.com`;

    const validRequest = new Request(`https://api.sendgrid.com/v3/mail/send`, {
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
    const invalidRequest = new Request(
      `https://api.sendgrid.com/v3/mail/send`,
      {
        method: `POST`,
        headers: {
          Authorization: sendgridApiToken,
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
              type: `text/html/poopy`,
              value: message,
            },
          ],
          from: {
            email: badSenderEmail,
          },
          reply_to: {
            email: requestorEmail,
          },
        }),
      },
    );
    const fetchSpy = jest.spyOn(globalThis, `fetch`);
    const response = await sendSendgridRequest(validRequest);
    const responseB = await sendSendgridRequest(invalidRequest);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(response.status).toEqual(202);
    expect(responseB.status).toEqual(400);
  });
});
