/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit} from '@angular/core';
import {RestService} from "../shared/services/rest.service";

declare var b4w: any;

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['../../assets/testConf/style.css']
})
export class ConfiguratorComponent implements OnInit {
  private jsonString: any;
  private appName: string = "conf_app";

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    b4w.register("conf_app", function (exports, require) {

      var m_app = b4w.require("app");
      var m_data = b4w.require("data");
      var m_scenes = require("scenes");
      var m_print = require("__print");

      exports.init = function () {
        m_app.init({
          canvas_container_id: "canvas_cont",
          callback: init_cb,
          alpha: true,
        })
      };

      function load_cb() {
        m_app.enable_camera_controls();

        var object_exists = m_scenes.check_object_by_name("Cube");
        if (object_exists) {
          console.log("Object is found");
        } else {
          m_print.error("Object is not found");
        }


        var cube = m_scenes.get_object_by_name("Cube");
        var name = m_scenes.get_object_name(cube);
        console.log(name);
      }

      exports.hide_show_object = function () {
        var cube = m_scenes.get_object_by_name("Cube");
        var object_is_hidden = m_scenes.is_hidden(cube);

        if (!object_is_hidden) {
          m_scenes.hide_object(cube);
        } else {
          m_scenes.show_object(cube);
        }
      }
      function init_cb(canvas_elem, success) {
        if (!success) {
          console.log("b4w init failure");
          return;
        }

        m_data.load("./assets/testConf/cube.json", load_cb,);
      }

    });
    b4w.require("conf_app").init();
  }

  getBag() {
    this.restService.getData('./api/user/1')
      .subscribe((data: any) => {
        this.jsonString = data;
        console.log(data);
      });
  }

  do(){
    b4w.require(this.appName).hide_show_object();
  }
}
