"use strict";
b4w.register("conf_app", function(exports, require) {

  var m_app = b4w.require("app");
  var m_data = b4w.require("data");
  var m_scenes = require("scenes");
  var m_mat  = require("material");
  var m_obj  = require("__objects");
  var m_print = require("__print");
  var m_batch = require("__batch");

  exports.init = function () {
    m_app.init({
      canvas_container_id: "container_id",
      callback: init_cb
    })
  }

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

  exports.print_all_objects = function () {
    console.log(m_scenes.get_all_objects());
    return m_scenes.get_all_objects();
  }

  exports.object_material_name = function () {
    var cube = m_scenes.get_object_by_name("Cube");
    var material_list = m_mat.get_materials_names(cube);
    console.log(material_list);
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

    (window.web_page_integration_dry_run)
      m_data.load("cube.json", load_cb);
  }
});
b4w.require("conf_app").init();


function click_button() {
  b4w.require("conf_app").print_all_objects();
}

function hide_button() {
  b4w.require("conf_app").hide_show_object();
}

function button_object_material_name() {
  b4w.require("conf_app").object_material_name();
}
