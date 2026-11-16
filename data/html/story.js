// Coming back from the picture viewer (?pic=name): return to that picture in the story.
(function () {
  var pic = new URLSearchParams(location.search).get("pic");
  if (!pic) return;
  function go() {
    var imgs = document.querySelectorAll("figure.plate img");
    for (var i = 0; i < imgs.length; i++) {
      var name = imgs[i].getAttribute("src").split("/").pop().replace(/\.[a-z]+$/, "");
      if (name === pic) { imgs[i].scrollIntoView({ block: "center" }); break; }
    }
  }
  document.addEventListener("DOMContentLoaded", go);
  window.addEventListener("load", function () {
    go();
    history.replaceState(null, "", location.pathname);
  });
})();
