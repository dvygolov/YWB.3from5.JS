function init3from5(params) {
  document.addEventListener("DOMContentLoaded", function () {
    //adding stylesheet
    let css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("type", "text/css");
    css.setAttribute("href", "ywb3from5.css");
    document.querySelector("head").append(css);

    let formBlock = document.querySelector(params.selectors.form);
    formBlock.style.display = "none";

    let bagsBlock = document.querySelector(params.selectors.bags);
    bagsBlock.classList.add("order-form-lottery");
    bagsBlock.innerHTML = `
      <div class="card spin-wrapper" id="bags__sales">
        <div class="card-instructions">
          <h1>${params.texts.title}</h1>
          <br/>
          <p class="card-counter inL_79940">
            ${params.texts.tries} <b class="counter-attempts"></b>
          </p>
        </div>
        <div class="card-container"></div>
      </div>
    `;

    // Generate cards programmatically
    let cardContainer = document.createElement("div");
    cardContainer.className = "card-container";

    for (let i = 0; i <= 15; i++) {
      let cardItem = `
        <div class="card-item">
          <div class="card-item-cover">
            <img src="meshok.png" alt="Meshok Bag" loading="lazy">
          </div>
          <div class="card-item-reload">
            <img src="meshok.png" alt="Reload Image" loading="lazy">
          </div>
          <div class="card-item-sale">
            <p class="card-item-sale-high">50%</p>
            <p class="card-item-sale-medium">25%</p>
            <p class="card-item-sale-low">17%</p>
            <img src="star.png" alt="Star Image" loading="lazy">
          </div>
        </div>`;
      cardContainer.innerHTML += cardItem;
    }

    bagsBlock.querySelector(".card-container").replaceWith(cardContainer);

    // Event Delegation
    cardContainer.addEventListener("click", function (e) {
      let target = e.target;
      while (target !== cardContainer) {
        if (target.classList.contains("card-item")) {
          open(target);
          return;
        }
        target = target.parentNode;
      }
    });

    const attempt = 5;
    const counterElem = document.querySelector(".counter-attempts");
    let counterBagsWidget = 0;

    counterElem.textContent = attempt;

    function open(target) {
      if (counterBagsWidget >= 5) return;

      if (counterBagsWidget < 6 && !target.classList.contains("showed-goods")) {
        counterBagsWidget++;
        subtractCounter();
        changeClass(counterBagsWidget, target);
      }
      target.classList.add("showed-goods");
    }

    function subtractCounter() {
      let substr = attempt - counterBagsWidget;
      counterElem.textContent = substr;
    }

    function changeClass(counter, target) {
      switch (counter) {
        case 1:
          target.classList.add("sale", "sale-low");
          break;
        case 2:
        case 4:
          target.classList.add("sale", "sale-high");
          break;
        case 3:
          target.classList.add("sale", "sale-medium");
          break;
        case 5:
          target.classList.add("sale", "sale-high");
          document
            .querySelectorAll(".card-item.sale.sale-high")
            .forEach((elem) => elem.classList.add("glow"));
          showForm();
          break;
      }
    }

    function showForm() {
      bagsBlock.classList.add("bags-fade-out");
      setTimeout(function () {
        bagsBlock.style.display = "none";
        formBlock.style.display = "block";
        window.scrollTo({
          top: formBlock.getBoundingClientRect().top,
          behavior: "smooth",
        });

        startTimer();
      }, 2000);
    }
  });
}
