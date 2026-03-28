# PEXP-UI (Angular 17 Enterprise Scaffold)

Production-oriented frontend scaffold for a PBM pharmacy onboarding and credentialing platform.

## Architecture Highlights

- **Standalone-first Angular 17** with lazy loaded route-level pages.
- **Domain-driven organization**: `auth/`, `dashboard/`, `credentialing/`, `core/`, `shared/`.
- **Custom stepper form engine** for a dynamic 45+ step credentialing workflow.
- **Component Store-based state management** for auth, dashboard, and credentialing flows.
- **HTTP interceptors** for Okta bearer token and pharmacy context headers (NCPDP/pharmacy ID).
- **Workflow resilience** via save/resume + e-signature status polling.

## Folder Structure

```txt
src/app
├── auth
├── core
├── credentialing
├── dashboard
└── shared
```

## Critical Extension Points

- Replace `OktaAuthService` placeholders with `@okta/okta-angular` SDK wiring.
- Extend `credentialing/steps/*` by adding new standalone step components and step config entries.
- Connect `CredentialingApiService` and `FileUploadService` to real backend pre-signed URL endpoints.
- Expand role management under `core/services/user-management.service.ts`.

## Commands

```bash
npm install
npm run start
npm run build
npm run typecheck
```
