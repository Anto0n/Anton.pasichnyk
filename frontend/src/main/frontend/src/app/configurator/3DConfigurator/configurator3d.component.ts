import {IConfigurator} from "../configurator.model";
import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from "@angular/core";
import {Config2d, Config3d, ModelConfig} from "../../models/modelConfig";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {CreateModel, IModel, ModelStatus, BagMaterial, BagType} from "../../models/model";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {Panel} from "./panel.model";
import {Element} from "@angular/compiler";

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
  @Output() onClearMname = new EventEmitter<string>();

  @Output()
  selectedPanelUpdated = new EventEmitter<string>();

  modelConfig: ModelConfig;
  private pathToMaterials: string;
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
    //todo implement b4w dispose

  }

  init() {
  }


  listenerCallback1(e: MouseEvent) {

    b4w.require(this.appName).listenerCallback(e);

  }

  ngOnInit() {

    this.restService.getData("./api/material/list").subscribe(data => this.materials = data);
    b4w.register(this.appName, function (exports, require) {
        let m_app = b4w.require("app");
        let m_mouse = b4w.require("mouse");
        let m_data = b4w.require("data");
        let m_scenes = require("scenes");
        let m_tex = require("textures");
        let m_mat = require("material");
        let m_container = require("container");
        let m_preloader = require("preloader");
        let m_version = require("version");
        let jeans_img = "./images/3d/jeans_2048.jpg";
        let DEBUG = (m_version.type() === "DEBUG");

        exports.getCanvas = m_container.get_canvas;

        exports.listenerCallback = function (event) {
          // if (event.preventDefault) {
          //   event.preventDefault();
          // }
          console.log(this);
          var y = m_mouse.get_coords_y(event);
          var x = m_mouse.get_coords_x(event);
          console.log(m_scenes);
          var pickedObject = m_scenes.pick_object(event.offsetX, event.offsetY);
          console.log(pickedObject);
          if (pickedObject) {
          //   this.outlineOff();
            // var _object = configuratorObject3d.getByObjectName(pickedObject.name);
            // if (_object) {
            //   _object.pick();
            //   $rootScope.target = _object;
              m_scenes.set_outline_color([0, 0.6, 1]);
              m_scenes.apply_outline_anim(pickedObject,  1.2, 1.2, 0);
            //   $scope.$emit('editModeOn', _object);
            // }
          }
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


        exports.chooseMaterial = function (material: string, panel?: Panel) {


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
              console.log(ctx2Dpanel.canvas.width);
              console.log(ctx2Dpanel.canvas.height);
              ctx2Dpanel.drawImage(img, 0, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              ctx2Dpanel.drawImage(img, ctx2Dpanel.canvas.width / 2, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              ctx2Dpanel.drawImage(img, 0, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
              ctx2Dpanel.drawImage(img, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.width / 2, ctx2Dpanel.canvas.height / 2);
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
        exports.drawPicture = function (src: string) {
          let panel_object = m_scenes.get_object_by_name("bag_front");
          let ctx2Dpanel = m_tex.get_canvas_ctx(panel_object, "bag_front_text_img");
          let img = new Image();
          img.src = src;

          img.onload = function () {
            ctx2Dpanel.drawImage(img, ctx2Dpanel.canvas.width / 3, ctx2Dpanel.canvas.width / 3,
              ctx2Dpanel.canvas.width / 3, ctx2Dpanel.canvas.height / 3);
            m_tex.update_canvas_ctx(panel_object, "bag_front_text_img");
          }

        }


        function init_cb(canvas_elem, success) {
          if (!success) {
            return;
          }
          m_preloader.create_preloader({
            container_color: "#000000", // background color of the container
            bar_color: "#6cbeee", // background color of the bar
            frame_color: "#ffffff", // color of the frame border
            font_color: "#ffffff" // color of the font
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
    }
    this.restService.getData('./api/panel/list').subscribe((data: any) => {
        this.modelConfig.config3d.panels = data;
      },
      () => console.log('cant receive panels'));
    if (this.currentModel != null) {
      for (let i of this.modelConfig.config3d.panels) {
        this.selectMaterial(i.material, i.name);
      }
    } else {
      setTimeout(() => {

        this.restService.getData('./api/models/1').subscribe((data: any) => {
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
          },
          () => console.log('cant receive default model'));
      }, 3000);

    }

  }

  resetModel() {
    this.clearRectangle();

    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
  }

  save(modelConfig: ModelConfig) {
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
      JSON.stringify(this.modelConfig));
    this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
      (data: IModel[]) => {
        this.resetModel();
        this.alertService.success("model " + this.inModelName + " created");
      }, error => console.log(error));
  }


  setColor(r: string, g: string, b: string) {
    b4w.require(this.appName).setImgColor(r, g, b);

  }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }) {
    b4w.require(this.appName).drawPicture(data.src);
  }


  changeImage(src: string) {

  }

  selectMaterial(material: BagMaterial, panel?: string) {
    this.material = material;
    let selectedPanel = null;

    if (panel != null) {
      selectedPanel = this.modelConfig.config3d.panels.find((e) => e.name == panel);

      selectedPanel.material = new BagMaterial();
      selectedPanel.material = material;


    } else {
      for (let i of this.modelConfig.config3d.panels) {
        i.material = material;
      }
    }
    this.restService.getDataAny('./api/material/base64/' + material.image).subscribe(
      (data: any) => {
        this.pathToMaterials = data;
        b4w.require(this.appName).chooseMaterial(this.pathToMaterials, selectedPanel);
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
      this.selectMaterial(i.material, i.name);
    }
  }

  a: number = 10;

  activateEditMode() {
    let canvasElement: any = b4w.require(this.appName).getCanvas();
    canvasElement.addEventListener('mousedown', this.listenerCallback1.bind(this), false);
  }

}
