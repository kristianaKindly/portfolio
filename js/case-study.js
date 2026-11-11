// Sticky "On this page" sidebar. On article pages ([data-auto]) the list is
// built from the article's h2 headings. Highlights the section in view.
document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".cs-nav");
  if (!nav) return;

  if (nav.hasAttribute("data-auto")) {
    var list = nav.querySelector("ol");
    document.querySelectorAll(".article-body h2[id]").forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  var links = nav.querySelectorAll("a");
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove("is-active"); });
      var link = byId[entry.target.id];
      if (link) link.classList.add("is-active");
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  Object.keys(byId).forEach(function (id) {
    var target = document.getElementById(id);
    if (target) observer.observe(target);
  });
});
