import {IConfigurator} from "../configurator.model";
import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from "@angular/core";
import {Config2d, Config3d, ModelConfig} from "../../models/modelConfig";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {CreateModel, IModel, ModelStatus, BagMaterial, BagType} from "../../models/model";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {Panel} from "./panel.model";
//import {noUndefined} from "@angular/compiler/src/util";
import {isUndefined} from "util";

declare var b4w: any;

@Component({
  selector: 'configurator-3d',
  templateUrl: './configurator3d.component.html'
})
export class Configurator3DComponent implements OnInit, OnDestroy, IConfigurator {

  @Input() private inModelName: string;
  @Input() private currentModel: ModelConfig;
  @Input()
  viewMode : boolean = false;

  @Output() onClearMname = new EventEmitter<string>();
  private modelConfig: ModelConfig;
  private pathToMaterials: string;
  private material: BagMaterial;
  private materials: BagMaterial [] = [];
  private bagType: BagType;
  private jsonString: any;
  private appName: string = "conf_app";
  private sceneName: string = './assets/testConf/Bag_conf.json';
  base64_image_3 = "./assets/testConf/temp/default_img.png";
  base64_image_4 = "./assets/testConf/temp/logo.png";

  constructor(private restService: RestService,
              private userRoleService: UserRoleService,
              private authService: AuthenticationService,
              private alertService: AlertService) {
  }

  ngOnDestroy(): void {
    console.log("Configurator 3d on destroy");
    //b4w.require(this.appName);
    //b4w.delete(this.appName);
  }
  init(){}

