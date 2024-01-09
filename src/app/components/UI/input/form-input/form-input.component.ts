import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [NgIf],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FormInputComponent
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: FormInputComponent
  }],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent implements ControlValueAccessor, Validator {
  @Input() type: string = "text";
  @Input() id: string = "";
  @Input() name: string = "";
  @Input() placeholder!: string;
  @Input() label: string = "label";
  @Input() value = "";
  @Input() disabled = false;
  touched = false;
  errors: ValidationErrors | null = null;
  
  
  notifyOnTouched = () => {  }
  onChange(_value?: Event) {

  }
  onTouched = () => {

    if (!this.touched) {
      this.touched = true;
      this.notifyOnTouched(); 
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: (_?: Event) => void) {
    this.onChange = onChange;
  }
  registerOnTouched(fn: any): void {
    this.notifyOnTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log("Validate " + control.errors)
    if (this.touched) {
      console.log(control.errors)
      this.errors = control.errors
    }
    return null;
  }
}
