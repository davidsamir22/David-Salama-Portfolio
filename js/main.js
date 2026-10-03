const progressDiv = document.querySelector(".progress-div"),
    progressBar = document.querySelectorAll(".progress-bar");

ScrollOut({
    targets: ".progress-div",
});

window.addEventListener("scroll", function () {
    if (progressDiv.dataset.scroll == "in") {
        progressBar.forEach(el => {
            let valueNow = el.getAttribute("aria-valuenow")
            el.style.width = valueNow + "%";
            let CounterSpan = el.parentElement.parentElement.querySelector(".progress-value span");
            let Timer = setInterval(() => {
                if (Number(CounterSpan.textContent) < valueNow) {
                    CounterSpan.textContent = Number(CounterSpan.textContent) + 1;
                }
                else {
                    clearInterval(Timer)
                }
            }, 500)
        }
        )
    }
    else {
        progressBar.forEach(el => {
            el.style.width = 0 + "%"
            el.parentElement.parentElement.querySelector(".progress-value span").textContent = 0
        } )
        
    }
})