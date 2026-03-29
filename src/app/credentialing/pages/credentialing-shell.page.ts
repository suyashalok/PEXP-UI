import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CredPackStepperWrapperComponent } from '../components/stepper/cred-pack-stepper-wrapper.component';
import { CredentialingStore } from '../store/credentialing.store';
import { CredentialingStepConfig, CredentialingFormValue } from '../models/credentialing.models';
import {
  BusinessInfoStepComponent,
  BusinessInfoStepForm
} from '../steps/business-info/business-info-step.component';
import {
  LicenseUploadStepComponent,
  LicenseUploadStepForm
} from '../steps/license-upload/license-upload-step.component';
import { ReviewSubmitStepComponent } from '../steps/review-submit/review-submit-step.component';
import { FileUploadService, UploadedFile } from '../services/file-upload.service';

interface CredentialingMasterForm {
  businessInfo: FormGroup<BusinessInfoStepForm>;
  licenseUpload: FormGroup<LicenseUploadStepForm>;
  review: FormGroup;
}

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CredPackStepperWrapperComponent,
    BusinessInfoStepComponent,
    LicenseUploadStepComponent,
    ReviewSubmitStepComponent
  ],
  template: `
    @if (store.vm$ | async; as vm) {
      @if (vm.loading) {
        <mat-spinner diameter="38"></mat-spinner>
      } @else {
        <pbm-cred-pack-stepper-wrapper [totalSteps]="45"
          [steps]="visibleSteps()"
          [activeIndex]="vm.stepIndex"
          (next)="onNext(vm.stepIndex)"
          (previous)="store.previousStep()"
          (save)="onSave()"
        >
          @switch (visibleSteps()[vm.stepIndex]?.id) {
            @case ('businessInfo') {
              <pbm-business-info-step [form]="masterForm.controls.businessInfo"></pbm-business-info-step>
            }
            @case ('licenseUpload') {
              <pbm-license-upload-step
                [form]="masterForm.controls.licenseUpload"
                [attachments]="attachments()"
                (uploadFile)="onUploadFile($event)"
              ></pbm-license-upload-step>
            }
            @default {
              <pbm-review-submit-step [form]="masterForm.controls.review" [summary]="toPayload()"></pbm-review-submit-step>
            }
          }
        </pbm-cred-pack-stepper-wrapper>

        <p><strong>Status:</strong> {{ vm.workflowStatus?.status ?? 'draft' }}</p>
        <p><strong>E-signature:</strong> {{ vm.signatureStatusLabel }}</p>
      }
    }
  `,
  providers: [CredentialingStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialingShellPage {
  protected readonly store = inject(CredentialingStore);
  private readonly fileUploadService = inject(FileUploadService);

  protected readonly attachments = signal<UploadedFile[]>([]);

  protected readonly stepConfig: CredentialingStepConfig[] = [
    {
      id: 'businessInfo',
      title: 'Business Info',
      description: 'Capture legal identifiers for the pharmacy.',
      isVisible: () => true
    },
    {
      id: 'licenseUpload',
      title: 'License & Documents',
      description: 'Upload DEA and state documentation.',
      isVisible: () => true
    },
    {
      id: 'reviewSubmit',
      title: 'Review & Submit',
      description: 'Finalize and submit for e-signature.',
      isVisible: (formValue) => !!formValue.legalBusinessName && !!formValue.ncpdp
    }
  ];

  protected readonly masterForm = new FormGroup<CredentialingMasterForm>({
    businessInfo: BusinessInfoStepComponent.createForm(),
    licenseUpload: LicenseUploadStepComponent.createForm(),
    review: new FormGroup({})
  });

  protected readonly visibleSteps = computed(() =>
    this.stepConfig.filter((step) => step.isVisible(this.toPayload()))
  );

  constructor() {
    this.store.loadDraft('pharmacy-001');
  }

  protected onNext(stepIndex: number): void {
    const activeStepId = this.visibleSteps()[stepIndex]?.id;
    const canContinue = this.validateCurrentStep(activeStepId);

    if (!canContinue) {
      return;
    }

    const isLast = stepIndex === this.visibleSteps().length - 1;
    if (isLast) {
      this.store.submit(this.toPayload());
      return;
    }

    this.store.nextStep();
  }

  protected onSave(): void {
    this.store.saveDraft(this.toPayload());
  }

  protected onUploadFile(file: File): void {
    this.fileUploadService.uploadToS3(file).subscribe((result) => {
      this.attachments.update((current) => [...current, result]);
    });
  }

  protected toPayload(): CredentialingFormValue {
    return {
      ...this.masterForm.controls.businessInfo.getRawValue(),
      ...this.masterForm.controls.licenseUpload.getRawValue(),
      attachments: this.attachments()
    };
  }

  private validateCurrentStep(stepId: string | undefined): boolean {
    if (stepId === 'businessInfo') {
      this.masterForm.controls.businessInfo.markAllAsTouched();
      return this.masterForm.controls.businessInfo.valid;
    }

    if (stepId === 'licenseUpload') {
      this.masterForm.controls.licenseUpload.markAllAsTouched();
      return this.masterForm.controls.licenseUpload.valid && this.attachments().length > 0;
    }

    return true;
  }
}
