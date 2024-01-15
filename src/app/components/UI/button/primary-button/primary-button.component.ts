import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {

  @Input() text: string = 'button'
  @Input() type: string = 'button'
  @Input() name: string = ''
  @Input() id: string = ''
  @Input() disabled: boolean = false
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();      
    }
  }
}
