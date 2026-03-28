import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { CredentialingFormValue, SignatureStatus, WorkflowStatus } from '../models/credentialing.models';

@Injectable({ providedIn: 'root' })
export class CredentialingApiService {
  constructor(private readonly api: ApiService) {}

  loadDraft(pharmacyId: string): Observable<CredentialingFormValue> {
    return this.api.get<CredentialingFormValue>(`/credentialing/${pharmacyId}/draft`);
  }

  saveDraft(payload: CredentialingFormValue): Observable<WorkflowStatus> {
    return this.api.post<CredentialingFormValue, WorkflowStatus>('/credentialing/draft', payload);
  }

  submit(payload: CredentialingFormValue): Observable<WorkflowStatus> {
    return this.api.post<CredentialingFormValue, WorkflowStatus>('/credentialing/submit', payload);
  }

  pollSignatureStatus(workflowId: string): Observable<SignatureStatus> {
    return this.api.get<SignatureStatus>(`/signature/${workflowId}/status`);
  }

  mockPollSignatureStatus(): Observable<SignatureStatus> {
    return of({ envelopeId: 'env-123', status: 'sent', signingUrl: 'https://example.com/sign' });
  }
}
