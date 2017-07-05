import {IConfigurator} from "../configurator.model";
import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from "@angular/core";
import {Config2d, Config3d, ModelConfig} from "../../models/modelConfig";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {CreateModel, IModel, ModelStatus, BagMaterial, BagType} from "../../models/model";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {Panel} from "./panel.model";
import {ImageConfig} from "../../models/image-config";
import {MaterialType} from "../../models/material-type.model";

declare let b4w: any;

@Component({
  selector: 'configurator-3d',
  templateUrl: './configurator3d.component.html'
})
export class Configurator3DComponent implements OnInit, OnDestroy, IConfigurator {



  @Input() private inModelName: string;
  @Input() private currentModel: ModelConfig;
  @Input()
  viewMode: boolean = false;

  @Input()
  editMode: boolean = false;
  @Output() onClearMname = new EventEmitter<string>();
  @Output() onModelSelect = new EventEmitter<IModel>();

  @Output() onChangePrice = new EventEmitter<number>();

  @Output()
  selectedPanelUpdated = new EventEmitter<string>();

  modelConfig: ModelConfig;
  imageConfig: ImageConfig;
  private pathToMaterials: string;
  private selectedPanel: any;
  private materialOfPanel: string;
  private material: BagMaterial;
  private materials: BagMaterial [] = [];
  private bagType: BagType;
  private canvas: HTMLElement = document.getElementById("canvas_cont");
  private appName: string = "conf_app";

