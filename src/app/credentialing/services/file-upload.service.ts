import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

export interface UploadedFile {
  key: string;
  fileName: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(private readonly http: HttpClient) {}

  uploadToS3(file: File, uploadUrl?: string): Observable<UploadedFile> {
    if (!uploadUrl) {
      return of({
        key: `mock/${Date.now()}-${file.name}`,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      });
    }

    return this.http.put(uploadUrl, file).pipe(
      map(() => ({
        key: `s3/${Date.now()}-${file.name}`,
        fileName: file.name,
        uploadedAt: new Date().toISOString()
      }))
    );
  }
}
