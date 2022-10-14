import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-with-angular-syntax-personalized-page',
  templateUrl: './update-with-angular-syntax-personalized-page.component.html',
  styleUrls: ['./update-with-angular-syntax-personalized-page.component.scss']
})
export class UpdateWithAngularSyntaxPersonalizedPageComponent implements OnInit {

  private rid: string = '';
  private _firstName: string = '';
  private _lastName: string = '';
  private _email: string = '';
  private _feedback: string = '';
  form: UntypedFormGroup;

  constructor() { }

  ngOnInit(): void {
    this.rid = localStorage.getItem('xmpRecipientID');
    this.createFormGroup();
    this.getRecipientAdors();
  }

  createFormGroup() {
    this.form = new UntypedFormGroup({
      FirstName: new UntypedFormControl(''),
      LastName: new UntypedFormControl(''),
      Email: new UntypedFormControl(''),
      Feedback: new UntypedFormControl('')
    });
  }

  getRecipientAdors() {
    const accessToken = localStorage.getItem('serviceToken');
    const adorList = ['FirstName', 'LastName', 'Email', 'Feedback'];
    (window as any).xmpProvider.api.getAdorValues({
      accessToken:accessToken, 
        rid: this.rid, 
        isLogin: true, 
        adors: adorList, 
        resolved: [], 
        async: false, 
        isCached: false, 
        noCache: false
      })
      .then(this.xmpReady)
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get feedback() {
    return this._feedback;
  }

  xmpReady = () => {
    this._feedback = (window as any).xmpProvider.store.xmp.r.Feedback;
    this._email = (window as any).xmpProvider.store.xmp.r.Email;
    this._lastName = (window as any).xmpProvider.store.xmp.r.LastName;
    this._firstName = (window as any).xmpProvider.store.xmp.r.FirstName;
    this.form.setValue({
      FirstName: this._firstName,
      LastName: this._lastName,
      Email: this._email,
      Feedback: this._feedback
    });
  }

  saveChanges() {
    (window as any).xmpProvider.api.updateAdors(this.form.value)
      .then(this.xmpReady)
  }

}
