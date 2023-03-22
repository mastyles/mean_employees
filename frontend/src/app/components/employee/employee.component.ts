import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  resetForm(form?: NgForm) {
    if(form) {
      form.reset();
    }
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      designation: '',
      company: '',
      salary: 0
    }
  }

  onSubmit(employeeForm: NgForm) {
    if(employeeForm.value._id === "") {
      this.employeeService.postEmployee(employeeForm.value).subscribe((res)=>{
        this.resetForm(employeeForm);
        this.refreshEmployeeList();
        M.toast({html: 'Employee Added Successfully!', classes: 'rounded'});
      });
    } else {
      this.employeeService.updateEmployee(employeeForm.value).subscribe( (response) => {
        this.resetForm(employeeForm);
        this.refreshEmployeeList();
        M.toast({html: 'Employee Updated Successfully!', classes: 'rounded'});
      })
    }
  }

  refreshEmployeeList() {
    return this.employeeService.getEmployees().subscribe( (response) => {
      this.employeeService.employees = response as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, employeeForm: NgForm) {
    if(confirm('Are you sure you want to delete this record?')) {
      this.employeeService.deleteEmployee(_id).subscribe( (res) => {
        this.resetForm(employeeForm);
        this.refreshEmployeeList();
        M.toast({html: 'Employee Deleted Successfully!', classes: 'rounded'});
      });
    }
  }

}
