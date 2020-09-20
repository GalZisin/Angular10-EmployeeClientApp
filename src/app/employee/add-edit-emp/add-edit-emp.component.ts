import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css'],
})
export class AddEditEmpComponent implements OnInit {
  @Input() emp: any;
  employeeId: string;
  employeeName: string;
  department: string;
  dateOfJoining: string;
  photoFileName: string;
  photoFilePath: string;

  departmentsList: any = [];
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList() {
    this.service.getAllDepartmentNames().subscribe((data) => {
      this.departmentsList = data;
      console.log(
        'getAllDepartmentNames: ' + JSON.stringify(this.departmentsList)
      );

      this.employeeId = this.emp.employeeId;
      this.employeeName = this.emp.employeeName;
      this.department = this.emp.department;
      this.dateOfJoining = this.emp.dateOfJoining;
      this.photoFileName = this.emp.photoFileName;
      this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
    });
  }

  addEmployee() {
    let val = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName,
    };
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateEmployee() {
    let val = {
      employeeId: this.employeeId,
      employeeName: this.employeeName,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName,
    };
    this.service.addEmployee(val).subscribe((res) => {
      alert(res.toString());
    });
  }
  uploadPhoto(event) {
    let file = event.target.files[0];
    const formatData: FormData = new FormData();
    formatData.append('uploadFile', file, file.name);

    this.service.uploadPhoto(formatData).subscribe((data) => {
      this.photoFileName = data.toString();
      this.photoFilePath = this.service.PhotoUrl + this.photoFileName;
    });
  }
}
