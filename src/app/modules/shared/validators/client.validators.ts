import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { phoneValidator } from './phone.validator';
import { prefixPhoneValidator } from './prefixPhone.validator';

// export class ClientValidators {
//   static postcode(): ValidatorFn {
//     return postcodeValidator();
//   }
// }

export class ClientValidators {
  static postcode(control: AbstractControl): ValidationErrors | null {
    const postcodePattern = /^\d{2}-\d{3}$/;
    const value = control.value;

    if (!value || postcodePattern.test(value)) {
      return null;
    }
    return { invalidPostcode: { value } };
  }

  static phoneNumber(control: AbstractControl): ValidationErrors | null {
    const phoneNumberPattern = /^\d{9}$/;
    const value = control.value;
    if (phoneNumberPattern.test(value)) {
      return null;
    }
    return { invalidPhoneNumber: { value } };
  }

  static prefixPhoneNumber(control: AbstractControl): ValidationErrors | null {
    const prefixPhonePattern = /^\d{2}$/;
    const value = control.value;
    const prefixPhoneNumberWithoutPlus = value.replace('+', '');
    if (prefixPhonePattern.test(prefixPhoneNumberWithoutPlus)) {
      return null;
    }
    return { invalidPrefixPhone: { value } };
  }
}
