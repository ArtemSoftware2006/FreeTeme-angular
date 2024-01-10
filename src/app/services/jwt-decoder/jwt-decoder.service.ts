import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  parse(token: string) : IUser {
    let parseToken = jwtDecode(token) as any;

    const user : IUser = {
      login : parseToken?.username,
      role : parseToken?.role,
      email : parseToken?.email,
      id : parseToken?.id
    };

    return user;
  }
}
