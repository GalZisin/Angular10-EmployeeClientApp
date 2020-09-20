import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css'],
})
export class ShowDepComponent implements OnInit {
  departmentList: any = [];
  ModalTitle: string;
  ActiveAddEditDepComp: boolean = false;
  dep: any;

  departmentIdFilter: string = '';
  departmentNameFilter: string = '';
  departmentListWithoutFilter: any = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.refreshDepList();
  }
  addClick() {
    this.dep = {
      departmentId: 0,
      departmentName: '',
    };
    this.ModalTitle = 'Add Department';
    this.ActiveAddEditDepComp = true;
  }
  editClick(item: any) {
    this.dep = item;
    this.ModalTitle = 'Edit Dwpartment';
    this.ActiveAddEditDepComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure?')) {
      this.service.deleteDepartment(item.departmentId).subscribe(
        (data) => {
          console.log('data: ' + data);
          console.log('data: ' + JSON.stringify(data));
          alert(data.toString());
          this.refreshDepList();
        },
        (error) => {
          console.log('error: ' + JSON.stringify(error.error));
          alert(JSON.stringify(error.error));
        }
      );
    }
  }
  closeClick() {
    this.ActiveAddEditDepComp = false;
    this.refreshDepList();
  }
  refreshDepList() {
    this.service.getDepList().subscribe((data) => {
      this.departmentList = data;
      this.departmentListWithoutFilter = data;
      console.log('DepartmentList: ' + JSON.stringify(this.departmentList));
    });
  }
  FilterFn() {
    var DepartmentIdFilter = this.departmentIdFilter;
    var DepartmentNameFilter = this.departmentNameFilter;

    this.departmentList = this.departmentListWithoutFilter.filter(function (
      el
    ) {
      return (
        el.departmentId
          .toString()
          .toLowerCase()
          .includes(DepartmentIdFilter.toString().trim().toLowerCase()) &&
        el.departmentName
          .toString()
          .toLowerCase()
          .includes(DepartmentNameFilter.toString().trim().toLowerCase())
      );
    });
  }
  sortResult(prop, asc) {
    this.departmentList = this.departmentListWithoutFilter.sort(function (
      a: any,
      b: any
    ) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });
  }
}
