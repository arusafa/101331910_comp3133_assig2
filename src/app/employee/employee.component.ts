import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  constructor(private router: Router) {}

  employee = history.state.data;
  handleEdit(employee: any) {
    console.log(employee);
    this.router.navigate(['/employee-edit'], { state: { data: employee } });
  }

  handleCancel() {
    this.router.navigate(['/employee-list']);
  }
}