  constructor(private restService: RestService,
              private userRoleService: UserRoleService,
              private authService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnDestroy(): void {
    b4w.require(this.appName).dispose();

  }

  init() {
  }


  listenerCallback1(e: MouseEvent) {


    if (this.editMode) {
      let pickedObject = b4w.require(this.appName).pickObject(e);

      if (pickedObject) {
        if (this.selectedPanel != null) {
          b4w.require(this.appName).stopAnimate(this.selectedPanel);
        }
        this.selectedPanel = pickedObject;
        b4w.require(this.appName).animate(this.selectedPanel);
        this.selectedPanelUpdated.emit(this.selectedPanel);
      }

    }

  }


  positionImage(scale, x, y, src:string, panel:Panel){
    let panelTrue = this.modelConfig.config3d.panels.find(p=>p.name===panel.name);
    b4w.require(this.appName).scalePicture(src, panelTrue, scale, x, y, this.materialOfPanel);
  }

  ngOnInit() {

    this.restService.getData("./api/material/list").subscribe(data => this.materials = data);
    b4w.register(this.appName, function (exports, require) {
        let m_app = b4w.require("app");
        let m_mouse = b4w.require("mouse");
        let m_data = b4w.require("data");
        let m_scenes = require("scenes");
        let m_tex = require("textures");
        let m_textures = require("__textures")
        let m_mat = require("material");
        let m_container = require("container");
        let m_preloader = require("preloader");
        let m_version = require("version");
        let DEBUG = (m_version.type() === "DEBUG");

        exports.getCanvas = m_container.get_canvas;
        exports.disableCamera = function(){
          m_app.disable_camera_controls();
        };
        exports.enableCamera = function(){
          m_app.enable_camera_controls();
        };

        exports.stopAnimate = function (obj) {
          m_scenes.clear_outline_anim(obj);
        };
        exports.animate = function (obj) {
          m_scenes.clear_outline_anim(obj);
          m_scenes.set_outline_color([0, 0.6, 1]);
          m_scenes.apply_outline_anim(obj, 1.2, 1.2, 0);

        };
        exports.pickObject = function (event) {
          m_app.enable_camera_controls();
          return m_scenes.pick_object(event.offsetX, event.offsetY);
        };


        exports.dispose = function () {
          m_data.unload();

        }
        exports.init = function () {
          m_app.init({

            canvas_container_id: "canvas_cont",
            callback: init_cb,
            alpha: true,
            autoresize: true,
            // assets_dds_available: !DEBUG,
            assets_min50_available: !DEBUG,
            console_verbose: true
          })
        }

        exports.clearRectangle = function (panels?: Panel[]) {

          if (panels == null) {

          } else {
            for (let i of panels) {
              let obj = m_scenes.get_object_by_name(i.name);
              let ctx2D = m_tex.get_canvas_ctx(obj, i.texture);
              ctx2D.clearRect(0, 0, ctx2D.canvas.width, ctx2D.canvas.height);
              m_tex.update_canvas_ctx(obj, i.texture);

            }
          }

        }


        function load_cb() {
          m_app.enable_camera_controls();

        }

        function on_resize() {
          var w = window.innerWidth;
          var h = window.innerHeight;
          m_container.resize(w, h);
        }

        function preloader_cb(percentage) {
          m_preloader.update_preloader(percentage);
        }



        exports.changeImg = function(src:string){
          let image = new Image();
          image.src=src;
          image.onload = function(){

          }

        }
      exports.chooseMaterial = function (material: string, panel?: Panel, customImage?: string, size?:number, x?:number, y?:number) {

        if (customImage) {
          let object = m_scenes.get_object_by_name("bag_front");
          let object_body = m_scenes.get_object_by_name("bag_body");
          let rendering_ctx = m_tex.get_canvas_ctx(object, "bag_front_text_img");
          let ctx_image_body = m_tex.get_canvas_ctx(object_body, "bag_body_text_img");
          let img = new Image();

          img.src = material;

          img.onload = function () {
            if (panel != null) {
              let panel_object = m_scenes.get_object_by_name(panel.name);
              let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
              if (panel.name === "bag_body") {
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, ctx2Dpanel.canvas.width / 2, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              } else if (panel.name === "bag_front" || panel.name === "bag_body_top") {
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);

              } else {
              }
              m_tex.update_canvas_ctx(panel_object, panel.texture);
            }
          }

          let customImageTemp = new Image();

          customImageTemp.src = customImage;
          let panel_object = m_scenes.get_object_by_name(panel.name);
          let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
          customImageTemp.onload = function () {
            let w = customImageTemp.width;
            let h = customImageTemp.height;
            ctx2Dpanel.drawImage(customImageTemp, 0, 0, w, h,
              ((ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.width/5*(1+(size-5)/10))/2)*(1+(x-5)/10),  //destination x
              (ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.height/5*(1+(size-5)/10))*(1+(y-5)/10)/2, //destination y
              ctx2Dpanel.canvas.width/5*(1+(size-5)/10), ctx2Dpanel.canvas.height/5*(1+(size-5)/10));
            m_tex.update_canvas_ctx(panel_object, panel.texture);
          }

        } else {


          let object = m_scenes.get_object_by_name("bag_front");
          let object_body = m_scenes.get_object_by_name("bag_body");
          let rendering_ctx = m_tex.get_canvas_ctx(object, "bag_front_text_img");
          let ctx_image_body = m_tex.get_canvas_ctx(object_body, "bag_body_text_img");
          let img = new Image();

          img.src = material;

          img.onload = function () {
            if (panel != null) {
              let panel_object = m_scenes.get_object_by_name(panel.name);
              let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
              if (panel.name === "bag_body") {
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, 0, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, ctx2Dpanel.canvas.width / 2, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              } else if (panel.name === "bag_front" || panel.name === "bag_body_top") {
                ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              } else {
              }
              m_tex.update_canvas_ctx(panel_object, panel.texture);
            }

          }
        }
      }




      exports.scalePicture = function (src: string, panel: Panel, size : number, x:number, y:number, materialSrc:string) {

          console.log("IM GONNA DRAWING NOW");
          console.log(panel);
          console.log(size);
          console.log(x);
          console.log(y);

          let panel_object = m_scenes.get_object_by_name(panel.name);
          let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
          ctx2Dpanel.clearRect(0,0, ctx2Dpanel.canvas.width, ctx2Dpanel.canvas.height);
          let img = new Image();
          img.src = materialSrc;

          img.onload = function () {
            let w = img.width;
            let h = img.height;

            ctx2Dpanel.drawImage(img, 0, 0, img.width, img.height, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 4, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);

            m_tex.update_canvas_ctx(panel_object, panel.texture);
          }


          console.log("IM GONNA DRAWING PIC NOW");
          let img2 = new Image();
          img2.src=src;
          img2.onload = function () {
            if(size){
              let scaleFactor = size-5;
            }
            let w = img2.width;
            let h = img2.height;
            ctx2Dpanel.drawImage(img2, 0, 0, w, h,
              ((ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.width/5*(1+(size-5)/10))/2)*(1+(x-5)/10),  //destination x
              (ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.height/5*(1+(size-5)/10))*(1+(y-5)/10)/2, //destination y
              ctx2Dpanel.canvas.width/5*(1+(size-5)/10),                              // destination width
              ctx2Dpanel.canvas.height/5*(1+(size-5)/10));                            // destination height
            m_tex.update_canvas_ctx(panel_object, panel.texture);
          }

        }
        exports.drawPicture = function (src: string, panel: Panel, size? : number) {


          let panel_object = m_scenes.get_object_by_name(panel.name);
          let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
          let img = new Image();
          img.src = src;

          img.onload = function () {
            if(size){
              let scaleFactor = size-5;
              img.width=img.width*(1+(scaleFactor)/10);
              img.height=img.height*(1+(scaleFactor)/10);
            }
            let w = img.width;
            let h = img.height;

            ctx2Dpanel.drawImage(img, 0, 0, w, h,
              (ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.width / 5)/2 ,
              (ctx2Dpanel.canvas.width-ctx2Dpanel.canvas.height / 5)/2,
              ctx2Dpanel.canvas.width / 5, ctx2Dpanel.canvas.height / 5);
            m_tex.update_canvas_ctx(panel_object, panel.texture);
          }

        }


        function init_cb(canvas_elem, success) {
          if (!success) {
            return;
          }
          m_preloader.create_preloader({
            container_color: "#ffffff", // background color of the container
            bar_color: "#6cbeee", // background color of the bar
            frame_color: "#ffffff", // color of the frame border
            font_color: "#000000" // color of the font
          });

          m_data.load('./assets/testConf/demo_bag.json', load_cb, preloader_cb);
        }


      }
    )

    b4w.require(this.appName).dispose();
    b4w.require(this.appName).init();
    // document.getElementById("canvas_cont").style.width="1000px";

    //todo get bag type from DB
    if (this.bagType == null) {
      this.bagType = new BagType();
      this.bagType.id = 1;
    }
    if (this.modelConfig == null) {
      this.modelConfig = new ModelConfig();
      this.modelConfig.config3d = new Config3d();
      this.imageConfig = new ImageConfig();

    }
    this.restService.getData('./api/panel/list').subscribe((data: any) => {
        this.modelConfig.config3d.panels = data;
        this.imageConfig.panels = data;
      },
      () => console.log('cant receive panels'));
    if (this.currentModel != null) {
      for (let i of this.modelConfig.config3d.panels) {
        this.selectMaterial(i.material, i.name);
      }
      for (let a = 0; a < this.imageConfig.panels.length; a++) {
        if (this.imageConfig.image[a] !== null) {
          b4w.require(this.appName).drawPicture(this.imageConfig.image[a], this.imageConfig.panels[a]);
        }
      }
    } else {
      setTimeout(() => {

        this.restService.getData('./api/models/1').subscribe((data: IModel) => {
            let jStr: string = JSON.parse(JSON.stringify(data.config));
            let obj: Config3d = new Config3d();
            obj.panels = [];
            let arr = [];
            obj = JSON.parse(jStr, ((key, value) => {
              if (key == "image") {
                arr.push(value);
              }
            } ));
            for (let a = 0; a < arr.length; a++) {
              this.modelConfig.config3d.panels[a].material = new BagMaterial();
              this.modelConfig.config3d.panels[a].material.image = arr[a];
            }
            for (let i of this.modelConfig.config3d.panels) {
              this.selectMaterial(i.material, i.name);
            }
            this.material.id = 1;
            // this.onModelSelect.emit(data);
          },
          () => console.log('cant receive default model'));
      }, 3000);

    }

  }

