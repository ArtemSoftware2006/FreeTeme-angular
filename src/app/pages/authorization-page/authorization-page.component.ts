import { Component } from '@angular/core';
import { LoginFormComponent } from '../../components/form/login-form/login-form.component';

@Component({
  selector: 'app-authorization-page',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './authorization-page.component.html',
  styleUrl: './authorization-page.component.scss'
})
export class AuthorizationPageComponent {

}
