import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  EmployeeList: any = [];
  ModalTitle: string;
  ActiveAddEditEmpComp: boolean = false;
  emp: any;
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshEmpList();
  }
  addClick() {
    this.emp = {
      employeeId: 0,
      employeeName: '',
      department: '',
      dateOfJoining: '',
      photoFileName: 'anonymous.PNG',
    };
    this.ModalTitle = 'Add Department';
    this.ActiveAddEditEmpComp = true;
  }
  editClick(item: any) {
    this.emp = item;
    this.ModalTitle = 'Edit Dwpartment';
    this.ActiveAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteEmployee(item.employeeId).subscribe(
        (data) => {
          console.log('data: ' + data);
          console.log('data: ' + JSON.stringify(data));
          alert(data.toString());
          this.refreshEmpList();
        },
        (error) => {
          console.log('error: ' + JSON.stringify(error.error));
          alert(JSON.stringify(error.error));
        }
      );
    }
  }
  closeClick() {
    this.ActiveAddEditEmpComp = false;
    this.refreshEmpList();
  }
  refreshEmpList() {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
      console.log('EmployeeList: ' + JSON.stringify(this.EmployeeList));
    });
  }
}
