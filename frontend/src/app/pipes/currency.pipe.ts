import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colombianCurrency'
})
export class ColombianCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '$0';
    
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }
}