  ngOnInit() {
    this.restService.getData("./api/material/list").subscribe(data => this.materials = data);
    b4w.register(this.appName, function (exports, require) {
        var testImg = new Image();
        var m_app = b4w.require("app");
        var m_data = b4w.require("data");
        var m_scenes = require("scenes");
        var m_print = require("__print");
        var m_main = require("main");
        var m_tex = require("textures");
        var m_mat = require("material");
        var m_rgb = require("rgb");

        var _base64_image_3 = "./assets/testConf/temp/default_img.png";
        var _base64_image_4 = "./assets/testConf/temp/logo.png";
        var _img_default = "./assets/testConf/a55bf6d483b813cc325dd7aeb1ce98fc.jpg";

        var _wait_for_image_loading = false;
        var jeans_img = "./images/3d/jeans_2048.jpg";

        exports.init = function () {
          m_app.init({

            canvas_container_id: "canvas_cont",
            callback: init_cb,
            alpha: true,
          })
        }

        exports.drawImageNew = function () {

          var cube = m_scenes.get_object_by_name("pakr_body_001");
          console.log('!!!!!!!!!!!');
          console.log(m_tex.get_texture_names(cube));

          var ctx_image = m_tex.get_canvas_ctx(cube, "bag_front_text_img");
          var img = new Image();
          img.src = jeans_img;


          img.onload = function () {
            var canvas = ctx_image.canvas;
            console.log(canvas.width);
            console.log(img.width);
            var hRatio = canvas.width / img.width;
            console.log(hRatio);
            var vRatio = canvas.height / img.height;
            console.log(vRatio);
            var ratio = Math.max(hRatio, vRatio);
            console.log("RATIO!!!");
            console.log(ratio);
            var centerShift_x = ( canvas.width - img.width ) / 2;
            var centerShift_y = ( canvas.height - img.height ) / 2;
            // ctx_image.clearRect(0,0,canvas.width, canvas.height);
            console.log("==========");
            console.log(img.width);
            console.log(img.height);
            console.log(centerShift_x);
            console.log(centerShift_y);
            console.log(img.width * ratio);
            console.log(img.height * ratio);
            ctx_image.drawImage(img, 0, 0, img.width, img.height,
              centerShift_x + (img.width * ratio), centerShift_y + (img.width * ratio), img.width * ratio, img.height * ratio);

            // ctx_image.drawImage(img, 50, 50, ctx_image.canvas.width, ctx_image.canvas.height);
            m_tex.update_canvas_ctx(cube, "bag_front_text_img");
          }
        }


        exports.drawImageNew1 = function () {

          var cube = m_scenes.get_object_by_name("bag_front");
          var cube_body = m_scenes.get_object_by_name("bag_body");
          console.log('!!!!!!!!!!!');
          console.log(m_tex.get_texture_names(cube));

          var ctx_image = m_tex.get_canvas_ctx(cube, "bag_front_text_img");
          var ctx_image_body = m_tex.get_canvas_ctx(cube_body, "bag_body_text_img");
          console.log('!!!!!!!!!!!');
          console.log(m_tex.get_canvas_ctx(cube, "bag_front_text_img"));
          var img = new Image();
          img.src = jeans_img;

          img.onload = function () {

            ctx_image.drawImage(img, 0, 0, ctx_image.canvas.width, ctx_image.canvas.height);
            m_tex.update_canvas_ctx(cube, "bag_front_text_img");
            ctx_image_body.drawImage(img, 0, 0, ctx_image_body.canvas.width, ctx_image_body.canvas.height);
            m_tex.update_canvas_ctx(cube_body, "bag_body_text_img");
          }
        }

        exports.clearRectangle = function (panels?:Panel[]) {

            if (panels==null){
              console.log("no panels to clear");
            }else {
              for (let i of panels){
                let obj = m_scenes.get_object_by_name(i.name);
                let ctx2D = m_tex.get_canvas_ctx(obj, i.texture);
                ctx2D.clearRect(0, 0, ctx2D.canvas.width, ctx2D.canvas.height);
                m_tex.update_canvas_ctx(obj, i.texture);

              }
            }

        }
        exports.drawImage3 = function () {
          let cube = m_scenes.get_object_by_name("pakr_body_001");
          m_tex.change_image(cube, "Texture", _base64_image_3);
        }

        function change_img_cb() {
          _wait_for_image_loading = false;
        }


        function load_cb() {

          m_app.enable_camera_controls();

          var object_exists = m_scenes.check_object_by_name("pakr_body_001");
          if (object_exists) {
            console.log("Object is found");
          } else {
            m_print.error("Object is not found");
          }


          var Cube = m_scenes.get_object_by_name("pakr_body_001");
          var name = m_scenes.get_object_name(Cube);


          console.log(name);
        }


        function load_data(imageUrl: string) {
          let cube = m_scenes.get_object_by_name("pakr_body_001");
          let texture = m_tex.get_canvas_ctx(cube, "Texture.003");
          let img = new Image();
          img.src = imageUrl;
          img.onload = function () {
            let texture = m_tex.get_canvas_ctx(cube, "Texture.003");
            texture.drawImage(img, 0, 0, texture.canvas.width, texture.canvas.height);
            m_tex.update_canvas_ctx(cube, "Texture.003");
          }
        }

        exports.chooseMaterial = function (material: string, panel?: Panel) {
          let object = m_scenes.get_object_by_name("bag_front");
          let object_body = m_scenes.get_object_by_name("bag_body");
          let rendering_ctx = m_tex.get_canvas_ctx(object, "bag_front_text_img");
          let ctx_image_body = m_tex.get_canvas_ctx(object_body, "bag_body_text_img");
          let img = new Image();
          console.log('drawing');
          img.src = material;

          img.onload = function () {
            if (panel != null) {
              let panel_object = m_scenes.get_object_by_name(panel.name);
              let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, panel.texture);
              ctx2Dpanel.drawImage(img, 0, 0, ctx2Dpanel.canvas.width, ctx2Dpanel.canvas.height);
              m_tex.update_canvas_ctx(panel_object, panel.texture);
            } else {
              let object = m_scenes.get_object_by_name("bag_front");
              rendering_ctx.drawImage(img, 0, 0, rendering_ctx.canvas.width, rendering_ctx.canvas.height);
              m_tex.update_canvas_ctx(object, "bag_front_text_img");
              ctx_image_body.drawImage(img, 0, 0, ctx_image_body.canvas.width, ctx_image_body.canvas.height);
              m_tex.update_canvas_ctx(object_body, "bag_body_text_img");
            }
          }
        }

        exports.setImgColor = function (r: number, g: number, b: number) {

          let cube = m_scenes.get_object_by_name("pakr_body_001");
          m_mat.set_nodemat_rgb(cube, ["Material", "RGB"], r, g, b,);
        }

        exports.resetImgColor = function (panels?:Panel[]) {
          if (panels==null){
            let cube = m_scenes.get_object_by_name("pakr_body_001");
            m_tex.change_image(cube, "Texture.003", _img_default);
          }else {
            for (let i of panels){
              let obj = m_scenes.get_object_by_name(i.name);
              m_tex.change_image(obj, "Texture.003", _img_default);

            }
          }
        }

        function init_cb(canvas_elem, success) {
          if (!success) {

            console.log("b4w init failure");
            return;
          }

          m_data.load('./assets/testConf/demo_bag.json', load_cb,);
        }

      }
    )
    b4w.require(this.appName).init();


