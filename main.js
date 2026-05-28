function booking() {
    alert('Скоро здесь будет возможность забронировать место')
}

let book_btn = document.querySelector('.booking-btn')
book_btn.addEventListener('click', booking)

//Блок кода для анимированного текста
const cheersData = [
    { word: "¡Salud!", location: "España / Latinoamérica" },
    { word: "Cheers!", location: "Reino Unido / EE. UU." },
    { word: "Chin Chin", location: "Italia" },
    { word: "Santé", location: "Francia" },
    { word: "Salute", location: "Italia" },
    { word: "Prost", location: "Alemania" },
    { word: "Zum Wohl", location: "Alemania" },
    { word: "Skål", location: "Suecia / Noruega / Dinamarca" },
    { word: "Kanpai", location: "Japón" },
    { word: "Gān bēi", location: "China" },
    { word: "Geonbae", location: "Corea del Sur" },
    { word: "Sláinte", location: "Irlanda / Escocia" },
    { word: "Saúde", location: "Portugal / Brasil" },
    { word: "Na zdrowie", location: "Polonia" },
    { word: "Na zdraví", location: "República Checa" },
    { word: "Sa zdorovie", location: "Rusia" },
    { word: "Yamas", location: "Grecia" },
    { word: "L'chaim", location: "Israel" },
    { word: "Şerefe", location: "Turquía" },
    { word: "¡Tinto!", location: "Colombia" },
    { word: "Chok dee", location: "Tailandia" },
    { word: "Mót, hai, ba, yo!", location: "Vietnam" },
    { word: "Budmo", location: "Ucrania" },
    { word: "Egészségedre", location: "Hungría" },
    { word: "Proshat", location: "Albania" },
    { word: "Kippis", location: "Finlandia" },
    { word: "I n driten", location: "Albania" },
    { word: "Noroc", Rumania: "" },
    { word: "Ziveli", location: "Serbia / Croacia" },
    { word: "Evviva", location: "Italia" },
    { word: "Tanti auguri", location: "Italia" },
    { word: "Gesondheid", location: "Sudáfrica" },
    { word: "Mabuhay", location: "Filipinas" },
    { word: "Fenékig", location: "Hungría" },
    { word: "Serefe", location: "Turquía" },
    { word: "Jai Ho", location: "India" },
    { word: "Vullnet", location: "Albania" },
    { word: "Gëzuar", location: "Albania" }
];

const container = document.getElementById("cheers-container");
const MAX_VISIBLE = 8;
let activeCount = 0;

function createCheerElement() {
    if (activeCount >= MAX_VISIBLE) return;

    const data = cheersData[Math.floor(Math.random() * cheersData.length)];
    const el = document.createElement("div");
    el.className = "cheer-item active";
    el.innerText = data.word;

    // Random position logic, trying to avoid the center
    const padding = 100;
    let x, y;
    const isMobile = window.innerWidth < 768;

    // We want to avoid a central rectangle where the title is
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeZoneWidth = isMobile ? 300 : 600; // Increased
    const safeZoneHeight = isMobile ? 200 : 400; // Increased

    let attempts = 0;
    do {
        x = Math.random() * (window.innerWidth - padding * 2) + padding;
        y = Math.random() * (window.innerHeight - padding * 2) + padding;
        attempts++;
    } while (
        attempts < 10 &&
        x > centerX - safeZoneWidth / 2 &&
        x < centerX + safeZoneWidth / 2 &&
        y > centerY - safeZoneHeight / 2 &&
        y < centerY + safeZoneHeight / 2
    );

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Slight random rotation for more organic feel
    const rotation = (Math.random() - 0.5) * 10;
    el.style.transform = `rotate(${rotation}deg)`;

    container.appendChild(el);
    activeCount++;

    // Remove element after animation finishes
    // fadeIn (1.5s) + stay (2.5s) + fadeOut (1.5s) = ~5.5s
    setTimeout(() => {
        el.remove();
        activeCount--;
    }, 6000);
}

// Initial batch
for (let i = 0; i < 4; i++) {
    setTimeout(createCheerElement, i * 800);
}

// Continuous loop
setInterval(() => {
    if (activeCount < MAX_VISIBLE) {
        createCheerElement();
    }
}, 1200);

// Text splitting logic to wrap each character in a span
function prepareHeroTitle() {
    const hero = document.querySelector(".hero-title");
    if (!hero) return;

    const processNode = (node) => {
        if (node.nodeType === 3) {
            // Text node
            const text = node.textContent.trim();
            if (!text) return null;

            // Split into words to handle internal spaces correctly
            const words = text.split(/\s+/);
            const fragment = document.createDocumentFragment();

            words.forEach((word, wordIdx) => {
                word.split("").forEach((char) => {
                    const span = document.createElement("span");
                    span.className = "char";
                    span.textContent = char;
                    fragment.appendChild(span);
                });

                // Add a space between words, but not after the last word
                if (wordIdx < words.length - 1) {
                    const space = document.createElement("span");
                    space.className = "char";
                    space.textContent = "\u00A0";
                    fragment.appendChild(space);
                }
            });
            return fragment;
        } else if (node.nodeType === 1) {
            // Element node
            if (node.tagName === "BR") return node.cloneNode(true);

            const newElement = node.cloneNode(false);
            Array.from(node.childNodes).forEach((child) => {
                const processed = processNode(child);
                if (processed) newElement.appendChild(processed);
            });
            return newElement;
        }
        return null;
    };

    const originalHTML = hero.innerHTML;
    // Simple way to handle the title: split by <br> and process each part
    const parts = originalHTML.split(/<br\s*\/?>/i);
    hero.innerHTML = "";

    parts.forEach((part, idx) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = part;
        Array.from(tempDiv.childNodes).forEach((node) => {
            const processed = processNode(node);
            if (processed) hero.appendChild(processed);
        });
        if (idx < parts.length - 1) {
            hero.appendChild(document.createElement("br"));
        }
    });
}

prepareHeroTitle();

// Mouse proximity effect
document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const characters = document.querySelectorAll(".hero-title .char");
    characters.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distX = mouseX - charX;
        const distY = mouseY - charY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        const radius = 80; // Optimized radius

        if (distance < radius) {
            const power = (radius - distance) / radius;
            const moveX = (distX / distance) * power * -20;
            const moveY = (distY / distance) * power * -20;
            const blur = power * 3;

            char.style.transform = `translate(${moveX}px, ${moveY}px) scale(${
                1 + power * 0.3
            })`;
            char.style.filter = `blur(${blur}px)`;
            char.style.color = "var(--accent-coral)";
        } else {
            char.style.transform = "translate(0, 0) scale(1)";
            char.style.filter = "blur(0px)";
            char.style.color = "";
        }
    });
});
