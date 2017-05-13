import { Component, OnInit } from '@angular/core';
import {News} from "../../../models/news";
import {RestService} from "../../../services/rest.service";
import {UserRoleService} from "../../../services/user/user-role.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  private news : News[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService) { }

  ngOnInit() {
    this.getAllNews();
  }

  getAllNews(){
    this.restService.getData('./api/news/list').subscribe(
      (data: News[]) => {
        this.news = data;
      }
    )
  }

  createNews(){}

  updateNews(){}

  deleteNews(){}

}
