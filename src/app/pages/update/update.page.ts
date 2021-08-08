import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  editForm: FormGroup;
  id: any;

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.employeeService.getUser(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        email: [data['email']],
        password: [data['password']]
      });
    });
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.employeeService.update(this.id, this.editForm.value);
  }

}
