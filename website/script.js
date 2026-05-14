/* ================= NAVBAR MOBILE MENU ================= */
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

/* OPEN MENU */
if(navToggle){
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* CLOSE MENU */
if(navClose){
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/* CLOSE MENU WHEN CLICK NAV LINK */
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
});


/* ================= HEADER SCROLL EFFECT ================= */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if(window.scrollY >= 60){
    header.classList.add("scroll-header");
  }else{
    header.classList.remove("scroll-header");
  }
});


/* ================= ACTIVE NAV LINK ON SCROLL ================= */
const sections = document.querySelectorAll("section[id]");

function scrollActive(){
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 120;
    const sectionId = section.getAttribute("id");

    const currentLink = document.querySelector(
      `.nav-menu a[href*="${sectionId}"]`
    );

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      currentLink?.classList.add("active");
    }else{
      currentLink?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", scrollActive);


/* ================= CONTACT FORM ================= */
const contactForm = document.getElementById("contact-form");

if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const packageSelect = document.getElementById("package-select").value;
    const message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || packageSelect === "" || message === ""){
      alert("Lengkapi semua data dulu ya.");
      return;
    }

    alert("Pesan berhasil dikirim! nc.photoboth akan segera menghubungi kamu.");

    contactForm.reset();
  });
}


/* ================= SIMPLE REVEAL ANIMATION ================= */
const revealElements = document.querySelectorAll(
  ".home-content, .home-image, .about-image, .about-content, .gallery-item, .package-card, .contact-content, .contact-form-box"
);

const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if(elementTop < windowHeight - 90){
      element.classList.add("show-reveal");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);