(function () {
  const key = "reader-theme";
  const btns = Array.from(document.querySelectorAll(".theme-switcher button"));

  const applyActive = (theme) => {
    btns.forEach(b => b.classList.toggle("active", b.dataset.theme === theme));
  };

  const setTheme = (theme) => {
    document.body.classList.remove("light", "sepia", "dark");
    if (theme) document.body.classList.add(theme);
    localStorage.setItem(key, theme);
    applyActive(theme);
  };

  const saved = localStorage.getItem(key);

  if (saved) {
    // If user has already chosen a theme, stick to it
    setTheme(saved);
  } else {
    // No saved preference → check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (prefersLight) {
      // System is light → default to sepia
      setTheme("sepia");
    } else if (prefersDark) {
      // System is dark → keep dark
      setTheme("dark");
    } else {
      // No preference → leave unset (or choose fallback)
      applyActive(null);
    }
  }

  btns.forEach(btn =>
    btn.addEventListener("click", () => setTheme(btn.dataset.theme))
  );
})();
