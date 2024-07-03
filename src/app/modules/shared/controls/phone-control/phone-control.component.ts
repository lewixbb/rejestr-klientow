import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { combineLatest, Subscription } from 'rxjs';
import { FormsService } from '../../../core/services/forms.service';
import { ClientValidators } from '../../validators/client.validators';

@Component({
  selector: 'app-phone-control',
  templateUrl: './phone-control.component.html',
  styleUrls: ['./phone-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneControlComponent,
      multi: true,
    },
  ],
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  prefixControl = new FormControl('', [
    Validators.required,
    ClientValidators.prefixPhoneNumber,
  ]);
  phoneNumberControl = new FormControl('', [
    Validators.required,
    ClientValidators.phoneNumber,
  ]);
  errorMessage = '';
  sub = new Subscription();

  constructor(private formService: FormsService) {
    this.sub.add(
      combineLatest([
        this.prefixControl.valueChanges,
        this.phoneNumberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      }),
    );
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onChange = (value: string | null) => {};
  onTouched = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.prefixControl.disable();
      this.phoneNumberControl.disable();
    } else {
      this.prefixControl.enable();
      this.phoneNumberControl.enable();
    }
  }

  writeValue(value: string): void {
    const valueWithoutPlus = value.replace('+', '');
    const prefixValue = valueWithoutPlus.slice(0, 2);
    const phoneNumber = valueWithoutPlus.slice(2);

    this.prefixControl.setValue(prefixValue);
    this.phoneNumberControl.setValue(phoneNumber);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
