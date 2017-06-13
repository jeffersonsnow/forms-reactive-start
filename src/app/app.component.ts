import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// tslint:disable-next-line:one-line
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //second argument takes validators, don't call required, leave off (), also you have to bind 
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails) //you can also pass an array of validators, the third param is for asyncvalidators
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value)=> console.log(value)
    // )
    this.signupForm.statusChanges.subscribe(
      (value)=> console.log(value)
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Jeff',
        'email': 'jeff@test.com',
      },
      'gender': 'male',
      'hobbies' : []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Jeffster',
        // 'email': 'jeff@test.com',
      },
      // 'gender': 'male',
      // 'hobbies' : []
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1){
      return{'nameIsForbidden': true};
    }
    return null; // if it passes validation, you have to make it return null
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(()=> {
        if(control.value === 'test@test.com'){
          resolve({'nameIsForbidden': true});
        } else {
          resolve(null);
        }
      },1500);
    });
    return promise;
  }

}
