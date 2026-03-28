import { FormGroup } from '@angular/forms';

export type StepId = 'businessInfo' | 'licenseUpload' | 'reviewSubmit';

export interface CredentialingStepConfig {
  id: StepId;
  title: string;
  description: string;
  isVisible: (formValue: CredentialingFormValue) => boolean;
}

export interface CredentialingFormValue {
  legalBusinessName: string;
  ncpdp: string;
  deaLicense: string;
  hasOutOfStateDispensing: boolean;
  attachments: Array<{ key: string; fileName: string; uploadedAt: string }>;
}

export interface StepComponentContract {
  form: FormGroup;
  canProceed(): boolean;
}

export interface WorkflowStatus {
  workflowId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'e_sign_pending' | 'completed';
  lastSavedAt: string | null;
}

export interface SignatureStatus {
  envelopeId: string;
  status: 'created' | 'sent' | 'delivered' | 'completed' | 'declined';
  signingUrl?: string;
}
