import { Observable } from 'rxjs';

export const toPromise = async <T>(source$: Observable<T>): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    const subscription = source$.subscribe({
      next: (value) => {
        resolve(value);
        subscription.unsubscribe();
      },
      error: (error: unknown) => reject(error)
    });
  });
};
