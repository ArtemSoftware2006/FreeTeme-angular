import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormInputComponent } from './../../UI/input/form-input/form-input.component';
import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../../UI/button/primary-button/primary-button.component';

@Component({
  selector: 'app-deal-create-form',
  standalone: true,
  imports: [FormInputComponent, ReactiveFormsModule, PrimaryButtonComponent],
  templateUrl: './deal-create-form.component.html',
  styleUrl: './deal-create-form.component.scss'
})
export class DealCreateFormComponent {
  dealCreateForm! : FormGroup
  constructor (public builder : FormBuilder) {
  
  }

  ngOnInit(): void {
    this.dealCreateForm = this.builder.nonNullable.group({
      title : new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(3)]),
      description : new FormControl('', [Validators.required, Validators.maxLength(2000), Validators.minLength(3)]),
      minPrice : new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)]),
      maxPrice : new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000000)]),
      location : new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(3)]),
      date : new FormControl('', [Validators.required, Validators.maxLength(255), Validators.minLength(3)]),
    });
    
  }
}
