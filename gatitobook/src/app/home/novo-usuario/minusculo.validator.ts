import { AbstractControl } from '@angular/forms';

export function minusculoValidator(control: AbstractControl){
    const value = <string>control.value;

    if(value !== value.toLowerCase()) {
        return { minusculo: true };
    }
    else {
        return null;
    }
}
