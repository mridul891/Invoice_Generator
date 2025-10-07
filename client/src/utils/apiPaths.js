export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    LOGIN: `/api/auth/login`,
    REGISTER: `/api/auth/register`,
    GET_PROFILE: `/api/auth/me`,
    UPDATE_PROFILE: `/api/auth/update-profile`,
    UPDATE_PASSWORD: `/api/auth/update-password`,
    FORGOT_PASSWORD: `/api/auth/forget`,
  },
  INVOICE: {
    CREATE_INVOICE: `/api/invoice/create`,
    GET_INVOICES: `/api/invoice/`,
    GET_INVOICE_BY_ID: (id) => `/api/invoice/${id}`,
    UPDATE_INVOICE: (id) => `/api/invoice/${id}`,
    DELETE_INVOICE: (id) => `/api/invoice/${id}`,
  },
  AI: {
    PARSE_TEXT: `/api/ai/parse-text`,
    GENERATE_REMINDER: `/api/ai/generate-reminder`,
    GET_DASHBOARD_SUMMARY: `/api/ai/dashboard-summary`,
  },
};
