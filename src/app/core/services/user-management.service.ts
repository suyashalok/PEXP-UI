import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface InviteUserRequest {
  email: string;
  role: 'admin' | 'analyst' | 'pharmacy_user';
}

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  constructor(private readonly api: ApiService) {}

  inviteUser(payload: InviteUserRequest): Observable<void> {
    return this.api.post<InviteUserRequest, void>('/users/invite', payload);
  }
}
