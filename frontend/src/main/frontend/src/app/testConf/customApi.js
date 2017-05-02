b4w.register("example_main", function (h, a) {
  function k(u, a) {
    if (a) {
      var b = window.web_page_integration_dry_run ? l.get_std_assets_path() + "tutorials/web_page_integration/flying_letters.json" : "/assets/tutorials/web_page_integration/flying_letters.json";
      e.load(b, m);
      f();
      window.addEventListener("resize", f)
    } else console.log("b4w init failure")
  }

  function f() {
    n.resize_to_container()
  }

  function m() {
    var a = d.get_object_by_name("beads_armature"), c = document.getElementById("run_button");
    b.stop(a);
    c.addEventListener("mousedown",
      p, !1)
  }

  function p() {
    e.activate_media();
    var a = d.get_object_by_name("beads_armature"), c = d.get_object_by_name("Speaker");
    q.play_def(c);
    b.apply(a, "flying_letters");
    b.play(a, r)
  }

  function r(a) {
    b.apply(a, "flying_letters_idle");
    b.set_behavior(a, b.AB_CYCLIC);
    b.play(a)
  }

  var b = a("animation"), t = a("app"), l = a("config"), n = a("container"), e = a("data"), d = a("scenes"),
    q = a("sfx"), g = "DEBUG" === a("version").type();
  h.init = function () {
    t.init({
      canvas_container_id: "canvas_cont", callback: k, physics_enabled: !1, alpha: !0, assets_dds_available: !g,
      assets_min50_available: !g, report_init_failure: !1, media_auto_activation: !1
    })
  }
});
b4w.require("example_main").init();
