// src/app.config.ts
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MSAL_INSTANCE,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalGuard,
  MsalService,
  MsalBroadcastService,
  MsalInterceptor,
} from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { routes } from './app.routes';
import { msalConfig, loginRequest, API_BASE, API_SCOPES } from '../configs/auth-config';

// ---- MSAL factories ----
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest,
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // Attach tokens with your custom scope when calling your API
  protectedResourceMap.set(`${API_BASE}/*`, API_SCOPES);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

// ---- AppConfig ----
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    // Router (blocking initial navigation is recommended with MSAL guards)
    provideRouter(routes, withEnabledBlockingInitialNavigation()),

    // (Keep your hydration setup)
    provideClientHydration(withEventReplay()),

    // HttpClient + DI-based interceptors (required for MsalInterceptor)
    provideHttpClient(withInterceptorsFromDi()),

    // MSAL
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
