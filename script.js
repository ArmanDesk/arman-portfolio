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

  if(!preloader){
    startHomeIntro();
    return;
  }

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
   NAV ACTIVE + SCROLL PROGRESS
========================= */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const scrollProgress = document.querySelector(".scroll-progress");

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

  if(scrollProgress){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = percent + "%";
  }
});


/* =========================
   REVEAL ANIMATION
========================= */
const revealItems = document.querySelectorAll(".reveal-item");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
      entry.target.classList.add("active-reveal");
    }
  });
},{
  threshold: 0.15
});

revealItems.forEach(item => {
  revealObserver.observe(item);
});


/* =========================
   PREMIUM CURSOR
========================= */
const cursor = document.querySelector(".custom-cursor");
const cursorBlur = document.querySelector(".cursor-blur");

if(cursor && cursorBlur){
  let mouseX = 0;
  let mouseY = 0;
  let blurX = 0;
  let blurY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateBlur(){
    blurX += (mouseX - blurX) * 0.12;
    blurY += (mouseY - blurY) * 0.12;

    cursorBlur.style.left = blurX + "px";
    cursorBlur.style.top = blurY + "px";

    requestAnimationFrame(animateBlur);
  }

  animateBlur();

  const hoverItems = document.querySelectorAll(
    "a, button, .service-card, .project-card, .circle-card, .premium-skill-card, .learning-item"
  );

  hoverItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      cursorBlur.classList.add("active");
    });

    item.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      cursorBlur.classList.remove("active");
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
const circleProgressItems = document.querySelectorAll(".circle-progress");

circleProgressItems.forEach((circle) => {
  const progress = Number(circle.dataset.progress);
  const ring = circle.querySelector(".progress-circle");

  if(!ring) return;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  ring.style.strokeDasharray = circumference;
  ring.style.strokeDashoffset = circumference;

  setTimeout(() => {
    ring.style.strokeDashoffset = offset;
  }, 400);
});


/* =========================
   PREMIUM SKILLS CARD EFFECT
========================= */
const premiumCards = document.querySelectorAll(".premium-skill-card");

premiumCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-10px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });

  card.addEventListener("click", () => {
    premiumCards.forEach((item) => {
      item.classList.remove("active");
    });

    card.classList.add("active");
  });
});


/* =========================
   PREMIUM PROGRESS ANIMATION
========================= */
const premiumProgressBars = document.querySelectorAll(".premium-progress-line span");

const premiumProgressObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      const bar = entry.target;
      const targetWidth = bar.getAttribute("data-width") || bar.style.width;

      bar.style.width = "0%";

      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 250);

      premiumProgressObserver.unobserve(bar);
    }
  });
},{
  threshold: 0.4
});

premiumProgressBars.forEach((bar) => {
  const width = bar.style.width || "0%";

  bar.setAttribute("data-width", width);
  premiumProgressObserver.observe(bar);
});


/* =========================
   LEARNING TAG MAGNET
========================= */
const learningItems = document.querySelectorAll(".learning-item");

learningItems.forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    item.style.transform = `
      translate(${x * .12}px, ${y * .12}px)
    `;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0px,0px)";
  });
});
