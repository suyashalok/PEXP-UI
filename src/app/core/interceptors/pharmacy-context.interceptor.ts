import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PharmacyContextService } from '../services/pharmacy-context.service';

export const pharmacyContextInterceptor: HttpInterceptorFn = (req, next) => {
  const context = inject(PharmacyContextService).getContext();

  if (!context) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Pharmacy-Id': context.pharmacyId,
        'X-NCPDP-Id': context.ncpdp
      }
    })
  );
};
