import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  projectStatusOptions = ['Stable', 'Critical', 'Finished'];
  // bannedNames = ['Project XXX', 'Pho Kuh Yu', 'Lee', 'x'];
  // database = ['qwe', 'Allen', 'Pyper'];

  constructor() {}

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(
        'Project Uno',
        [Validators.required, CustomValidators.checkBannedNames],
        CustomValidators.checkDuplicates
        // [Validators.required, this.checkBannedNames.bind(this)],
        // this.checkDuplicates.bind(this)
      ),
      email: new FormControl('test@tesee.com', [
        Validators.required,
        Validators.email,
      ]),
      status: new FormControl('Stable', Validators.required),
    });

    this.projectForm.get('name').statusChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onTestAccount() {
    this.projectForm.setValue({
      name: 'Project X',
      email: 'x@x.com',
      status: 'Critical',
    });
  }

  // checkBannedNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.bannedNames.includes(control.value)) {
  //     return { nameIsBanned: true };
  //   }
  //   return null;
  // }

  // checkDuplicates(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (this.database.includes(control.value)) {
  //         resolve({ duplicateNameInDatabase: true });
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });

  //   return promise;
  // }

  onReset() {
    this.projectForm.reset();
  }

  onSubmit() {
    console.log(this.projectForm);
  }
}
