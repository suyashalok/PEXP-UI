import { Injectable } from '@angular/core';
import { Observable, timer, switchMap, takeWhile } from 'rxjs';
import { CredentialingApiService } from './credentialing-api.service';
import { SignatureStatus } from '../models/credentialing.models';

@Injectable({ providedIn: 'root' })
export class SignaturePollingService {
  constructor(private readonly api: CredentialingApiService) {}

  start(workflowId: string): Observable<SignatureStatus> {
    return timer(0, 10000).pipe(
      switchMap(() => this.api.pollSignatureStatus(workflowId)),
      takeWhile((status) => status.status !== 'completed', true)
    );
  }
}
