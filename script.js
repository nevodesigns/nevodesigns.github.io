(function () {
  var header = document.querySelector("[data-header]");
  var menuButton = document.querySelector("[data-menu-button]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;
    menuButton.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      setMenu(!mobileMenu.classList.contains("is-open"));
    });
  }

  document.querySelectorAll("[data-mobile-menu] a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  window.addEventListener("scroll", function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  var items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    items.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }

  document.documentElement.classList.add("js-reveal");
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px" });

  items.forEach(function (item) { observer.observe(item); });
}());
