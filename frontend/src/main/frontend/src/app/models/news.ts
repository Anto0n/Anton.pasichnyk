export class News{
  idnews?: number;
  header: string;
  body: string;
  newsCreate?: number;
  newsUpdate?: number;
  pagesType?: PagesType;
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
