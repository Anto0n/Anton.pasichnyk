/**
 * Created by Potaychuk Sviatoslav on 01.05.2017.
 */
"use strict";
b4w.register("example_main", function(exports, require) {

  var m_anim   = require("animation");
  var m_app    = require("app");
  var m_data   = require("data");
  var m_main   = require("main");
  var m_scs    = require("scenes");
  var m_sfx    = require("sfx");

  exports.init = function() {
    m_app.init({
      canvas_container_id: "canvas_cont",
      callback: init_cb,
      physics_enabled: false,
      alpha: true,
      // report_init_failure: false,
      // media_auto_activation: false
    });

  }

  function init_cb(canvas_elem, success) {
    if (!success) {
      console.log("b4w init failure");
      return;
    }else {
      console.log("!b4w init failure");
    }
    //
    // if (window.web_page_integration_dry_run)
    //   m_data.load("CE.json", load_cb);
    // else
      m_data.load("preview.json", load_cb);

    // resize();

    // window.addEventListener("resize", resize);
  }

  // function resize() {
  //   m_app.resize_to_container();
  // }

  function load_cb() {
    // var letters_arm = m_scs.get_all_objects();
    // console.log(letters_arm);
    // m_anim.stop(letters_arm);
    m_app.enable_camera_controls();

    // run_button.addEventListener("mousedown", demo_link_click, false);
  }

  // function demo_link_click(e) {
  //   m_data.activate_media();
  //
  //   var letters_arm = m_scs.get_object_by_name('beads_armature');
  //   var spk = m_scs.get_object_by_name("Speaker");
  //
  //   m_sfx.play_def(spk);
  //   m_anim.apply(letters_arm, "flying_letters");
  //   m_anim.play(letters_arm, letters_obj_cb);
  // }

  // function letters_obj_cb(obj) {
  //   m_anim.apply(obj, "flying_letters_idle");
  //   m_anim.set_behavior(obj, m_anim.AB_CYCLIC);
  //   m_anim.play(obj);
  // }

  exports.testDemoConsoleObjectPrint = function () {
    var letters_arm = m_scs.get_all_objects();
    console.log("testDemoConsoleObjectPrint");
    console.log(letters_arm);
  }

  exports.testSetVisible = function () {
    let mball = m_scs.get_object_by_name("Mball");
    if(!(m_scs.is_hidden(mball))) {
      m_scs.hide_object(m_scs.get_object_by_name("Mball"));
    }else {
      m_scs.show_object(m_scs.get_object_by_name("Mball"));
    }
  }
});

let em = b4w.require("example_main");
em.init();

function qwe(){
  em.testDemoConsoleObjectPrint();

}
function qwe2(){
  em.testSetVisible();

}

