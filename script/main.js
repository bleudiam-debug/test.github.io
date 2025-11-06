// Désactive la restauration automatique du scroll
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Au chargement, forcer le scroll en haut
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image_link');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        images.forEach(img => {
            const elementTop = img.getBoundingClientRect().top;
            const revealPoint = 300;
            if(elementTop < windowHeight - revealPoint){
                img.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const parrainage = document.querySelector('.offre_parrainage');

    function revealParrainage() {
        const windowHeight = window.innerHeight;
        const elementTop = parrainage.getBoundingClientRect().top;
        const revealPoint = 300; // distance avant que l'animation se déclenche

        if (elementTop < windowHeight - revealPoint) {
            parrainage.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revealParrainage);
    revealParrainage(); // pour vérifier dès le chargement si le bloc est déjà visible
});

const burgerIcon = document.getElementById("icons");
const navMenu = document.querySelector(".navigation");

burgerIcon.addEventListener("click", () => {
  navMenu.classList.toggle("active");    // ouvre/ferme le menu
  burgerIcon.classList.toggle("active"); // change l'icône burger ↔ croix
});

async function classify() {
  const vehicle = document.getElementById("vehicle").value;
  const res = await fetch("https://test-github-io-fc30.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicle }),
  });
  const data = await res.json();
  document.getElementById("result").innerText = "Type : " + data.category;
}
