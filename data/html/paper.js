// Aged-paper look: remembered per browser, toggled by a button added to the top bar.
(function () {
  var root = document.documentElement, on = false;
  try { on = localStorage.getItem("agedPaper") === "1"; } catch (e) {}
  root.classList.toggle("aged", on);
  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector("nav.top");
    if (!nav) return;
    var b = document.createElement("button");
    b.className = "paper";
    function label() { b.textContent = on ? "Clean page" : "Aged paper"; }
    b.addEventListener("click", function () {
      on = !on;
      root.classList.toggle("aged", on);
      try { localStorage.setItem("agedPaper", on ? "1" : "0"); } catch (e) {}
      label();
    });
    label();
    nav.appendChild(b);
  });
})();
