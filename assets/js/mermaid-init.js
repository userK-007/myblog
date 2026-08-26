(function () {
  function renderMermaid() {
    var blocks = document.querySelectorAll("pre > code.language-mermaid");
    if (!blocks.length) return;

    blocks.forEach(function (code) {
      var pre = code.parentElement;
      if (!pre) return;
      var div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = code.textContent.trim();
      pre.replaceWith(div);
    });

    var isDark =
      document.documentElement.dataset.theme === "dark" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);

    window.mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? "dark" : "default",
      securityLevel: "loose",
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true },
    });
    window.mermaid.run({ querySelector: ".mermaid" });
  }

  function boot() {
    if (window.mermaid) {
      renderMermaid();
      return;
    }
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;
      if (window.mermaid) {
        clearInterval(timer);
        renderMermaid();
      } else if (attempts > 50) {
        clearInterval(timer);
      }
    }, 100);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
