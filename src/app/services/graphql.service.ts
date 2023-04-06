import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

// User Imports
import { REGISTER_USER } from './graphqlQueries';
import { LOGIN_USER } from './graphqlQueries';
import { LOGOUT_USER } from './graphqlQueries';
import { GET_ALL_USERS } from './graphqlQueries';
import { GET_USER_BY_ID } from './graphqlQueries';

// Employee Imports
import { CREATE_EMPLOYEE } from './graphqlQueries';
import { GET_ALL_EMPLOYEES } from './graphqlQueries';
import { GET_EMPLOYEE_BY_ID } from './graphqlQueries';
import { UPDATE_EMPLOYEE } from './graphqlQueries';
import { DELETE_EMPLOYEE } from './graphqlQueries';
import { EmployeeInput } from '../interface/employeeInput';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(
    private apollo: Apollo,
    private router: Router) {}

  query(query: any, variables: any = {}): Observable<any> {
    return this.apollo
      .watchQuery({
        query: gql`
          ${query}
        `,
        variables: variables,
      })
      .valueChanges.pipe(map((result: any) => result.data));
  }

  mutation(mutation: any, variables: any = {}): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          ${mutation}
        `,
        variables: variables,
      })
      .pipe(map((result: any) => result.data));
  }

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.mutation(REGISTER_USER, {
      input: {
        username,
        email,
        password,
      },
    });
  }

  login(username: string, email: string, password: string): Observable<any> {
    return this.query(LOGIN_USER, {
      input: {
        username,
        email,
        password,
      },
    });
  }

  logout(): Observable<any> {
    return this.query(LOGOUT_USER);
  }

  getAllUsers(): Observable<any> {
    return this.query(GET_ALL_USERS);
  }

  getUserById(id: string): Observable<any> {
    return this.query(GET_USER_BY_ID, {
      getUserById: id,
    });
  }

  getAllEmployees(): Observable<any> {
    return this.query(GET_ALL_EMPLOYEES);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.query(GET_EMPLOYEE_BY_ID, {
      getEmployeeById: id,
    });
  }

  CreateEmployee(input: EmployeeInput): Observable<any> {
    return this.mutation(CREATE_EMPLOYEE, {
      input: input,
    }).pipe(
      map((response) => {
        console.log(response);
        console.log(response.data);
        return response.data;
      }),
      switchMap(() => {
        return this.apollo
          .query<any>({
            query: GET_ALL_EMPLOYEES,
            fetchPolicy: 'network-only',
          })
          .pipe(map((response) => response.data.getEmployees));
      }),
      tap((employees) => {
        console.log(employees);
        this.router.navigate(['/employee-list']);
      })
    );
  }
  
  updateEmployee(id: string, input: EmployeeInput): Observable<any> {
    return this.mutation(UPDATE_EMPLOYEE, {
      id,
      input,
    }).pipe(
      map((res) => res.data?.updateEmployee),
      switchMap(() => {
        return this.apollo.query<any>({
          query: GET_ALL_EMPLOYEES,
          fetchPolicy: 'network-only',
        }).pipe(map((res) => res.data?.getEmployees));
      })
    );
  }
  

  deleteEmployeeById(id: string): Observable<any> {
    return this.mutation(DELETE_EMPLOYEE, {
      id,
    })
      .pipe(map((res) => res.data?.deleteEmployee))
      .pipe(
        switchMap(() => {
          return this.apollo
            .query<any>({
              query: GET_ALL_EMPLOYEES,
              fetchPolicy: 'network-only',
              })
            })  
      );
  }
}
