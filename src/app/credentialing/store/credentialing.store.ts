import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { combineLatest, switchMap, tap } from 'rxjs';
import { CredentialingApiService } from '../services/credentialing-api.service';
import { SignaturePollingService } from '../services/signature-polling.service';
import { CredentialingFormValue, WorkflowStatus } from '../models/credentialing.models';

export interface CredentialingState {
  loading: boolean;
  saving: boolean;
  submitting: boolean;
  currentStepIndex: number;
  formValue: CredentialingFormValue;
  workflowStatus: WorkflowStatus | null;
  signatureStatusLabel: string;
  error: string | null;
}

const initialState: CredentialingState = {
  loading: false,
  saving: false,
  submitting: false,
  currentStepIndex: 0,
  formValue: {
    legalBusinessName: '',
    ncpdp: '',
    deaLicense: '',
    hasOutOfStateDispensing: false,
    attachments: []
  },
  workflowStatus: null,
  signatureStatusLabel: 'Not started',
  error: null
};

@Injectable()
export class CredentialingStore extends ComponentStore<CredentialingState> {
  readonly vm$ = combineLatest({
    loading: this.select((s) => s.loading),
    saving: this.select((s) => s.saving),
    submitting: this.select((s) => s.submitting),
    stepIndex: this.select((s) => s.currentStepIndex),
    formValue: this.select((s) => s.formValue),
    workflowStatus: this.select((s) => s.workflowStatus),
    signatureStatusLabel: this.select((s) => s.signatureStatusLabel),
    error: this.select((s) => s.error)
  });

  readonly setFormValue = this.updater<CredentialingFormValue>((state, formValue) => ({
    ...state,
    formValue,
    error: null
  }));

  readonly setCurrentStep = this.updater<number>((state, currentStepIndex) => ({
    ...state,
    currentStepIndex
  }));

  readonly nextStep = this.updater((state) => ({ ...state, currentStepIndex: state.currentStepIndex + 1 }));
  readonly previousStep = this.updater((state) => ({ ...state, currentStepIndex: Math.max(0, state.currentStepIndex - 1) }));

  readonly saveDraft = this.effect<CredentialingFormValue>((formValue$) =>
    formValue$.pipe(
      tap(() => this.patchState({ saving: true, error: null })),
      switchMap((formValue) =>
        this.api.saveDraft(formValue).pipe(
          tap({
            next: (workflowStatus) => this.patchState({ workflowStatus, saving: false }),
            error: () => this.patchState({ saving: false, error: 'Failed to save draft.' })
          })
        )
      )
    )
  );

  readonly submit = this.effect<CredentialingFormValue>((payload$) =>
    payload$.pipe(
      tap(() => this.patchState({ submitting: true, error: null })),
      switchMap((payload) =>
        this.api.submit(payload).pipe(
          tap({
            next: (workflowStatus) => {
              this.patchState({ workflowStatus, submitting: false });
              this.trackSignature(workflowStatus.workflowId);
            },
            error: () => this.patchState({ submitting: false, error: 'Submission failed.' })
          })
        )
      )
    )
  );

  readonly loadDraft = this.effect<string>((pharmacyId$) =>
    pharmacyId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((pharmacyId) =>
        this.api.loadDraft(pharmacyId).pipe(
          tap({
            next: (formValue) => this.patchState({ formValue, loading: false }),
            error: () => this.patchState({ loading: false, error: 'Unable to resume draft.' })
          })
        )
      )
    )
  );

  readonly trackSignature = this.effect<string>((workflowId$) =>
    workflowId$.pipe(
      switchMap((workflowId) =>
        this.signaturePolling.start(workflowId).pipe(
          tap((status) => {
            this.patchState({ signatureStatusLabel: `Envelope ${status.status}` });
          })
        )
      )
    )
  );

  constructor(
    private readonly api: CredentialingApiService,
    private readonly signaturePolling: SignaturePollingService
  ) {
    super(initialState);
  }
}
