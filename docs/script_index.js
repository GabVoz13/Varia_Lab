const heroSlides = document.querySelectorAll(".hero-slide");
const featureSlidesContainer = document.querySelector(".feature-slides");
const dotsContainer = document.querySelector(".feature-caption-center");
const featureTitle = document.getElementById("featureTitle");
const featureButton = document.getElementById("featureButton");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");

let heroIndex = 0;
let featureIndex = 0;
let heroInterval;
let featureInterval;
let featureSlides;
let dots;

function buildSlides() {
  featureSlidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  EVENTS.forEach((event, i) => {
    const article = document.createElement("article");
    article.className = "feature-slide" + (i === 0 ? " active" : "");
    article.dataset.title = event.title;
    article.dataset.link = event.link;

    if (event.type === "iframe") {
      const iframe = document.createElement("iframe");
      iframe.src = event.src;
      iframe.title = event.title;
      iframe.loading = "lazy";
      article.appendChild(iframe);
    } else {
      const img = document.createElement("img");
      img.src = event.src;
      img.alt = event.alt || event.title;
      article.appendChild(img);
    }

    featureSlidesContainer.appendChild(article);

    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.dataset.slide = i;
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dotsContainer.appendChild(dot);
  });

  featureSlides = document.querySelectorAll(".feature-slide");
  dots = document.querySelectorAll(".dot");

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      featureIndex = Number(dot.dataset.slide);
      showFeatureSlide(featureIndex);
      resetFeatureRotation();
    });
  });
}

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    slide.setAttribute("aria-hidden", i === index ? "false" : "true");
  });
}

function nextHeroSlide() {
  heroIndex = (heroIndex + 1) % heroSlides.length;
  showHeroSlide(heroIndex);
}

function showFeatureSlide(index) {
  featureSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  const activeSlide = featureSlides[index];
  featureTitle.textContent = activeSlide.dataset.title;
  featureButton.href = activeSlide.dataset.link;
}

function nextFeatureSlide() {
  featureIndex = (featureIndex + 1) % featureSlides.length;
  showFeatureSlide(featureIndex);
}

function prevFeatureSlide() {
  featureIndex = (featureIndex - 1 + featureSlides.length) % featureSlides.length;
  showFeatureSlide(featureIndex);
}

function startHeroRotation() {
  heroInterval = setInterval(nextHeroSlide, 8000);
}

function startFeatureRotation() {
  featureInterval = setInterval(nextFeatureSlide, 6000);
}

function resetFeatureRotation() {
  clearInterval(featureInterval);
  startFeatureRotation();
}

nextSlideBtn.addEventListener("click", () => {
  nextFeatureSlide();
  resetFeatureRotation();
});

prevSlideBtn.addEventListener("click", () => {
  prevFeatureSlide();
  resetFeatureRotation();
});

window.addEventListener("load", () => {
  buildSlides();
  showHeroSlide(heroIndex);
  showFeatureSlide(featureIndex);
  startHeroRotation();
  startFeatureRotation();
});
