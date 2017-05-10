export interface News{
  "idnews": number;
  "body": string;
  "header": string;
  "newsCreate": number;
  "newsUpdate": number;
  "pagesType": PagesType;

}

export interface PagesType{
  "idpagesType": number;
  "type": string;
}
