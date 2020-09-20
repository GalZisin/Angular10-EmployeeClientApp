import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css'],
})
export class AddEditDepComponent implements OnInit {
  @Input() dep: any;
  departmentId: string;
  departmentName: string;
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.departmentId = this.dep.departmentId;
    this.departmentName = this.dep.departmentName;
  }

  addDepartment() {
    let val = {
      departmentId: this.departmentId,
      departmentName: this.departmentName,
    };
    this.service.addDepartment(val).subscribe((res) => {
      alert(res.toString());
    });
  }

  updateDepartment() {
    let val = {
      departmentId: this.departmentId,
      departmentName: this.departmentName,
    };
    this.service.addDepartment(val).subscribe((res) => {
      alert(res.toString());
    });
  }
}
