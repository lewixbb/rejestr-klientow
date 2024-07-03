import { AbstractControl, ValidatorFn } from '@angular/forms';

export function prefixPhoneValidator(): ValidatorFn {
  return (
    control: AbstractControl,
  ): { [key: string]: { value: string } } | null => {
    const prefixPhonePattern = /^\d{2}$/;
    const value = control.value;
    const prefixPhoneNumberWithoutPlus = value.replace('+', '');
    const prefixPhoneNumber = prefixPhoneNumberWithoutPlus.slice(0, 2);
    if (prefixPhonePattern.test(prefixPhoneNumber)) {
      return null;
    }
    return { invalidPrefixPhone: { value } };
  };
}
