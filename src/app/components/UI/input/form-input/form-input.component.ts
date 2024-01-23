import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: FormInputComponent
  }],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss'
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() type: string = "text";
  @Input() id: string = "";
  @Input() name: string = "";
  @Input() placeholder!: string;
  @Input() label: string = "label";
  @Input() value = "";
  @Input() disabled = false;
  touched = false;  
  
  notifyOnTouched = () => {  }
  onChange(_value?: string) {

  }
  onTouched() {
    console.log(this.touched);
    if (!this.touched) {
      this.touched = true;
      this.notifyOnTouched(); 
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: (_?: string) => void) {
    this.onChange = onChange;
  }
  registerOnTouched(fn: () => void): void {
    this.notifyOnTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
