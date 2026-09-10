/* =========================================================
   ABIKEMI — MISSION 2026
   CINEMATIC BIRTHDAY EXPERIENCE
========================================================= */

const screens = document.querySelectorAll(".screen");

const intro = document.getElementById("intro");
const identity = document.getElementById("identity");
const mission = document.getElementById("mission");
const space = document.getElementById("space");
const universe = document.getElementById("universe");
const archive = document.getElementById("archive");
const birthday = document.getElementById("birthday");
const finalScreen = document.getElementById("final");

const enterButton = document.getElementById("enterButton");
const launchButton = document.getElementById("launchButton");
const arrivalButton = document.getElementById("arrivalButton");
const universeButton = document.getElementById("universeButton");
const archiveButton = document.getElementById("archiveButton");
const finalButton = document.getElementById("finalButton");

const archiveImage = document.getElementById("archiveImage");
const memoryNumber = document.getElementById("memoryNumber");
const memoryCaption = document.getElementById("memoryCaption");


/* =========================================================
   SCREEN TRANSITION
========================================================= */

function showScreen(target) {
    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    setTimeout(() => {
        target.classList.add("active");
    }, 80);
}


/* =========================================================
   BOOT
========================================================= */

setTimeout(() => {
    showScreen(identity);
}, 3500);


/* =========================================================
   IDENTITY → MISSION
========================================================= */

enterButton.addEventListener("click", () => {
    showScreen(mission);
});


/* =========================================================
   MISSION → SPACE
========================================================= */

launchButton.addEventListener("click", () => {

    launchButton.textContent = "LAUNCHING...";

    document.body.classList.add("launching");

    createLaunchParticles();

    setTimeout(() => {

        document.body.classList.remove("launching");

        launchButton.textContent = "🚀 LAUNCH";

        showScreen(space);

    }, 1600);
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
   MEMORIES
========================================================= */

const memories = [
    {
        image: "asset/11eef4c8-186e-41da-a821-30d66d267143.jpeg",
        caption:
            "Some people simply exist.<br>Some people make ordinary moments memorable."
    },

    {
        image: "asset/44a227b1-d148-4a83-9625-a42e6ddb5b80.jpeg",
        caption:
            "A little reminder that being yourself<br>will always be your best look."
    },

    {
        image: "asset/81a1f21b-6837-4656-a48b-8bafca2e8704.jpeg",
        caption:
            "Different picture.<br>Same Abikemi energy."
    },

    {
        image: "asset/c5e86a78-4ea6-46e2-80d2-ac6ba310e573.jpeg",
        caption:
            "Some moments don't need a reason.<br>They just deserve to be remembered."
    },

    {
        image: "asset/f3b45a18-d715-4666-931a-62cde3463b9e.jpeg",
        caption:
            "And yes...<br>this one absolutely had to be here. ❤️"
    }
];

let currentMemory = 0;


/* =========================================================
   UPDATE MEMORY
========================================================= */

function updateMemory() {

    archiveImage.style.opacity = "0";
    archiveImage.style.transform = "scale(1.04)";

    setTimeout(() => {

        archiveImage.src = memories[currentMemory].image;

        memoryNumber.textContent =
            `${String(currentMemory + 1).padStart(2, "0")} / 05`;

        memoryCaption.innerHTML =
            memories[currentMemory].caption;

        archiveImage.style.opacity = "1";
        archiveImage.style.transform = "scale(1)";

    }, 450);
}


/* =========================================================
   NEXT MEMORY
========================================================= */

archiveButton.addEventListener("click", () => {

    currentMemory++;

    if (currentMemory >= memories.length) {

        currentMemory = memories.length - 1;

        showScreen(birthday);

        setTimeout(() => {
            startBirthdaySequence();
        }, 900);

        return;
    }

    updateMemory();
});


/* =========================================================
   BIRTHDAY SEQUENCE
========================================================= */

function startBirthdaySequence() {

    const title = birthday.querySelector("h1");
    const name = birthday.querySelector(".birthday-name");
    const message = birthday.querySelector(".birthday-message");
    const finalBtn = birthday.querySelector("#finalButton");

    if (!title) return;

    title.style.opacity = "0";

    if (name) {
        name.style.opacity = "0";
    }

    if (message) {
        message.style.opacity = "0";
    }

    if (finalBtn) {
        finalBtn.style.opacity = "0";
    }


    /* -----------------------------------------
       CREATE SYSTEM TRANSMISSION
    ----------------------------------------- */

    let terminal = birthday.querySelector(".birthday-status");

    if (!terminal) {

        terminal = document.createElement("div");

        terminal.className = "birthday-status";

        terminal.innerHTML = `
            <span>> TRANSMISSION RECEIVED</span>
            <span>> DECRYPTING MESSAGE...</span>
            <span>> CONNECTION: SECURE</span>
        `;

        birthday.insertBefore(terminal, title);
    }

    setTimeout(() => {
        terminal.classList.add("active");
    }, 100);


    /* -----------------------------------------
       TYPE HAPPY BIRTHDAY
    ----------------------------------------- */

    const birthdayText = "HAPPY BIRTHDAY";

    title.textContent = "";

    setTimeout(() => {

        title.style.opacity = "1";

        typeText(
            title,
            birthdayText,
            115,
            () => {

                setTimeout(() => {

                    if (name) {
                        typeName(name);
                    }

                }, 500);

            }
        );

    }, 700);
}


/* =========================================================
   TYPE TEXT
========================================================= */

function typeText(element, text, speed, callback) {

    let index = 0;

    const timer = setInterval(() => {

        element.textContent =
            text.slice(0, index + 1);

        index++;

        if (index >= text.length) {

            clearInterval(timer);

            if (callback) {
                callback();
            }
        }

    }, speed);
}


/* =========================================================
   TYPE ABIKEMI
========================================================= */

function typeName(element) {

    const text = "ABIKEMI ❤️";

    element.textContent = "";
    element.style.opacity = "1";

    typeText(
        element,
        text,
        130,
        () => {

            setTimeout(() => {

                revealMessage();

            }, 600);

        }
    );
}


/* =========================================================
   REVEAL MESSAGE
========================================================= */

function revealMessage() {

    const message =
        birthday.querySelector(".birthday-message");

    const button =
        birthday.querySelector("#finalButton");

    if (message) {

        message.style.opacity = "1";

        message.classList.remove("message-reveal");

        void message.offsetWidth;

        message.classList.add("message-reveal");
    }

    setTimeout(() => {

        if (button) {
            button.style.opacity = "1";
        }

    }, 1200);
}


/* =========================================================
   LAUNCH PARTICLES
========================================================= */

function createLaunchParticles() {

    const container =
        document.createElement("div");

    container.className = "celebration";

    document.body.appendChild(container);

    for (let i = 0; i < 28; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "celebration-particle";

        particle.style.left = "50%";
        particle.style.top = "50%";

        const size =
            Math.random() * 3 + 1;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        container.appendChild(particle);

        const x =
            (Math.random() - 0.5) * 700;

        const y =
            (Math.random() - 0.5) * 700;

        particle.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(.2)",
                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.1)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    Math.random() * 900 + 800,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );
    }

    setTimeout(() => {
        container.remove();
    }, 2200);
}


