import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  userEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  userEmail: null
};

@Injectable({ providedIn: 'root' })
export class AuthStore extends ComponentStore<AuthState> {
  readonly isAuthenticated$ = this.select((state) => state.isAuthenticated);
  readonly accessToken$ = this.select((state) => state.accessToken);

  readonly setSession = this.updater<Pick<AuthState, 'accessToken' | 'userEmail'>>((state, session) => ({
    ...state,
    isAuthenticated: true,
    ...session
  }));

  readonly clearSession = this.updater((state) => ({
    ...state,
    isAuthenticated: false,
    accessToken: null,
    userEmail: null
  }));

  getAccessTokenSnapshot(): string | null {
    return this.get().accessToken;
  }

  constructor() {
    super(initialState);
  }
}
