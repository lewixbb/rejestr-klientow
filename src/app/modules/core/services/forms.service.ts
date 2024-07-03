import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'Musisz wpisac jakas wartosc';
    }

    if (control.hasError('invalidPostcode')) {
      return 'Kod pocztowy musi być w formacie xx-xxx';
    }

    if (control.hasError('minlength')) {
      return 'Wartosc jest za krótka';
    }

    if (control.hasError('maxlength')) {
      return 'Wartosc jest zbyt dluga';
    }

    if (control.hasError('invalidPhoneNumber')) {
      return 'Nieprawidłowy nr telefonu, nr powinien miec 9 cyfr';
    }

    if (control.hasError('invalidPrefixPhone')) {
      return 'Zły prefix';
    }

    return control.hasError('email') ? 'Nieprawidlowy adress email' : '';
  }
}