/* =========================================================
   FINAL REVEAL
========================================================= */

finalButton.addEventListener("click", () => {

    showScreen(finalScreen);

    setTimeout(() => {

        createFinalCelebration();

    }, 900);
});


/* =========================================================
   FINAL CELEBRATION
========================================================= */

function createFinalCelebration() {

    const container =
        document.createElement("div");

    container.className =
        "celebration";

    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "celebration-particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        const size =
            Math.random() * 4 + 1;

        particle.style.width =
            `${size}px`;

        particle.style.height =
            `${size}px`;

        container.appendChild(particle);

        const x =
            (Math.random() - 0.5) * 500;

        const y =
            (Math.random() - 0.5) * 500;

        particle.animate(
            [
                {
                    transform: "translate(0,0) scale(.2)",
                    opacity: 0
                },

                {
                    transform:
                        `translate(${x}px,${y}px) scale(1)`,
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x * 1.4}px,${y * 1.4}px) scale(.1)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    Math.random() * 2200 + 1800,

                easing:
                    "cubic-bezier(.2,.8,.2,1)"
            }
        );
    }

    setTimeout(() => {
        container.remove();
    }, 4500);
}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        showScreen(identity);
    }

});


/* =========================================================
   TOUCH FEEDBACK
========================================================= */

document.querySelectorAll("button").forEach((button) => {

    button.addEventListener("touchstart", () => {
        button.style.transform = "scale(.96)";
    });

    button.addEventListener("touchend", () => {
        button.style.transform = "";
    });

});


/* =========================================================
   PRELOAD ALL PHOTOS
========================================================= */

memories.forEach((memory) => {

    const image = new Image();

    image.src = memory.image;

});


/* =========================================================
   START
========================================================= */

showScreen(intro);