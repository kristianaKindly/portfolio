// Image carousel on UX resource pages. The track is a horizontal
// scroll-snap list, so swiping and keyboard scrolling work on their own;
// the buttons step one image at a time and the counter follows along.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel__track");
    var slides = track.children;
    var count = carousel.querySelector(".carousel__count");
    var prev = carousel.querySelector('[data-dir="-1"]');
    var next = carousel.querySelector('[data-dir="1"]');

    function current() {
      return Math.round(track.scrollLeft / track.clientWidth);
    }

    function update() {
      var i = current();
      count.textContent = i + 1 + " / " + slides.length;
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    }

    function go(dir) {
      var i = Math.max(0, Math.min(slides.length - 1, current() + dir));
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    }

    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    });

    var t;
    track.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(update, 60);
    });
    window.addEventListener("resize", update);
    update();
  });
});
