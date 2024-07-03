import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: { phoneValue: string } } | null => {
    const value = control.value;
    const phoneValue = value.slice(2);
    const validPhoneNumber = /^\d{6}$/;
    if (validPhoneNumber.test(phoneValue)) {
      return null;
    }
    return { invalidPhoneNumber: { phoneValue } };
  };
}
