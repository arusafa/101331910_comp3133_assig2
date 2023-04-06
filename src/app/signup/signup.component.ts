import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../services/graphql.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  title = 'Signup';
  username: string = '';
  email: string = '';
  password: string = '';
  signupForm!: FormGroup;
  
  constructor(
    private graphqlService: GraphqlService, 
    private router: Router, 
    private formBuilder: FormBuilder
    ) { }
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  signup() {
    const { username, email, password } = this.signupForm.value;
    this.graphqlService.registerUser(username, email, password).subscribe((result) => {
      console.log(`Username:${username} __---__ Email:'${email}' __---__ Password:'${password}'`);
      this.router.navigate(['/login']);
    });
  }

}
