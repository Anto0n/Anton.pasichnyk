import {Component, OnDestroy,  OnInit} from '@angular/core';
import {IUser} from "../../models/iuser.model";
import {RestService} from "../../services/rest.service";
import {IModel, ModelStatus, BagType, BagtypeConfig} from "../../models/model";
import {OrderResp, OrderCreate, mItems} from "../../models/order";
import {CardOrderService} from "../../services/order/card-order.service";
import {Config2d, ModelConfig} from "../../models/modelConfig";
import {JsonConvert} from "json2typescript";
import {Configurator2dService} from "../../services/configurator/configurator2d.service";
import {ModelService} from "../../services/model.service";
@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html'
})
export class TestformComponent implements OnInit{

  private users: IUser[] = [];
  private uModels: IModel[] = [];
  private moderModels: IModel[] = [];
  private orderResp: OrderResp;

 // @ViewChild('view2dparrent')
  /*view2d */
  private bags: BagType[] = [];
  private curbag : BagType = new BagType();
  private iModel : IModel = new IModel();
  private tstr: string;
  private models : IModel[] = [];

  constructor(private restService: RestService, private corServ: CardOrderService, private config2dService: Configurator2dService, private modelService : ModelService) {
    // console.log( "tform constructor");
    // console.log( this.bags);
  }

  ngOnInit(): void {
    this.reloadBags().subscribe(_=>{
      this.curbag.script = new BagtypeConfig();
      this.curbag = this.bags[2];
    });  //2d views
   // this.modelService.getbagslocal().subscribe;
  /*  console.log( "oninit");
    console.log( this.bags);*/
     // retrive default local config
    this.tstr ="11111111";
    //this.curbag = this.modelService.getBagByIdlocal(1);
    this.iModel.config = this.config2dService.getLocalConfig();
    this. reloadModels().subscribe(_=>{
      this.iModel = this.models[1];  // model to show
    });
  }

  private  reloadModels(){
    return this.restService.getData("./api/models/list").map((data: IModel[]) =>{
        this.models = data;
      for (var i = 0; i < data.length; i++) {
        let jStr: string = JSON.parse(JSON.stringify(data[i].config));
      /*  let tmodel : ModelConfig = new ModelConfig("", []);
        tmodel.config2d = new Config2d();*/
        let obj: ModelConfig;
         obj  = JsonConvert.deserializeString(jStr, ModelConfig );
        this.models[i].config = new ModelConfig();
        this.models[i].config.config2d = new Config2d();
        //this.models[i].config.config2d.bagtype = new BagType(); //BAGTYPE
        //this.models[i].config.config2d.bagtype.script = new BagtypeConfig();
        this.models[i].config = obj;
      }
      console.log("MODELS load");
      console.log(this.models[0].config.config2d);
    }


    ).catch((error) => {
      console.log('error ' + error);
      throw error;
    });

  }

  private reloadBags() {
    return this.restService.getData("./api/bag_type/list").map((data: BagType[]) => {
        this.bags = data;
        console.log( this.bags);
        for (var i = 0; i < this.bags.length; i++) {   //load script objects
          let jStr: string = JSON.parse(JSON.stringify(this.bags[i].script));
          let obj: BagtypeConfig = JsonConvert.deserializeString(jStr, BagtypeConfig);
          this.bags[i].script = new BagtypeConfig();
          this.bags[i].script = obj;
        }
      }
    ).catch((error) => {
      console.log('error ' + error);
      throw error;
    });
  }



  getUser() {
    console.log( this.bags);
    this.restService.getData('./api/user/list')
      .subscribe((data: IUser[]) => {
        this.users = data;
        console.log(data);
      }, () => console.log('err')); //todo: add Alert service
  console.log("curbag" + this.curbag);
  }

  getModelsByUserId() {
    this.restService.getData(`./api/models/${2}/list`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
        console.log(data);
      }, () => console.log('err'));
  }

  getModelsList() {
    this.restService.getData('./api/models/list')
      .subscribe((data: IModel[]) => {
        this.moderModels = data;
        console.log(data);
      }, () => console.log('err'));
  }

  approveModel(id: number, approved: string) {
    this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
      .subscribe(data => console.log(data));
    console.log('' + id, '' + approved);
  }

  createOrder() {
    let orderCreate: OrderCreate = {
      "userId": 2,
      "items": [
        {
          "modelId": 1,
          "count": 15
        },
        {
          "modelId": 1,
          "count": 15
        }
      ]
    };
    this.restService.postJsonResp('./api/order/createOrder', orderCreate)
      .subscribe((data: OrderResp) => {
          this.orderResp = data;
          console.log(this.orderResp)
        },
        () => console.log('err')
      )
  }

  sendTestDataToObservable() {
    let iMod: IModel = {
      "id": 1,
      "userId": 1,
      "bagTypeId": 1,
      "materialId": 1,
      "mname": "model_1",
      "approved": ModelStatus.NEW,
      "modelCreate": 1495664395000,
      "modelUpdate": 1495664395000,
      "config": new ModelConfig()
    };


    let iMod2: IModel = {
      "id": 2,
      "userId": 2,
      "bagTypeId": 2,
      "materialId": 2,
      "mname": "mod2",
      "approved": ModelStatus.NEW,
      "modelCreate": 1495664395000,
      "modelUpdate": 1495664395000,
      "config": new ModelConfig()
    }


    let tIt: mItems[] = [
      {
        "idOrderItem": 3333,
        "count": 12,
        "price": 12.95,
        "model": iMod
      },
      {
        "idOrderItem": 3334,
        "count": 5,
        "price": 15,
        "model": iMod2
      }
    ]

    let testD: OrderResp = {
      "idOrder": 2,
      "moderatorId": 0,
      "userDto": {
        "idUser": 1,
        "email": "admin@gmail",
        "firstname": "Ivan",
        "lastname": "Onobrenko"
      },
      "status": {
        "description": "new created order",
        "code": "NEW"
      },
      "orderCreate": 1495664395000,
      "items": tIt,
      "sumPrice": 230.4
    }
    this.corServ.sendOrderResp(testD);
  }

  clearTestDataToObservable() {
    this.corServ.clearMessage();
  }

}
