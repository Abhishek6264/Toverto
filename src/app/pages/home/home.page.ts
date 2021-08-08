import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

export class USER {
  $key: string;
  email: string;
  password: string;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  EmployeeList: USER[];

  constructor(private employeeService: EmployeeService) {}


  ngOnInit() {
    this.employeeService.getTasks().subscribe((res) => {
      this.EmployeeList = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as  USER
        }));
    });
  }

  todoList() {
    this.employeeService.getTasks()
    .subscribe((data) => {
      console.log(data);
    });
  }

  remove(id) {
    console.log(id);
      this.employeeService.delete(id);
  }

}
