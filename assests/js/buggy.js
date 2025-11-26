let currentIndex = 0;
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".tour-card");
const dots = document.querySelectorAll(".dot");

const cardWidth = cards[0].offsetWidth + 20; // includes gap

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex] = dots[currentIndex].classList.add("active");
}

document.getElementById("nextBtn").onclick = () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
    }
};

document.getElementById("prevBtn").onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
};

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
});
