import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../../services/graphql.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeInput } from 'src/app/interface/employeeInput';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  employees: any[] = [];

  employeeForm!: FormGroup;

  constructor(
    private router: Router,
    private graphqlService: GraphqlService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  handleAdd() {
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

    // console.log(employeeInput);

    this.graphqlService.CreateEmployee(employeeInput).subscribe((data: any) => {
      // console.log(data);
      this.router.navigate(['/employee-list']);
    });
  }

  handleCancel() {
    this.router.navigate(['/employee-list']);
  }
}
