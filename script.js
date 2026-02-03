(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
function handleYesClick() {
    window.location.href = "yes_page.html";
}

function rectsOverlap(rectA, rectB, gap = 10) {
    return !(
        rectA.right + gap < rectB.left ||
        rectA.left > rectB.right + gap ||
        rectA.bottom + gap < rectB.top ||
        rectA.top > rectB.bottom + gap
    );
}

function setNoInitialPosition() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const buttons = document.querySelector('.buttons');

    if (!noButton || !yesButton || !buttons) {
        return;
    }

    const containerRect = buttons.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();
    const noRect = noButton.getBoundingClientRect();
    const gap = 20;

    const totalWidth = yesRect.width + gap + noRect.width;
    const startX = Math.max(0, (containerRect.width - totalWidth) / 2);
    const yesX = startX;
    const noX = startX + yesRect.width + gap;
    const y = Math.max(0, (containerRect.height - yesRect.height) / 2);

    yesButton.style.left = `${yesX}px`;
    yesButton.style.top = `${y}px`;
    noButton.style.left = `${noX}px`;
    noButton.style.top = `${y}px`;
}

function setupNoButtonProximity() {
    const noButton = document.querySelector('.no-button');
    const buttons = document.querySelector('.buttons');

    if (!noButton || !buttons) {
        return;
    }

    const triggerDistance = 90;

    buttons.addEventListener('mousemove', (event) => {
        const noRect = noButton.getBoundingClientRect();
        const noCenterX = noRect.left + noRect.width / 2;
        const noCenterY = noRect.top + noRect.height / 2;
        const dx = event.clientX - noCenterX;
        const dy = event.clientY - noCenterY;
        const distance = Math.hypot(dx, dy);

        if (distance < triggerDistance) {
            moveNoButton();
        }
    });
}

function moveNoButton() {
    const noButton = document.querySelector('.no-button');
    const buttons = document.querySelector('.buttons');
    const yesButton = document.querySelector('.yes-button');

    if (!noButton || !buttons || !yesButton) {
        return;
    }

    const containerRect = buttons.getBoundingClientRect();
    const buttonRect = noButton.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();
    const padding = 20;
    const maxX = Math.max(padding, containerRect.width - buttonRect.width - padding);
    const maxY = Math.max(padding, containerRect.height - buttonRect.height - padding);
    let x = padding;
    let y = padding;

    for (let i = 0; i < 20; i += 1) {
        x = Math.random() * (maxX - padding) + padding;
        y = Math.random() * (maxY - padding) + padding;

        const candidateRect = {
            left: containerRect.left + x,
            top: containerRect.top + y,
            right: containerRect.left + x + buttonRect.width,
            bottom: containerRect.top + y + buttonRect.height,
        };

        if (!rectsOverlap(candidateRect, yesRect, 12)) {
            break;
        }
    }

    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
}

document.addEventListener('DOMContentLoaded', setNoInitialPosition);
document.addEventListener('DOMContentLoaded', setupNoButtonProximity);
window.addEventListener('resize', setNoInitialPosition);
