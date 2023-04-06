import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';
import { EmployeeInput } from 'src/app/interface/employeeInput';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employee = history.state.data;
  first_name: string = this.employee.first_name;
  last_name: string = this.employee.last_name;
  gender: string = this.employee.gender;
  salary: number = this.employee.salary;
  email: string = this.employee.email;

  employeeForm!: FormGroup;

  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      first_name: [this.first_name, Validators.required],
      last_name: [this.last_name, Validators.required],
      gender: [this.gender, Validators.required],
      email: [this.email, [Validators.required, Validators.email]],
      salary: [this.salary, Validators.required],
    });
  }

  handleSave() {
    if (this.employeeForm.invalid) {
      // handle form validation errors
      this.employeeForm.markAllAsTouched();
      return;
    }

    const { first_name, last_name, email, gender, salary } =
      this.employeeForm.value;

    const employeeInput: EmployeeInput = {
      first_name,
      last_name,
      email,
      gender,
      salary,
    };

    this.graphqlService
      .updateEmployee(this.employee.id, employeeInput)
      .subscribe((data: any) => {
        this.router.navigate(['/employee-list']);
      });
  }
}
