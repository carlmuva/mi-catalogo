import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appForbiddenName]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ForbiddenNameDirective, multi: true }]
})
export class ForbiddenNameDirective implements Validator {

  @Input('appForbiddenName') forbiddenName: string;
  constructor() { }

  validate(control: AbstractControl): { [key: string]: any } {
    return this.forbiddenName ? this.forbiddenNameValidator(new RegExp(this.forbiddenName, "i"))(control) : null;
  }
  

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    }
  }
}
