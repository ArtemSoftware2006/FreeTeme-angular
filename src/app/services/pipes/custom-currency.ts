import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customCurrencyPipe'})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return `${value} ₽`;
  }
}