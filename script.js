const progress = document.querySelector(".scroll-progress");
const backTop = document.querySelector(".back-top");
const toast = document.querySelector(".toast");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("nav a")];

function updateProgress() {
  if (!progress || !backTop) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = `scaleX(${ratio})`;
  backTop.classList.toggle("visible", window.scrollY > 520);
}

function setActiveNav() {
  const current = sections
    .map((section) => ({ id: section.id, top: section.getBoundingClientRect().top }))
    .filter((item) => item.top < 160)
    .pop();
  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 1600);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      showToast("已复制压缩包下载链接");
    } catch {
      showToast(text);
    }
  });
});

document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));

if (backTop) {
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

window.addEventListener("scroll", () => {
  updateProgress();
  setActiveNav();
});

updateProgress();
setActiveNav();
