"use strict"

// register the application module
b4w.register("test", function(exports, require) {

// import modules used by the app
var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_obj       = require("objects");
var m_preloader = require("preloader");
var m_scenes    = require("scenes");
var m_tex       = require("textures");
var m_ver       = require("version");

// detect application mode
var DEBUG = (m_ver.type() == "DEBUG");

// automatically detect assets path
var APP_ASSETS_PATH = m_cfg.get_std_assets_path() + "test/";

/**
 * export the method to initialize the app (called at the bottom of this file)
 */
exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * callback executed when the app is initialized
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * load the scene data
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "test.json", load_cb, preloader_cb);
}

/**
 * update the app's preloader
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * callback executed when the scene data is loaded
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // place your code here

    init_sliders();
    load_image();
}

function init_sliders() {
    var plane = m_scenes.get_object_by_name("Plane");

    var x_slider = document.getElementById("x_coord");
    x_slider.oninput = function(e) {
        m_obj.set_nodemat_value(plane, ["Material.001", "x_coord"], x_slider.value);
    }

    var y_slider = document.getElementById("y_coord");
    y_slider.oninput = function(e) {
        m_obj.set_nodemat_value(plane, ["Material.001", "y_coord"], y_slider.value);
    }
}

function load_image() {

    var plane = m_scenes.get_object_by_name("Plane");
    var ctx = m_tex.get_canvas_ctx(plane, "canvas_tex");

    var img = new Image();
    img.src = APP_ASSETS_PATH + "logo.png";
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        m_tex.update_canvas_ctx(plane, "canvas_tex");
    }
}


});

// import the app module and start the app by calling the init method
b4w.require("test").init();
