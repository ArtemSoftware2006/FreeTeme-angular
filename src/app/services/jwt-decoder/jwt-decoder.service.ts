import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  parse(token: string) : User {
    const parseToken = jwtDecode(token) as any;

    const user : User = {
      login : parseToken?.username,
      role : parseToken?.role,
      email : parseToken?.email,
      id : parseToken?.id
    };

    return user;
  }
}
