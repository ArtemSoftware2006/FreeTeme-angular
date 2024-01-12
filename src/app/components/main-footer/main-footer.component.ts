import { Component } from '@angular/core';
import { CircleLinkComponent } from '../UI/link/circle-link/circle-link.component';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [CircleLinkComponent],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss'
})
export class MainFooterComponent {

}
