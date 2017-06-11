import {IConfigurator} from "../configurator.model";
import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {Config2d, ModelConfig} from "../../models/modelConfig";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {CreateModel, IModel, ModelStatus, BagMaterial, BagType} from "../../models/model";

declare var b4w: any;

@Component({
  selector: 'configurator-3d',
  template: `<div id="canvas_cont" STYLE="width: 1000px"></div>`
})
export class Configurator3DComponent implements OnInit, IConfigurator {
  @Input() private inModelName : string;
  @Output() onClearMname = new EventEmitter<string>();
  private modelConfig: ModelConfig;
  private pathToMaterials: string;
  private jsonString: any;
  private appName: string = "conf_app";
  private sceneName: string = './assets/testConf/Bag_conf.json';
  base64_image_3 = "./assets/testConf/temp/default_img.png";
  base64_image_4 = "./assets/testConf/temp/logo.png";


  constructor(private restService: RestService, private userRoleService: UserRoleService) {
  }


  ngOnInit() {
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
      var jeans_img = "./assets/img/jeans_2048.jpg";

      exports.init = function () {
        m_app.init({

          canvas_container_id: "canvas_cont",
          callback: init_cb,
          alpha: true,
        })
      }

      exports.drawImageNew = function() {

        var cube = m_scenes.get_object_by_name("pakr_body_001");
        console.log('!!!!!!!!!!!');
        console.log(m_tex.get_texture_names(cube));

        var ctx_image = m_tex.get_canvas_ctx(cube, "bag_front_text_img");
        var img = new Image();
        img.src = jeans_img;




        img.onload = function() {
          var canvas = ctx_image.canvas ;
          console.log(canvas.width);
          console.log(img.width);
          var hRatio = canvas.width  / img.width    ;
          console.log(hRatio);
          var vRatio =  canvas.height / img.height  ;
          console.log(vRatio);
          var ratio  = Math.max ( hRatio, vRatio );
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
          console.log(img.width*ratio);
          console.log(img.height*ratio);
          ctx_image.drawImage(img, 0,0, img.width, img.height,
            centerShift_x+(img.width*ratio),centerShift_y+(img.width*ratio),img.width*ratio, img.height*ratio);

          // ctx_image.drawImage(img, 50, 50, ctx_image.canvas.width, ctx_image.canvas.height);
          m_tex.update_canvas_ctx(cube, "bag_front_text_img");
        }
      }



      exports.drawImageNew1 = function() {

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

        img.onload = function() {

          ctx_image.drawImage(img, 0, 0, ctx_image.canvas.width, ctx_image.canvas.height);
          m_tex.update_canvas_ctx(cube, "bag_front_text_img");
          ctx_image_body.drawImage(img, 0, 0, ctx_image_body.canvas.width, ctx_image_body.canvas.height);
          m_tex.update_canvas_ctx(cube_body, "bag_body_text_img");
        }
      }

      exports.clearRectangle = function () {
        var cube = m_scenes.get_object_by_name("bag_front");

        var ctx2D = m_tex.get_canvas_ctx(cube, "bag_front_text_img");
        ctx2D.clearRect(0,0, ctx2D.canvas.width, ctx2D.canvas.height);
        m_tex.update_canvas_ctx(cube, "bag_front_text_img");
      }
      exports.drawImage3 = function(){
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
        console.log(cube);
        console.log('!!!!!!!!!!!');
        console.log(texture);
        console.log('!!!!!!!!!!!');
        console.log(texture);
        // m_tex.update_canvas_ctx(cube, "Texture.003");

        let img = new Image();
        img.src = imageUrl;
        img.onload = function () {
          let texture = m_tex.get_canvas_ctx(cube, "Texture.003");
          // texture.removeHitRegion();
          texture.drawImage(img, 0, 0, texture.canvas.width,  texture.canvas.height);
          // texture.fillStyle = "rgba(255,0,0,255)";
          // texture.font = "250px Arial";
          // texture.fillText("Hello, World!", 300, 300);
          m_tex.update_canvas_ctx(cube, "Texture.003");
        }
      }

      exports.chooseMatrial = function (material:string){
        let object = m_scenes.get_object_by_name("bag_front");
        let object_body = m_scenes.get_object_by_name("bag_body");
        let rendering_ctx = m_tex.get_canvas_ctx(object, "bag_front_text_img");
        let ctx_image_body = m_tex.get_canvas_ctx(object_body, "bag_body_text_img");
        let img = new Image();
        console.log('drawing');
        img.src = material;

        img.onload = function() {

          rendering_ctx.drawImage(img, 0, 0, rendering_ctx.canvas.width, rendering_ctx.canvas.height);
          m_tex.update_canvas_ctx(object, "bag_front_text_img");
          ctx_image_body.drawImage(img, 0, 0, ctx_image_body.canvas.width, ctx_image_body.canvas.height);
          m_tex.update_canvas_ctx(object_body, "bag_body_text_img");
        }
      }

      exports.setImgColor = function (r: number, g: number, b: number) {

        let cube = m_scenes.get_object_by_name("pakr_body_001");
        m_mat.set_nodemat_rgb(cube, ["Material", "RGB"], r, g, b,);
      }

      exports.resetImgColor = function () {
        let cube = m_scenes.get_object_by_name("pakr_body_001");
        m_tex.change_image(cube, "Texture.003", _img_default);
      }

      function init_cb(canvas_elem, success) {
        if (!success) {

          console.log("b4w init failure");
          return;
        }

        m_data.load('./assets/testConf/demo_bag.json', load_cb,);
      }

    })


    b4w.require(this.appName).init();
  }

  resetModel(){
    b4w.require(this.appName).resetImgColor();
    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
  }

  save(modelConfig: ModelConfig) {
    let app = b4w.require(this.appName);
    modelConfig.image="./images/2dtest1.jpg";
    modelConfig.config2d = new Config2d();
    console.log(modelConfig);
    let createModelT : CreateModel = new CreateModel(ModelStatus.NEW, 1,1, "new model name", +this.userRoleService.getUserId(), JSON.stringify(modelConfig));
    this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
      (data: IModel[]) => {
        console.log(data);
      }, () => console.log('err'));

  }

  setColor(r: string, g: string, b: string) {
    console.log(r, g, b);
    b4w.require(this.appName).setImgColor(r, g, b);

  }

  imageUploaded(data: {src:string, pending: boolean, file: {name: string, size: number, type: string}}){
    console.log('data');
    console.log(data);
    /*let filePath = "backend\\src\\main\\resources\\static\\" +this.userRoleService.getUserId()+"\\"+data.file.name;*/
    let filePath = "./images/" +this.userRoleService.getUserId()+"/"+data.file.name;
    console.log(filePath);

  }


  changeImage(src:string){

  }

  selectMaterial(material: BagMaterial) {
    console.log("method not implemented. material name - " + material.name+"  "+ material.image);
    this.restService.getDataAny('/api/material/base64/'+material.image).subscribe(
      (data: any) => {
        console.log("-------------");
        console.log("data");
        console.log("-------------");
        this.pathToMaterials=data;
        console.log( "this.pathToMaterials");
        b4w.require(this.appName).chooseMatrial(this.pathToMaterials);
      }, () => console.log('err'));

  }

  selectBagType(bagtype : BagType){
    console.log("method not implemented. bagtype name - " + bagtype.name)
  }

  getModelConfig(){
    return this.modelConfig;
  }

  go(){
    b4w.require(this.appName).drawImageNew1();
  }

  clearRectangle(){
    b4w.require(this.appName).clearRectangle();
  }
}
