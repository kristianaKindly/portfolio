// Email links copy the address instead of opening a mail app.
// Without JavaScript the links still work as normal mailto: links.
// Feedback: buttons change to "Email copied" (that is enough on its own);
// small links and icons get a little "Copied" bubble right next to them.
(function () {
  var bubbleEl;
  var bubbleTimer;

  function getBubble() {
    if (bubbleEl) return bubbleEl;
    bubbleEl = document.createElement("div");
    bubbleEl.className = "copy-bubble";
    bubbleEl.setAttribute("role", "status");
    bubbleEl.setAttribute("aria-live", "polite");
    document.body.appendChild(bubbleEl);
    return bubbleEl;
  }

  // Place the bubble beside the link: below it near the top of the screen
  // (the header), above it everywhere else; kept inside the viewport.
  function showBubble(link) {
    var bubble = getBubble();
    bubble.textContent = "Copied";
    bubble.classList.remove("is-visible", "is-below");
    bubble.style.left = "0px";
    bubble.style.top = "0px";

    var r = link.getBoundingClientRect();
    var b = bubble.getBoundingClientRect();
    var gap = 8;
    var below = r.top < b.height + gap + 16;
    var left = r.left + r.width / 2 - b.width / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - b.width - 8));
    var top = below ? r.bottom + gap : r.top - b.height - gap;

    bubble.style.left = Math.round(left + window.scrollX) + "px";
    bubble.style.top = Math.round(top + window.scrollY) + "px";
    if (below) bubble.classList.add("is-below");

    void bubble.offsetWidth; // restart the entrance animation
    bubble.classList.add("is-visible");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () { bubble.classList.remove("is-visible"); }, 1600);
  }

  // Older iOS Safari and non-secure pages have no async clipboard API.
  function legacyCopy(text) {
    var field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.top = "0";
    field.style.left = "0";
    field.style.opacity = "0";
    field.style.fontSize = "16px"; // stops iOS zooming in on focus
    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, text.length);
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(field);
    return ok;
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }
    return Promise.resolve(legacyCopy(text));
  }

  // Buttons: swap the label to "Email copied" for a moment.
  function flashButton(link) {
    if (link.classList.contains("is-copied")) return;
    link.classList.add("is-copied");
    var labelNode = null;
    for (var i = 0; i < link.childNodes.length; i++) {
      var n = link.childNodes[i];
      if (n.nodeType === 3 && n.textContent.trim()) { labelNode = n; break; }
    }
    var original = labelNode ? labelNode.textContent : null;
    if (labelNode) labelNode.textContent = "Email copied";
    setTimeout(function () {
      if (labelNode) labelNode.textContent = original;
      link.classList.remove("is-copied");
    }, 1800);
  }

  // Icons and text links: brief highlight plus the bubble.
  function flashLink(link) {
    link.classList.add("is-copied");
    setTimeout(function () { link.classList.remove("is-copied"); }, 1600);
    showBubble(link);
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest('a[href^="mailto:"]');
    if (!link) return;
    var address = decodeURIComponent(link.getAttribute("href").slice(7).split("?")[0]);
    event.preventDefault();

    copy(address).then(function (ok) {
      if (!ok) {
        window.location.href = link.getAttribute("href"); // could not copy: open mail app
        return;
      }
      if (link.classList.contains("btn")) flashButton(link);
      else flashLink(link);
    });
  });
})();