    //todo get bag type from DB
    if (this.bagType == null) {
      this.bagType = new BagType();
      this.bagType.id = 1;
    }
    if (this.modelConfig == null) {
      this.modelConfig = new ModelConfig();
      this.modelConfig.config3d = new Config3d();
    }
    this.restService.getData('./api/panel/list').subscribe((data: any) => {
        this.modelConfig.config3d.panels = data;
        console.log('onInit data:');
        console.log(data);
      },
      () => console.log('cant receive panels'));
    if (this.currentModel != null) {
      console.log("this.currentModel!=null");
      for (let i of this.modelConfig.config3d.panels) {
        this.selectMaterial(i.material, i.name);
      }
    }

  }

  resetModel() {
    this.clearRectangle();
   // b4w.require(this.appName).resetImgColor();
    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
  }

  save(modelConfig: ModelConfig) {
    if (!this.authService.isAuthenticated()) {
      this.alertService.error("Login to save models!");
      return;
    }
    if  (this.material == null ){
      this.alertService.error("Select material!", false)
      return;
    } else if
    (this.bagType == null ){
      this.alertService.error("Select bagtype!", false)
      return;
    }else if
    (this.inModelName == null || this.inModelName ==="" || this.inModelName ===" " ){
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
      JSON.stringify(this.modelConfig));
    console.log(this.modelConfig);
    console.log(createModelT);
    this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
      (data: IModel[]) => {
        this.resetModel();
        this.alertService.success("model " + this.inModelName + " created");
      }, error => console.log(error));
  }


  setColor(r: string, g: string, b: string) {
    console.log(r, g, b);
    b4w.require(this.appName).setImgColor(r, g, b);

  }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }) {
    console.log('data');
    console.log(data);
    /*let filePath = "backend\\src\\main\\resources\\static\\" +this.userRoleService.getUserId()+"\\"+data.file.name;*/
    let filePath : string = "./images/" +this.userRoleService.getUserId()+"/"+data.file.name;
    this.modelConfig.image = filePath; // store User pic for 2d/3d? configurator
    console.log(filePath);

  }


  changeImage(src: string) {

  }

  selectMaterial(material: BagMaterial, panel?: string) {
    this.material = material;
    console.log(material.image);
    console.log('this.bagType.script.panels.find((e)=>e.name==panel)');
    let selectedPanel = null;
    if (panel != null) {
      selectedPanel = this.modelConfig.config3d.panels.find((e) => e.name == panel);
      selectedPanel.material = material;
    }else {
      for (let i of this.modelConfig.config3d.panels){
        i.material=material;
      }
  }
    this.restService.getDataAny('./api/material/base64/' + material.image).subscribe(
      (data: any) => {
        this.pathToMaterials = data;
        console.log("this.pathToMaterials");
        b4w.require(this.appName).chooseMaterial(this.pathToMaterials, selectedPanel);
      }, () => console.log('err'));

  }

  selectBagType(bagtype: BagType) {
    console.log("method not implemented. bagtype name - " + bagtype.name)
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

   loadModel(model: IModel) : void{
    console.log("Hello from 3d!");

    let jStr : string  = JSON.parse(JSON.stringify(model.config));
    let obj : Config3d = new Config3d();
    obj.panels=[];
    console.log(JSON.parse(jStr));
    let arr = [];
    obj = JSON.parse(jStr, ((key, value) => {
      if (key=="image"){
        arr.push(value);
      }
    } ));
    for(let a=0; a<arr.length; a++){
      this.modelConfig.config3d.panels[a].material = new BagMaterial();
      this.modelConfig.config3d.panels[a].material.image=arr[a];
    }
    for (let i of this.modelConfig.config3d.panels) {
      this.selectMaterial(i.material, i.name);
    }
  }

}
