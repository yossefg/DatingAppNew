import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PaginatedResult, Pagination } from 'src/app/model/Pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  user: User = JSON.parse(localStorage.getItem('user'));
  users: User[];
  genderList = [ {value: 'male' , display: 'Males'}, { value: 'female' , display: 'Females'} ];
  userParams: any = {
    minAge : 18,
    maxAge : 99,
    gender : this.user.gender === 'female' ?  'male' : 'female',
    orderBy: 'lastActive'
  };
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination =  data['users'].pagination;
      console.log(this.users);
    });
  }
  loadUsers() {
    this.userService.getUsers(  this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(data => {
      this.users = data.result;
      this.pagination =  data.pagination;
    });
  }
  resetFilters() {
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.gender = this.user.gender === 'famale' ?  'male' : 'female';
    this.loadUsers();
  }
  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

}
