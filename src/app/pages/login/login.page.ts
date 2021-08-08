import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  employeeForm: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    public formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
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
