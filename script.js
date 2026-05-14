/* =========================
   HOME INTRO
========================= */
function startHomeIntro(){
  const items = document.querySelectorAll(
    ".home-tag, .home-title, .running-text, .home-description, .home-buttons, .home-visual"
  );

  items.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(45px)";

    setTimeout(() => {
      item.style.transition = "all 1.1s cubic-bezier(.19,1,.22,1)";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 180);
  });
}


/* =========================
   PRELOADER
========================= */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const percentText = document.getElementById("loader-percent");
  const progress = document.getElementById("loader-progress");
  const status = document.getElementById("loader-status");

  if(!preloader) return;

  let count = 0;
  document.body.style.overflow = "hidden";

  const loading = setInterval(() => {
    count++;

    if(percentText) percentText.textContent = count + "%";
    if(progress) progress.style.width = count + "%";

    if(status && count === 35) status.textContent = "Preparing layout";
    if(status && count === 70) status.textContent = "Building experience";

    if(count >= 100){
      clearInterval(loading);

      if(status) status.textContent = "Complete";

      setTimeout(() => {
        preloader.classList.add("hide");
        document.body.style.overflow = "auto";

        setTimeout(startHomeIntro, 600);
      }, 900);
    }
  }, 45);
});


/* =========================
   NAV ACTIVE
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 160;

    if(window.scrollY >= sectionTop){
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){
      link.classList.add("active");
    }
  });
});


/* =========================
   SCROLL PROGRESS
========================= */
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  if(!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = percent + "%";
});


/* =========================
   REVEAL ANIMATION
========================= */
const revealItems = document.querySelectorAll(".reveal-item");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
},{
  threshold: 0.15
});

revealItems.forEach(item => {
  revealObserver.observe(item);
});


/* =========================
   CUSTOM CURSOR
========================= */
const cursor = document.querySelector(".custom-cursor");

if(cursor){
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const hoverItems = document.querySelectorAll(
    "a, button, .visual-image, .tech-circle, .service-card, .project-card"
  );

  hoverItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });
  });
}


/* =========================
   SCROLL DOWN BUTTON
========================= */
const scrollBtn = document.querySelector(".home-link");

if(scrollBtn){
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const about = document.querySelector("#about");

    if(about){
      window.scrollTo({
        top: about.offsetTop - 90,
        behavior: "smooth"
      });
    }
  });
}


/* =========================
   TECH ICON DELAY
========================= */
document.querySelectorAll(".tech-circle, .about-tech").forEach((icon, index) => {
  icon.style.animationDelay = `${index * .35}s`;
});


/* =========================
   JOURNEY ZIGZAG
========================= */
const journeyItems = document.querySelectorAll(".journey-zigzag-item");

const journeyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show-journey");
    }else{
      entry.target.classList.remove("show-journey");
    }
  });
},{
  threshold: 0.25
});

journeyItems.forEach(item => {
  journeyObserver.observe(item);
});


/* =========================
   SERVICE CLICK RIPPLE
========================= */
const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(card => {
  card.addEventListener("click", (e) => {
    if(e.target.closest(".service-link")) return;

    serviceCards.forEach(item => {
      item.classList.remove("active");
    });

    card.classList.add("active");

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = card.getBoundingClientRect();

    ripple.style.left = e.clientX - rect.left + "px";
    ripple.style.top = e.clientY - rect.top + "px";

    card.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 700);
  });
});


/* =========================
   PROJECT FILTER
========================= */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach(card => {
      const category = card.getAttribute("data-category");

      if(filter === "all" || category === filter){
        card.classList.remove("hide");

        setTimeout(() => {
          card.classList.add("filter-show");
        }, 50);
      }else{
        card.classList.remove("filter-show");
        card.classList.add("hide");
      }
    });
  });
});


/* =========================
   VIEW MORE PROJECT
========================= */
const viewMoreBtn = document.getElementById("viewMoreBtn");
const hiddenProjects = document.querySelectorAll(".hidden-project");

if(viewMoreBtn){
  viewMoreBtn.addEventListener("click", () => {
    hiddenProjects.forEach(project => {
      project.classList.remove("hidden-project");
      project.classList.add("filter-show");
    });

    viewMoreBtn.style.display = "none";
  });
}


/* =========================
   PROJECT IMAGE PARALLAX
========================= */
projectCards.forEach(card => {
  const image = card.querySelector("img");

  if(!image) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    image.style.transform = `
      scale(1.08)
      translate(${(x - .5) * 10}px, ${(y - .5) * 10}px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1) translate(0,0)";
  });
});


/* =========================
   DARK MODE
========================= */
const themeToggle = document.querySelector(".theme-toggle");

if(themeToggle){
  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "dark"){
    document.body.classList.add("dark-theme");
    themeToggle.innerHTML = `<i class="ri-sun-line"></i>`;
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){
      localStorage.setItem("theme", "dark");
      themeToggle.innerHTML = `<i class="ri-sun-line"></i>`;
    }else{
      localStorage.setItem("theme", "light");
      themeToggle.innerHTML = `<i class="ri-moon-line"></i>`;
    }
  });
}

/* =========================
   CIRCLE PROGRESS
========================= */
const circles =
document.querySelectorAll(".circle-progress");

circles.forEach(circle => {

  const progress =
  circle.getAttribute("data-progress");

  const activeCircle =
  circle.querySelector(".progress-circle");

  const radius = 60;

  const circumference =
  2 * Math.PI * radius;

  const offset =
  circumference -
  (progress / 100) * circumference;

  setTimeout(() => {

    activeCircle.style.strokeDashoffset =
    offset;

  }, 400);

});

