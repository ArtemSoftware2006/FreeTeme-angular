import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const priceRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if (control instanceof FormGroup) {
    const minPrice = control.get('minPrice');
    const maxPrice = control.get('maxPrice');

    return minPrice && maxPrice && Number(minPrice.value) > Number(maxPrice.value) ? { 'priceRange': true } : null;
  }
  return null;
};