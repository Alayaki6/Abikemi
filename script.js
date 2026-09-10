/* =========================================================
   ABIKEMI — MISSION 2026
   EXPERIENCE CONTROLLER
========================================================= */
/* =========================================================
   ELEMENTS
========================================================= */
const intro = document.getElementById("intro");
const identity = document.getElementById("identity");
const mission = document.getElementById("mission");
const space = document.getElementById("space");
const universe = document.getElementById("universe");
const archive = document.getElementById("archive");
const birthday = document.getElementById("birthday");
const final = document.getElementById("final");
const enterButton = document.getElementById("enterButton");
const launchButton = document.getElementById("launchButton");
const arrivalButton = document.getElementById("arrivalButton");
const universeButton = document.getElementById("universeButton");
const archiveButton = document.getElementById("archiveButton");
const finalButton = document.getElementById("finalButton");
const archiveImage = document.getElementById("archiveImage");
const archiveCaption = document.getElementById("archiveCaption");
/* =========================================================
   SCREEN NAVIGATION
========================================================= */
const screens = [
    intro,
    identity,
    mission,
    space,
    universe,
    archive,
    birthday,
    final
];
function showScreen(target) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });
    setTimeout(() => {
        target.classList.add("active");
    }, 80);
}
/* =========================================================
   SYSTEM BOOT
========================================================= */
setTimeout(() => {
    showScreen(identity);
}, 3500);
/* =========================================================
   IDENTITY → MISSION CONTROL
========================================================= */
enterButton.addEventListener("click", () => {
    showScreen(mission);
});
/* =========================================================
   MISSION CONTROL → SPACE
========================================================= */
launchButton.addEventListener("click", () => {
    launchButton.disabled = true;
    launchButton.innerHTML = `
        <span>🚀</span>
        LAUNCHING...
    `;
    setTimeout(() => {
        showScreen(space);
        launchButton.disabled = false;
        launchButton.innerHTML = `
            <span>🚀</span>
            LAUNCH
        `;
    }, 1200);
});
/* =========================================================
   SPACE → UNIVERSE
========================================================= */
arrivalButton.addEventListener("click", () => {
    showScreen(universe);
});
/* =========================================================
   UNIVERSE → ARCHIVE
========================================================= */
universeButton.addEventListener("click", () => {
    showScreen(archive);
});
/* =========================================================
   PHOTO ARCHIVE
========================================================= */
const memories = [
    {
        image: "assets/11eef4c8-186e-41da-a821-30d66d267143.jpeg",
        caption:
            "Some people simply exist.<br>Some people make ordinary moments memorable."
    },
    {
        image: "assets/44a227b1-d148-4a83-9625-a42e6ddb5b80.jpeg",
        caption:
            "A little reminder that being yourself<br>will always be your best look."
    },
    {
        image: "assets/81a1f21b-6837-4656-a48b-8bafca2e8704.jpeg",
        caption:
            "Different picture.<br>Same Abikemi energy."
    },
    {
        image: "assets/c5e86a78-4ea6-46e2-80d2-ac6ba310e573.jpeg",
        caption:
            "Some moments don't need a reason.<br>They just deserve to be remembered."
    },
    {
        image: "assets/f3b45a18-d715-4666-931a-62cde3463b9e.jpeg",
        caption:
            "And yes...<br>this one absolutely had to be here. ❤️"
    }
];
let currentMemory = 0;
function updateMemory() {
    const memory = memories[currentMemory];
    archiveImage.style.opacity = "0";
    archiveImage.style.transform = "scale(1.06)";
    setTimeout(() => {
        archiveImage.src = memory.image;
        archiveCaption.innerHTML = memory.caption;
        document.querySelector(".archive-number").textContent =
            `${String(currentMemory + 1).padStart(2, "0")} / 05`;
        archiveImage.style.opacity = "1";
        archiveImage.style.transform = "scale(1)";
    }, 350);
}
archiveButton.addEventListener("click", () => {
    currentMemory++;
    if (currentMemory >= memories.length) {
        showScreen(birthday);
        currentMemory = 0;
        return;
    }
    updateMemory();
});
/* =========================================================
   BIRTHDAY → FINAL
========================================================= */
finalButton.addEventListener("click", () => {
    showScreen(final);
    createCelebration();
});
/* =========================================================
   CELEBRATION EFFECT
========================================================= */
function createCelebration() {
    const symbols = [
        "✦",
        "✧",
        "·",
        "✦",
        "⋆",
        "✧"
    ];
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("span");
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.position = "fixed";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = "-20px";
        particle.style.fontSize =
            Math.random() * 14 + 7 + "px";
        particle.style.opacity =
            Math.random() * .7 + .3;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "20";
        document.body.appendChild(particle);
        const duration =
            Math.random() * 3000 + 3000;
        const horizontal =
            (Math.random() - .5) * 250;
        particle.animate(
            [
                {
                    transform: "translate(0, 0) rotate(0deg)",
                    opacity: 0
                },
                {
                    transform:
                        `translate(${horizontal}px, 45vh) rotate(180deg)`,
                    opacity: 1
                },
                {
                    transform:
                        `translate(${horizontal * 1.5}px, 110vh) rotate(360deg)`,
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "cubic-bezier(.2,.7,.3,1)"
            }
        );
        setTimeout(() => {
            particle.remove();
        }, duration + 100);
    }
}
/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        showScreen(identity);
    }
});
/* =========================================================
   TOUCH FEEDBACK
========================================================= */
document.querySelectorAll("button").forEach(button => {
    button.addEventListener("touchstart", () => {
        button.style.transform = "scale(.96)";
    });
    button.addEventListener("touchend", () => {
        button.style.transform = "";
    });
});
/* =========================================================
   IMAGE PRELOADING
========================================================= */
memories.forEach(memory => {
    const image = new Image();
    image.src = memory.image;
});
/* =========================================================
   INITIAL STATE
========================================================= */
showScreen(intro);