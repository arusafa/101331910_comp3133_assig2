import { gql } from 'apollo-angular';

export const LOGIN_USER = gql`
  query loginUser($input: UserInput) {
    loginUser(input: $input) {
      username
      email
      password
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput) {
    registerUser(input: $input) {
      username
      email
      password
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      email
      password
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($getUserById: ID!) {
    getUserById(id: $getUserById) {
      id
      username
      email
      password
    }
  }
`;

export const LOGOUT_USER = gql`
  query logoutUser($input: UserInput) {
    logoutUser(input: $input) {
      username
      email
      password
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($input: EmployeeInput) {
    createEmployee(input: $input) {
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query getEmployees {
    getEmployees {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

export const GET_EMPLOYEE_BY_ID = gql`
  query getEmployeeById($getEmployeeByIdId: ID!) {
    getEmployeeById(id: $getEmployeeByIdId) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($id: ID!, $input: EmployeeInput) {
    updateEmployee(id: $id, input: $input) {
      id
      first_name
      last_name
      email
      gender
      salary
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id){
      id
    }
  }
`;

/*
mutation{
  createEmployee (
    input:{
      first_name:"maziar",
      last_name:"masuidi",
      email:"maziar@it.ca",
      gender:"Male",
      salary:"60000"
    }){
      id
      first_name
      last_name
      email
      gender
      salary
    }
}
*/

/*
mutation {
  registerUser(
    input: {
      username: "maziarMasuidi"
      email: "masuidi@maziar.net"
      password: "123456"
    }
  ) {
    id
    username
    email
    password
  }
}
*/

/*
query{
  getEmployees{
    id
    first_name
    last_name
  }
}

query {
  getUsers {
    id
    username
    email
    password
  }
}

*/

//login user query
/*
query{
  loginUser(
    input:{
      username:""
      email:""
      password:""
    }
  ){
    id
    username
    email
    password
  }
}

/*
mutation{
    updateEmployee(
        id:"63dcc5dafee0e8d746b8d143"
        input:{
            first_name:"maziar",
            last_name:"masuidi",
            email:"Maziar.masuidi@gmail.ca",
            gender:Male,
            salary:80000
        }
    ){
        id
        first_name
        last_name
        email
        gender
        salary
    }
}
*/

/*
mutation{
    deleteEmployee(
        id:"63dcc5dafee0e8d746b8d143"
    ){
        id
        first_name
        last_name
        email
        gender
        salary
    }
}
*/

/*
query{
    getEmployeeById(id:"63dcc5dafee0e8d746b8d143"){
        id
        first_name
        last_name
        email
    }
}
*/

/*
query{
    getUserById(id:"63dcc5dafee0e8d746b8d143"){
        id
        username
        email
    }
}

Mutation{
    loginUser(
        input:{
            email:"masuidi@maziar.net"
            password:"
        }
    ){
        id
        username
        email
        token
    }
}
*/
