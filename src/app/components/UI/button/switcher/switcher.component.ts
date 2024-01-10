import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss'
})
export class SwitcherComponent {
  @Output() onSwitch = new EventEmitter(); 
  
}
