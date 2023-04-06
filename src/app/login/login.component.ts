import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Login';
  username: string = '';
  email: string = '';
  password: string = '';
  loginForm!: FormGroup;

  constructor(
    private loginService: GraphqlService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  handleLogin(): void {
    const { username, email, password } = this.loginForm.value;
    console.log(` __---__ Username:'${username}' Email:'${email}' __---__ Password:'${password}'`);
    this.loginService.login(username,email, password).subscribe(
      (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/employee-list']);
      },
      (err: any) => {
        console.log(err);
        console.log(err.response);
      }
    );
  }
}
