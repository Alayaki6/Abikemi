/* =========================================================
   ABIKEMI — MISSION 2026
   A CINEMATIC BIRTHDAY EXPERIENCE
   BY OLAJIDEH
========================================================= */
/* =========================================================
   SCREEN SYSTEM
========================================================= */
const screens = document.querySelectorAll(".screen");
function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.remove("active");
    });
    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active");
    }
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =========================================================
   SCREEN REFERENCES
========================================================= */
const intro = document.getElementById("intro");
const identity = document.getElementById("identity");
const mission = document.getElementById("mission");
const space = document.getElementById("space");
const universe = document.getElementById("universe");
const archive = document.getElementById("archive");
const birthday = document.getElementById("birthday");
const finalScreen = document.getElementById("final");
/* =========================================================
   BUTTONS
========================================================= */
const enterButton = document.getElementById("enterButton");
const launchButton = document.getElementById("launchButton");
const arrivalButton = document.getElementById("arrivalButton");
const memoryButton = document.getElementById("memoryButton");
const archiveButton = document.getElementById("archiveButton");
const finalButton = document.getElementById("finalButton");
/* =========================================================
   BIRTHDAY ELEMENTS
========================================================= */
const birthdayTitle = document.getElementById("birthdayTitle");
const birthdayName = document.getElementById("birthdayName");
const birthdayMessage = document.getElementById("birthdayMessage");
const birthdayStatus = document.getElementById("birthdayStatus");
/* =========================================================
   BOOT SEQUENCE
========================================================= */
showScreen("intro");
setTimeout(() => {
    showScreen("identity");
}, 3500);
/* =========================================================
   IDENTITY → MISSION
========================================================= */
if (enterButton) {
    enterButton.addEventListener("click", () => {
        showScreen("mission");
    });
}
/* =========================================================
   MISSION → SPACE
========================================================= */
if (launchButton) {
    launchButton.addEventListener("click", () => {
        launchButton.innerHTML = "LAUNCHING...";
        document.body.classList.add("launching");
        createLaunchParticles();
        setTimeout(() => {
            document.body.classList.remove("launching");
            launchButton.innerHTML = `
                BEGIN MISSION
                <span>→</span>
            `;
            showScreen("space");
        }, 1600);
    });
}
/* =========================================================
   SPACE → UNIVERSE
========================================================= */
if (arrivalButton) {
    arrivalButton.addEventListener("click", () => {
        showScreen("universe");
    });
}
/* =========================================================
   UNIVERSE → FIRST MEMORY
========================================================= */
if (memoryButton) {
    memoryButton.addEventListener("click", () => {
        currentMemory = 0;
        updateMemory();
        showScreen("archive");
    });
}
/* =========================================================
   MEMORY DATA
========================================================= */
const memories = [
    {
        image: "asset/11eef4c8-186e-41da-a821-30d66d267143.jpeg",
        caption: "SOME MOMENTS DON'T NEED AN EXPLANATION."
    },
    {
        image: "asset/44a227b1-d148-4a83-9625-a42e6ddb5b80.jpeg",
        caption: "SOME PEOPLE JUST MAKE LIFE A LITTLE BRIGHTER."
    },
    {
        image: "asset/81a1f21b-6837-4656-a48b-8bafca2e8704.jpeg",
        caption: "AND THEN THERE ARE MEMORIES YOU NEVER WANT TO LOSE."
    },
    {
        image: "asset/c5e86a78-4ea6-46e2-80d2-ac6ba310e573.jpeg",
        caption: "ANOTHER CHAPTER. ANOTHER COLLECTION OF MOMENTS."
    },
    {
        image: "asset/f3b45a18-d715-4666-931a-62cde3463b9e.jpeg",
        caption: "AND SOMEHOW, THIS BEAUTIFUL STORY KEEPS GOING."
    }
];
/* =========================================================
   MEMORY STATE
========================================================= */
let currentMemory = 0;
/* =========================================================
   MEMORY ELEMENTS
========================================================= */
const archiveImage = document.getElementById("archiveImage");
const archiveCaption = document.getElementById("archiveCaption");
const archiveNumber = document.querySelector(".archive-number");
/* =========================================================
   UPDATE MEMORY
========================================================= */
function updateMemory() {
    if (!memories[currentMemory]) {
        return;
    }
    const memory = memories[currentMemory];
    /*
       Update image
    */
    if (archiveImage) {
        archiveImage.style.opacity = "0";
        setTimeout(() => {
            archiveImage.src = memory.image;
            archiveImage.onload = () => {
                archiveImage.style.opacity = "1";
            };
        }, 250);
    }
    /*
       Update caption
    */
    if (archiveCaption) {
        archiveCaption.style.opacity = "0";
        setTimeout(() => {
            archiveCaption.textContent = memory.caption;
            archiveCaption.style.opacity = "1";
        }, 250);
    }
    /*
       IMPORTANT:
       Update 01 / 05 → 02 / 05 → etc.
    */
    if (archiveNumber) {
        archiveNumber.textContent =
            `${String(currentMemory + 1).padStart(2, "0")} / ${String(memories.length).padStart(2, "0")}`;
    }
    /*
       Update button
    */
    if (archiveButton) {
        if (currentMemory === memories.length - 1) {
            archiveButton.innerHTML = `
                RECEIVE TRANSMISSION
                <span>→</span>
            `;
        } else {
            archiveButton.innerHTML = `
                NEXT MEMORY
                <span>→</span>
            `;
        }
    }
}
/* =========================================================
   NEXT MEMORY
========================================================= */
if (archiveButton) {
    archiveButton.addEventListener("click", () => {
        /*
           If this is not the final memory,
           move to the next picture.
        */
        if (currentMemory < memories.length - 1) {
            currentMemory++;
            updateMemory();
            createMemoryParticles();
            return;
        }
        /*
           After the fifth picture,
           start birthday sequence.
        */
        showScreen("birthday");
        startBirthdaySequence();
    });
}
/* =========================================================
   BIRTHDAY SEQUENCE
========================================================= */
function startBirthdaySequence() {
    if (birthdayStatus) {
        birthdayStatus.innerHTML = "";
        const statusLines = [
            "> TRANSMISSION RECEIVED",
            "> DECRYPTING MESSAGE...",
            "> CONNECTION: SECURE"
        ];
        let lineIndex = 0;
        function showNextLine() {
            if (lineIndex >= statusLines.length) {
                return;
            }
            const line = document.createElement("div");
            line.textContent = statusLines[lineIndex];
            birthdayStatus.appendChild(line);
            lineIndex++;
            setTimeout(showNextLine, 650);
        }
        showNextLine();
    }
    /*
       Hide birthday content first
    */
    if (birthdayTitle) {
        birthdayTitle.style.opacity = "0";
    }
    if (birthdayName) {
        birthdayName.style.opacity = "0";
    }
    if (birthdayMessage) {
        birthdayMessage.style.opacity = "0";
    }
    if (finalButton) {
        finalButton.classList.add("hidden");
    }
    /*
       Reveal HAPPY BIRTHDAY
    */
    setTimeout(() => {
        if (birthdayTitle) {
            birthdayTitle.style.opacity = "1";
            typeText(
                birthdayTitle,
                "HAPPY BIRTHDAY",
                90
            );
        }
    }, 2300);
    /*
       Reveal ABIKEMI
    */
    setTimeout(() => {
        if (birthdayName) {
            birthdayName.style.opacity = "1";
            typeText(
                birthdayName,
                "ABIKEMI ✨❤️",
                100
            );
        }
    }, 3800);
    /*
       Reveal message
    */
    setTimeout(() => {
        if (birthdayMessage) {
            birthdayMessage.style.opacity = "1";
            birthdayMessage.classList.add("message-reveal");
        }
    }, 5000);
    /*
       Reveal final button
    */
    setTimeout(() => {
        if (finalButton) {
            finalButton.classList.remove("hidden");
            createBirthdayParticles();
        }
    }, 6200);
}
/* =========================================================
   TYPEWRITER EFFECT
========================================================= */
function typeText(element, text, speed = 80) {
    element.textContent = "";
    let index = 0;
    const cursor = document.createElement("span");
    cursor.className = "typing-cursor";
    cursor.textContent = "▋";
    element.appendChild(cursor);
    const interval = setInterval(() => {
        if (index < text.length) {
            cursor.before(text[index]);
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                cursor.remove();
            }, 700);
        }
    }, speed);
}
/* =========================================================
   BIRTHDAY → FINAL
========================================================= */
if (finalButton) {
    finalButton.addEventListener("click", () => {
        createFinalParticles();
        showScreen("final");
    });
}
/* =========================================================
   PARTICLE ENGINE
========================================================= */
function createParticle(className = "particle") {
    const particle = document.createElement("div");
    particle.className = className;
    particle.style.left =
        `${Math.random() * 100}%`;
    particle.style.top =
        `${Math.random() * 100}%`;
    particle.style.animationDelay =
        `${Math.random() * 0.5}s`;
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, 1800);
}
/* =========================================================
   LAUNCH PARTICLES
========================================================= */
function createLaunchParticles() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createParticle("launch-particle");
        }, i * 25);
    }
}
/* =========================================================
   MEMORY PARTICLES
========================================================= */
function createMemoryParticles() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createParticle("memory-particle");
        }, i * 50);
    }
}
/* =========================================================
   BIRTHDAY PARTICLES
========================================================= */
function createBirthdayParticles() {
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            createParticle("birthday-particle");
        }, i * 45);
    }
}
/* =========================================================
   FINAL PARTICLES
========================================================= */
function createFinalParticles() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle("celebration-particle");
        }, i * 30);
    }
}
/* =========================================================
   IMAGE PRELOADING
========================================================= */
memories.forEach(memory => {
    const img = new Image();
    img.src = memory.image;
});
/* =========================================================
   TOUCH FEEDBACK
========================================================= */
document.addEventListener("touchstart", () => {
    document.body.classList.add("touching");
}, { passive: true });
document.addEventListener("touchend", () => {
    document.body.classList.remove("touching");
}, { passive: true });
/* =========================================================
   KEYBOARD ESCAPE
========================================================= */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        showScreen("identity");
    }
});
/* =========================================================
   IMAGE ERROR DETECTION
========================================================= */
document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
        console.warn(
            "IMAGE NOT FOUND:",
            image.getAttribute("src")
        );
    });
});