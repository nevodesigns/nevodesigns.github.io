(function () {
  var el = document.getElementById("clock");
  if (!el) return;
  var fmt;
  try {
    fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Lagos" });
  } catch (e) { return; }
  function tick() {
    var d = new Date();
    el.textContent = fmt.format(d);
    el.setAttribute("datetime", d.toISOString());
  }
  tick();
  setInterval(tick, 30000);
}());
