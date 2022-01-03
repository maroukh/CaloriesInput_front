import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export default class Validation {
  static dateConsistency(controlNameD1: string, controlNameD2: string, controlNameT1: string, controlNameT2: string): ValidatorFn {
    return (controls: AbstractControl) => {
      return null;
      const controlD1 = controls.get(controlNameD1);
      const controlD2 = controls.get(controlNameD2);
      const controlT1 = controls.get(controlNameT1);
      const controlT2 = controls.get(controlNameT2);

      if (controlD2.errors && !controlD2.errors.dateMatching) {
        return null;
      }

      if (controlT2.errors && !controlT2.errors.timeMatching) {
        return null;
      }

      const controleNgDate1: NgbDate = controlD1.value;
      const controleNgDate2: NgbDate = controlD2.value;
      let controlDate1 =  new Date(controleNgDate1.year, controleNgDate1.month - 1, controleNgDate1.day, 0, 0, 0);
      let controlDate2 =  new Date(controleNgDate2.year, controleNgDate2.month - 1, controleNgDate2.day, 0, 0, 0);

      if (controlDate1 > controlDate2) {
        controls.get(controlNameD2).setErrors({ dateMatching: true });
        return { dateMatching: true };
      } else {
        controlDate1 =  new Date(controleNgDate1.year, controleNgDate1.month - 1, controleNgDate1.day, +controlT1.value.split(":")[0], +controlT1.value.split(":")[1], 0);
        controlDate2 =  new Date(controleNgDate2.year, controleNgDate2.month - 1, controleNgDate2.day, +controlT2.value.split(":")[0], +controlT2.value.split(":")[1], 0);
        if (controlDate1 > controlDate2) {
          controls.get(controlNameT2).setErrors({ timeMatching: true });
          return { timeMatching: true };
        }
        return null;
      }
    };
  }
}