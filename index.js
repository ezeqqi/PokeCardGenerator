const progBar = document.querySelector(".progress");

function updateProgressBar(element, value) {
    value = Math.floor((value / 2.25));
    element.querySelector(".progress__fill").style.width = `${value}%`;
}

updateProgressBar(progBar, 224)