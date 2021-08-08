import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';



export class USER {
  id: string;
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  employeeForm: FormGroup;

  successMsg = '';
  errorMsg = '';

  error = {
    email: [
      {
        type: 'required',
        message: 'Provide email.'
      },
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.'
      }
    ]
  };



  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit(user: USER) {

    this.employeeService.createUser(user)
      .then((response) => {
        this.errorMsg = '';
        this.successMsg = 'New user created.';
        console.log(this.successMsg);
      }, error => {
        this.errorMsg = error.message;
        this.successMsg = '';
      });

    if (!this.employeeForm.valid) {
      return false;
    } else {
      this.employeeService.create(this.employeeForm.value)
      .then(() => {
        this.employeeForm.reset();
        this.router.navigate(['/home']);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

}
