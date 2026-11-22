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

// Arriving from a chronology page (?q=quoted passage): mark that passage and scroll to it.
// The passage is found by its letters and digits only, so punctuation, italics and line
// breaks do not matter and the story needs no ids.
(function () {
  var q = new URLSearchParams(location.search).get("q");
  if (!q) return;
  function ok(c) { return (c >= "a" && c <= "z") || (c >= "0" && c <= "9"); }
  document.addEventListener("DOMContentLoaded", function () {
    var art = document.querySelector("article");
    if (!art) return;
    var need = "", i, c;
    for (i = 0; i < q.length; i++) { c = q[i].toLowerCase(); if (ok(c)) need += c; }
    if (!need) return;
    var walk = document.createTreeWalker(art, NodeFilter.SHOW_TEXT), n, hay = [], nodes = [], offs = [];
    while ((n = walk.nextNode())) {
      var t = n.nodeValue;
      for (i = 0; i < t.length; i++) {
        c = t[i].toLowerCase();
        if (ok(c)) { hay.push(c); nodes.push(n); offs.push(i); }
      }
    }
    var at = hay.join("").indexOf(need);
    if (at < 0) return;
    var parts = [], last = null;
    for (i = at; i < at + need.length; i++) {
      if (nodes[i] !== last) { parts.push({ node: nodes[i], from: offs[i], to: offs[i] }); last = nodes[i]; }
      parts[parts.length - 1].to = offs[i];
    }
    var first = null;
    for (i = parts.length - 1; i >= 0; i--) {
      var r = document.createRange(), m = document.createElement("mark");
      r.setStart(parts[i].node, parts[i].from);
      r.setEnd(parts[i].node, parts[i].to + 1);
      m.className = "hl";
      r.surroundContents(m);
      first = m;
    }
    function go() { if (first) first.scrollIntoView({ block: "center" }); }
    go();
    window.addEventListener("load", go);
  });
})();
