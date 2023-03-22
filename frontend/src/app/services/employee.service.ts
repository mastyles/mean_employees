import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  selectedEmployee: Employee = {} as Employee;
  employees: Employee[] = [];
  private apiURL = 'http://localhost:3000/employees';

  constructor(private httpClient: HttpClient) {}

  postEmployee(employee: Employee) {
    return this.httpClient.post(this.apiURL, employee);
  }

  getEmployees() {
    return this.httpClient.get(this.apiURL);
  }

  updateEmployee(emp: Employee) {
    return this.httpClient.put(`${this.apiURL}/${emp._id}`, emp);
  }

  deleteEmployee(_id: string) {
    return this.httpClient.delete(`${this.apiURL}/${_id}`);
  }

}
