document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image_link');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        images.forEach(img => {
            const elementTop = img.getBoundingClientRect().top;
            const revealPoint = 150;
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
        const revealPoint = 150; // distance avant que l'animation se déclenche

        if (elementTop < windowHeight - revealPoint) {
            parrainage.classList.add('visible');
        }
    }

    window.addEventListener('scroll', revealParrainage);
    revealParrainage(); // pour vérifier dès le chargement si le bloc est déjà visible
});
