import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GraphqlService } from './services/graphql.service';
import { InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    CommonModule,
    FontAwesomeModule
  ],

  providers: [
    GraphqlService,
    Apollo,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://101331910-comp3133-assig1.vercel.app/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}


// https://101331910-comp3133-assig1.vercel.app/graphql