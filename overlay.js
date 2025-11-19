

const overlayRoot = document.getElementById("overlay-container");

const DEFAULT_TEXT = "Mensagem de apresentação";

let currentBox = null;
let hideTimer = null;

function onPdfRendered(pageWidth, pageHeight, text = DEFAULT_TEXT, durationMs = 0) {
    if (currentBox) currentBox.remove();
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }

    const box = document.createElement("div");
    box.className = "modern-box";
    box.innerHTML = text;
    overlayRoot.appendChild(box);
    currentBox = box;

    requestAnimationFrame(() => {
        const bw = 300;
        const bh = 300;

        const left = (pageWidth - bw) / 2;
        const top  = (pageHeight - bh) / 2;

        box.style.left = `${left}px`;
        box.style.top  = `${top}px`;
    });

    if (durationMs > 0) {
        hideTimer = setTimeout(() => {
            box.style.transition = "opacity 180ms ease, transform 180ms ease";
            box.style.opacity = "0";
            box.style.transform = "translateY(6px) scale(0.98)";
            setTimeout(() => { box.remove(); currentBox = null; }, 200);
        }, durationMs);
    }
}


window.onPdfRendered = onPdfRendered;

window.overlayController = {
    onPdfRendered
};
