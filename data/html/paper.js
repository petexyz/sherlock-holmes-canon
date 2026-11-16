// Page mode: Light, Dark or Aged paper, chosen from a drop-down in the top bar.
// Starts from the system setting; the choice is remembered per browser.
(function () {
  var MODES = ["light", "dark", "aged"];
  var NAMES = { light: "Light", dark: "Dark", aged: "Aged page" };
  var root = document.documentElement, mode = null;
  try {
    mode = localStorage.getItem("pageMode");
    if (!mode && localStorage.getItem("agedPaper") === "1") mode = "aged";
  } catch (e) {}
  if (MODES.indexOf(mode) < 0) mode = null;
  function current() {
    if (mode) return mode;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function apply() {
    MODES.forEach(function (m) { root.classList.toggle(m, mode === m); });
  }
  apply();
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector("nav.top");
    if (!nav) return;
    var label = document.createElement("label");
    label.className = "mode";
    var sel = document.createElement("select");
    sel.setAttribute("aria-label", "Page mode");
    MODES.forEach(function (m) {
      var o = document.createElement("option");
      o.value = m;
      o.textContent = NAMES[m];
      sel.appendChild(o);
    });
    sel.value = current();
    sel.addEventListener("change", function () {
      mode = sel.value;
      apply();
      try { localStorage.setItem("pageMode", mode); } catch (e) {}
    });
    label.appendChild(sel);
    nav.appendChild(label);
  });
})();