  disableCamera(){
    b4w.require(this.appName).disableCamera();
  }
  enableCamera(){
    b4w.require(this.appName).enableCamera();
  }

  resetModel() {
    this.clearRectangle();

    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
    this.restService.getData('./api/models/1').subscribe((data:IModel)=> {


      this.loadModel(data);
    });
  }

  save(modelConfig: ModelConfig, imageConfig: ImageConfig) {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error("Login to save models!");
      return;
    }
    if (this.material == null) {
      this.alertService.error("Select material!", false)
      return;
    } else if
    (this.bagType == null) {
      this.alertService.error("Select bagtype!", false)
      return;
    } else if
    (this.inModelName == null || this.inModelName === "" || this.inModelName === " ") {
      this.alertService.error("set model name", false)
      return;
    }
    this.alertService.clearMeessage();
    this.modelConfig.config2d = new Config2d(); // for 2D
    let createModelT: CreateModel = new CreateModel(ModelStatus.NEW,
      this.bagType.id,
      this.material.id,
      this.inModelName,
      +this.userRoleService.getUserId(),
      JSON.stringify(this.modelConfig),
      JSON.stringify(imageConfig));
    this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
      (data: IModel[]) => {
        this.resetModel();
        this.alertService.success("model " + this.inModelName + " created");
      }, error => console.log(error));
  }


  setColor(r: string, g: string, b: string) {
    b4w.require(this.appName).setImgColor(r, g, b);

  }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }, size?:number) {

    this.restService.getData('./api/panel/' + this.selectedPanel.name).subscribe(
      (panel: Panel) => {
        b4w.require(this.appName).drawPicture(data.src, panel, size);
        // this.imageConfig.image[this.imageConfig.panel.findIndex(p=>p===panel.name)]=data.src;
        let materialOfPanelName = this.modelConfig.config3d.panels.find(p=>p.name===this.selectedPanel.name).material.image;
        this.restService.getDataAny('./api/material/base64/'+materialOfPanelName).subscribe(
          (data:string)=>{
            this.materialOfPanel=data;
            console.log("MATERIAL OF PANEL LOADED")
          }
        )
      }, (panel: any) => console.log("cant get panel by name"));



  }


  changeImage(src: string) {
    this.restService.getDataAny('./api/material/base64/1').subscribe(
      (data: any) => {
        this.pathToMaterials = data;

          b4w.require(this.appName).changeImg(data);

      }, () => console.log('err'));
  }

  selectMaterial(material: BagMaterial, panel?: string, imageOnPanel?: string, scale?: number, x?:number, y?:number) {
    // imgFunction?:{func: Function, funcParam: any[]}) {


    this.material = material;
    let selectedPanel = null;

    if (panel != null) {
      selectedPanel = this.modelConfig.config3d.panels.find((e) => e.name == panel);

      selectedPanel.material = new BagMaterial();
      selectedPanel.material = material;
      // this.onChangePrice.emit(material.price);


    } else {
      for (let i of this.modelConfig.config3d.panels) {
        i.material = material;
      }
    }
    this.restService.getDataAny('./api/material/base64/' + material.image).subscribe(
      (data: any) => {
        this.pathToMaterials = data;

        if (imageOnPanel) {
          b4w.require(this.appName).chooseMaterial(this.pathToMaterials, selectedPanel, imageOnPanel, scale, x, y);
        } else {
          b4w.require(this.appName).chooseMaterial(this.pathToMaterials, selectedPanel);
        }
      }, () => console.log('err'));

  }

  selectBagType(bagtype: BagType) {
  }

  getModelConfig() {
    return this.modelConfig;
  }

  go() {
    b4w.require(this.appName).drawImageNew1();
  }

  clearRectangle() {
    b4w.require(this.appName).clearRectangle(this.modelConfig.config3d.panels);
  }

  loadModel(model: IModel): void {

    this.loadModelMaterial(model);

  }

  private loadModel1(model: IModel): void {
    let imgConf: ImageConfig = JSON.parse(JSON.parse(JSON.stringify(model.imageConfig)));
    for (let a = 0; a < imgConf.panels.length; a++) {
      if (imgConf.image[a] !== null) {
        b4w.require(this.appName).drawPicture(imgConf.image[a], imgConf.panels[a]);
      }
    }
  }

  private loadModelMaterial(model: IModel): void {

    let imgConf: ImageConfig = JSON.parse(JSON.parse(JSON.stringify(model.imageConfig)));
    let idx = imgConf.image.findIndex(p => p != null);
    let panel = imgConf.panels[idx];


    let jStr: string = JSON.parse(JSON.stringify(model.config));
    let obj: Config3d = new Config3d();
    obj.panels = [];
    let arr = [];
    obj = JSON.parse(jStr, ((key, value) => {
      if (key == "image") {
        arr.push(value);
      }
    } ));
    for (let a = 0; a < arr.length; a++) {
      this.modelConfig.config3d.panels[a].material = new BagMaterial();
      this.modelConfig.config3d.panels[a].material.image = arr[a];
    }
    for (let i of this.modelConfig.config3d.panels) {
      if (panel && i.name === panel.name) {
        this.selectMaterial(i.material, i.name, imgConf.image[idx], imgConf.scale[idx],imgConf.posX[idx],imgConf.posY[idx]);
      } else {
        this.selectMaterial(i.material, i.name);
      }

    }

  }

  stopAnimate(): void {
    b4w.require(this.appName).stopAnimate(this.selectedPanel);
  }
  activateEditMode() {
    let canvasElement: any = b4w.require(this.appName).getCanvas();
    canvasElement.addEventListener('mousedown', this.listenerCallback1.bind(this), false);
  }

  activateViewDefaultMode() {
    let canvasElement: any = b4w.require(this.appName).getCanvas();
    canvasElement.removeEventListener();

    b4w.require(this.appName).stopAnimate(this.selectedPanel);
    this.selectedPanel = null;
    this.selectedPanelUpdated.emit(this.selectedPanel);

  }

}
