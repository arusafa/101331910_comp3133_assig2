import { GraphqlService } from '../../services/graphql.service';
import { GET_ALL_EMPLOYEES } from '../../services/graphqlQueries';
import { Apollo } from 'apollo-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: any[] = [];
  constructor(
    private graphqlService: GraphqlService,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: GET_ALL_EMPLOYEES,
      })
      .valueChanges.subscribe((result: any) => {
        this.employees = result?.data?.getEmployees || []; // initialize to empty array
        console.log(this.employees);
      });
  }

  handleAdd() {
    this.router.navigate(['/employee-add']);
  }

  handleDelete(id: string) {
    this.graphqlService.deleteEmployeeById(id).subscribe((data: any) => {
      console.log(data);
    });
  }

  handleEdit(employee: any) {
    console.log(employee);
    this.router.navigate(['/employee-edit'], { state: { data: employee } });
  }
  handleView(employee: any) {
    console.log(employee);
    this.router.navigate(['/employee'], { state: { data: employee } });
  }
}
