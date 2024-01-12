import { Component } from '@angular/core';
import { DealCreateFormComponent } from '../../components/form/deal-create-form/deal-create-form.component';

@Component({
  selector: 'app-deal-create-page',
  standalone: true,
  imports: [DealCreateFormComponent],
  templateUrl: './deal-create-page.component.html',
  styleUrl: './deal-create-page.component.scss'
})
export class DealCreatePageComponent {

}
