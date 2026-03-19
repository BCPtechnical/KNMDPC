/* eslint-disable jest/no-mocks-import */
import { server } from '../__mocks__/msw/msw';
import { sendgridHandlers } from '../__mocks__/msw/sendgridMSWHandler';
import { onRequestPost } from '../apis/sendgrid/mail';

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

const formDataMap = new Map<string, string>();
formDataMap.set(`email`, `trey@m-squared.studio`);
formDataMap.set(`message`, `Heya!`);

const context: any = {
  env: {
    SENDGRID_API_TOKEN: `testAuthToken`,
    SENDER_EMAIL: `trey@m-squared.studio`,
    RECIPIENT_EMAIL: `trey@m-squared.studio`,
  },
  request: {
    formData: async () => {
      return formDataMap;
    },
    headers: {
      has: (key: string) => {
        return key === `Authorization` || key === `Content-Type`;
      },
    },
  },
};

const invalidFormDataMap = new Map<string, string>();

const invalidFormContext: any = {
  env: {
    SENDGRID_API_TOKEN: `apitoken`,
    SENDER_EMAIL: `trey@m-squared.studio`,
    RECIPIENT_EMAIL: `trey@m-squared.studio`,
  },
  request: {
    formData: async () => {
      return invalidFormDataMap;
    },
    headers: {
      has: (key: string) => {
        return key === `Authorization` || key === `Content-Type`;
      },
    },
  },
};

const invalidEmailContextFormDataMap = new Map<string, string>();
invalidEmailContextFormDataMap.set(`email`, `testEmail`);
invalidEmailContextFormDataMap.set(`message`, `Heya!`);

const invalidEmailContext: any = {
  env: {
    SENDGRID_API_TOKEN: `testAuthToken`,
    SENDER_EMAIL: `trey@m-squared.studio`,
    RECIPIENT_EMAIL: `trey@m-squared.studio`,
  },
  request: {
    formData: async () => {
      return invalidEmailContextFormDataMap;
    },
    headers: {
      has: (key: string) => {
        return key === `Authorization` || key === `Content-Type`;
      },
    },
  },
};

const invalidSendgridKeyFormDataMap = new Map<string, string>();
invalidSendgridKeyFormDataMap.set(`email`, `checkup@studio.com`);
invalidSendgridKeyFormDataMap.set(`message`, `Heya!`);

const invalidSendgridKeyContext: any = {
  env: {
    SENDGRID_API_TOKEN: `apitoken`,
    SENDER_EMAIL: `trey@m-squared.studio`,
    RECIPIENT_EMAIL: `trey@m-squared.studio`,
  },
  request: {
    formData: async () => {
      return invalidSendgridKeyFormDataMap;
    },
    headers: {
      has: (key: string) => {
        return key === `Authorization` || key === `Content-Type`;
      },
    },
  },
};

describe(`/mail`, () => {
  it(`should check if form data exists, then send a sendgrid sendMail request which forwards mail to trey@m-squared.studio and return a 202`, async () => {
    const mockModule = await import(`../apis/sendgrid/mail`);
    const createSendgridRequestSpy = jest.spyOn(
      mockModule,
      `createSendgridRequest`,
    );
    const sendSendgridRequestSpy = jest.spyOn(
      mockModule,
      `sendSendgridRequest`,
    );
    const response = await onRequestPost(context);
    const contextForm = await context.request.formData();

    expect(createSendgridRequestSpy).toHaveBeenCalled();
    expect(createSendgridRequestSpy).toHaveBeenCalledWith(
      contextForm.get(`email`),
      context.env.SENDGRID_API_TOKEN,
      context.env.SENDER_EMAIL,
      context.env.RECIPIENT_EMAIL,
      contextForm.get(`message`),
    );

    expect(sendSendgridRequestSpy).toHaveBeenCalled();
    expect(sendSendgridRequestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: `POST`,
      }),
    );

    expect(response.status).toStrictEqual(202);
  });

  it(`should throw a bad client response when the context does not have email or message`, async () => {
    const mockModule = await import(`../apis/sendgrid/mail`);
    const createSendgridRequestSpy = jest.spyOn(
      mockModule,
      `createSendgridRequest`,
    );
    const sendSendgridRequestSpy = jest.spyOn(
      mockModule,
      `sendSendgridRequest`,
    );

    const response = await onRequestPost(invalidFormContext);

    expect(createSendgridRequestSpy).toHaveBeenCalledTimes(0);
    expect(sendSendgridRequestSpy).toHaveBeenCalledTimes(0);
    expect(response.status).toEqual(400);
  });

  it(`should throw a bad client response when the context has an invalid email`, async () => {
    const mockModule = await import(`../apis/sendgrid/mail`);
    const createSendgridRequestSpy = jest.spyOn(
      mockModule,
      `createSendgridRequest`,
    );
    const sendSendgridRequestSpy = jest.spyOn(
      mockModule,
      `sendSendgridRequest`,
    );
    const contextForm = await invalidEmailContext.request.formData();
    const response = await onRequestPost(invalidEmailContext);
    expect(createSendgridRequestSpy).toHaveBeenCalled();
    expect(createSendgridRequestSpy).toHaveBeenCalledWith(
      contextForm.get(`email`),
      invalidEmailContext.env.SENDGRID_API_TOKEN,
      invalidEmailContext.env.SENDER_EMAIL,
      invalidEmailContext.env.RECIPIENT_EMAIL,
      contextForm.get(`message`),
    );
    expect(sendSendgridRequestSpy).toHaveBeenCalledTimes(0);
    expect(response.status).toEqual(400);
  });

  it(`should throw a bad client response when the sendgrid request fails`, async () => {
    const mockModule = await import(`../apis/sendgrid/mail`);
    const createSendgridRequestSpy = jest.spyOn(
      mockModule,
      `createSendgridRequest`,
    );
    const sendSendgridRequestSpy = jest.spyOn(
      mockModule,
      `sendSendgridRequest`,
    );
    const contextForm = await invalidSendgridKeyContext.request.formData();
    const response = await onRequestPost(invalidSendgridKeyContext);
    expect(createSendgridRequestSpy).toHaveBeenCalled();
    expect(createSendgridRequestSpy).toHaveBeenCalledWith(
      contextForm.get(`email`),
      invalidSendgridKeyContext.env.SENDGRID_API_TOKEN,
      invalidSendgridKeyContext.env.SENDER_EMAIL,
      invalidSendgridKeyContext.env.RECIPIENT_EMAIL,
      contextForm.get(`message`),
    );
    expect(sendSendgridRequestSpy).toHaveBeenCalled();
    expect(response.status).toEqual(400);
  });
});
