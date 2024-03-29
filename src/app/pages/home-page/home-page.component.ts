import { Component } from '@angular/core';
import { ProfileEditFormComponent } from '../../components/form/profile-edit-form/profile-edit-form.component';
import { ProposalCreaeteFormComponent } from '../../components/form/proposal-creaete-form/proposal-creaete-form.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProfileEditFormComponent, ProposalCreaeteFormComponent, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(public router : Router) { }
  createBtnClick() {
    this.router.navigate(['/deal-create']);
  }
}
