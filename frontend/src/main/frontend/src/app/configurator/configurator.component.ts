/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit} from '@angular/core';
import {RestService} from "../services/rest.service";

declare var b4w: any;


@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['../../assets/testConf/test.css']
})
export class ConfiguratorComponent implements OnInit {
  private jsonString: any;
  private appName: string = "conf_app";
  private sceneName: string = '../../assets/testConf/Bag_conf.json';

  constructor(private restService: RestService) {
  }


  ngOnInit() {
    b4w.register(this.appName, function (exports, require) {

      var m_app = b4w.require("app");
      var m_data = b4w.require("data");
      var m_scenes = require("scenes");
      var m_print = require("__print");
      var m_main   = require("main");
      var m_tex    = require("textures");
      var _base64_image_1 = '../../assets/testConf/temp/default_img.png';

       var _wait_for_image_loading = false;
      var _img_1 = null;

      exports.init = function () {
        m_app.init({
          canvas_container_id: "canvas_cont",
          callback: init_cb,
          alpha: true,
        })
      }

      function change_img_cb() {
        _wait_for_image_loading = false;
      }


      function load_cb() {

        m_app.enable_camera_controls();

        var object_exists = m_scenes.check_object_by_name("Cube");
        if (object_exists) {
          console.log("Object is found");
        } else {
          m_print.error("Object is not found");
        }


        var Cube = m_scenes.get_object_by_name("Cube");
        var name = m_scenes.get_object_name(Cube);
        console.log(name);

        // _img_1 = new Image();
        // _img_1.src = _base64_image_1;
        //
        // _img_1.onload = function () {
        //   load_my_image();

        }
      // }

      function load_data() {
        var cube = m_scenes.get_object_by_name("arch49_014_obj_02");
        // var ctx_image = m_tex.get_canvas_ctx(cube, "Image");
        // var ctx_video = m_tex.get_canvas_ctx(cube, "Video");
        var ctx_picture = m_tex.get_canvas_ctx(cube, "canvas_tex");


          var img = new Image();
          img.src = _base64_image_1;
          img.onload = function() {
            ctx_picture.drawImage(img, 0, 0, ctx_picture.canvas.width,
              ctx_picture.canvas.height);
            ctx_picture.fillStyle = "rgba(255,0,0,255)";
            ctx_picture.font = "250px Arial";
            ctx_picture.fillText("Hello, World!", 300, 300);
            m_tex.update_canvas_ctx(cube, "canvas_tex");
          }
      }



      function draw_images(){
        var ctx_1 = m_tex.get_canvas_texture_context("canvas_1");
        ctx_1.drawImage(_img_1, 0, 0, ctx_1.canvas.width,ctx_1.canvas.height);
        m_tex.update_canvas_texture_context("canvas_1");
      }


      exports.drowImage1 = function(){
        // let img = new Image();
        // let obj = m_scenes.get_object_by_name("arch49_014_obj_02");
        // console.log("get_object_by_name");
        // console.log(obj);
        // console.log("textures");
        // console.log(m_tex.get_texture_names(obj));
        // if (obj && !_wait_for_image_loading) {
        //   m_tex.change_image(obj, "canvas_tex", _base64_image_1, change_img_cb);
        //   console.log("1111change_image11");
        // }
        load_data();
      }
      exports.hide_show_object = function () {
        var Cube = m_scenes.get_object_by_name("Cube");
        var object_is_hidden = m_scenes.is_hidden(Cube);

        if (!object_is_hidden) {
          m_scenes.hide_object(Cube);
        } else {
          m_scenes.show_object(Cube);
        }
      }
      function init_cb(canvas_elem, success) {
        if (!success) {
          console.log("b4w init failure");
          return;
        }

        m_data.load('../../assets/testConf/Bag_conf.json', load_cb,);
      }

      function load_my_image() {
        var cube = m_scenes.get_object_by_name("Cube");
        var ctx = m_tex.get_canvas_ctx(cube, "Material");
        console.log(m_tex.get_texture_names(cube));
      }

    })


    b4w.require(this.appName).init();
  }

  getBag() {
    this.restService.getData('./api/user/1')
      .subscribe((data: any) => {
        this.jsonString = data;
        console.log(data);
      });


  }

  do() {
    b4w.require(this.appName).hide_show_object();
  }

  getModel1() {
    b4w.require(this.appName).drowImage1();
  }
  getModel2() {
    b4w.require(this.appName).hide_show_object();
  }
}
