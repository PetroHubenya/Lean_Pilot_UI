/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
} from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: '66b2ab4e-f061-4510-b702-28349e07df4a', // This is the ONLY mandatory field that you need to supply.
    authority: 'https://LeanPilotEntra.ciamlogin.com/', // Replace the placeholder with your tenant subdomain
    redirectUri: 'https://localhost:4200', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
    postLogoutRedirectUri: 'https://localhost:4200', // Points to window.location.origin by default.
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://learn.microsoft.com/entra/identity-platform/permissions-consent-overview#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [],
};

// Your API scope from “API permissions” (screenshot):
export const API_SCOPES = [
  'api://06853923-a8d5-4e38-a4bc-79d4ea8a5c67/ReadAndWrite',
];

// If you know your API base URL, set it here (adjust if different):
export const API_BASE = 'https://localhost:5001';