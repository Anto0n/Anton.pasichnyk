import {Component, OnInit} from '@angular/core';
import {News} from "../../models/news";
import {RestService} from "app/services";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  private news : News[] = [];

  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.getNews();
  }



  getNews(){
    this.restService.getData('./api/news/list')
      .subscribe((data: News[]) => {
        this.news=data;
        console.log(data);
      }, ()=>console.log('err')); //todo: add Alert service
  }




}



/*
export interface News{
  "idnews": number;
  "body": string;
  "header": string;
  "newsCreate": number;
  "newsUpdate": number;
  "pagesType": PagesType;

}*/
