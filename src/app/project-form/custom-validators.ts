import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  static bannedNames = ['Project XXX', 'Pho Kuh Yu', 'Lee', 'x'];
  static database = ['qwe', 'Allen', 'Pyper'];

  static checkBannedNames(control: FormControl): { [s: string]: boolean } {
    if (CustomValidators.bannedNames.includes(control.value)) {
      return { nameIsBanned: true };
    }
    return null;
  }

  static checkDuplicates(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (CustomValidators.database.includes(control.value)) {
          resolve({ duplicateNameInDatabase: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });

    return promise;
  }
}
