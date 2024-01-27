import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { catchError, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const DEFAULT_AVATAR = `
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
`;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private restService : RestService) { }

  getAvatat(userId : number) {

    const headers = new HttpHeaders();

    return this.restService.restGET("/Photo/LoadAvatar", { userId: userId }, {headers : headers, responseType: 'blob'})
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  setAvatar(userId: number, avatarFile: File) {
    const formData = new FormData();
    formData.append('avatar', avatarFile, );

    const headers = new HttpHeaders();

    return this.restService.restPOST("/Photo/UploadAvatar",  null, 
    {
      body : formData, 
      params : { userId: userId },
      headers : headers
    })
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  public getDefaultAvatar() {
    const blob = new Blob([DEFAULT_AVATAR], {type : "image/svg+xml"});
    const avatar = new File([blob], "avatar.svg");

    return avatar;
  }

  public getDefaultAvatarUrl() {
    return 'data:image/svg+xml;base64,' + btoa(DEFAULT_AVATAR);
  }
}
