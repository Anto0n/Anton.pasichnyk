export class News{
  idnews: number;
  header: string;
  body: string;
  newsCreate?: number;
  newsUpdate?: number;
  pagesType: PagesType;
}

export class PagesType{
  idpagesType: number;
  type: string;
}

export class NewsCreate{
  header: string;
  body: string;

  constructor(header: string, body: string) {
    this.header = header;
    this.body = body;
  }
}

export class newsStatus{
  idnews: number;
  type: string;


  constructor(idnews: number, type: string) {
    this.idnews = idnews;
    this.type = type;
  }
}
