document.addEventListener("DOMContentLoaded", function() {
    /*Gestione tasto torna su*/
    const scrollTopLink = document.querySelector(".scroll-top");
    scrollTopLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* Gestione menu a tendina*/
    const menuItems = document.querySelectorAll(".menu-item");

for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    const submenu = item.querySelector(".submenu");

    item.addEventListener("mouseover", function() {
        if (submenu) {
            submenu.style.display = "block";
        }
    });

    item.addEventListener("mouseout", function(event) {
        const e = event.relatedTarget;
        // Se sto uscendo dal menu-item e NON sto entrando in un figlio (come il submenu), chiudi
        if (submenu && !item.contains(e)) {
            submenu.style.display = "none";
        }
    });
}
});

//FUNZIONE VEDI TUTTI DI NOVITA
document.addEventListener("DOMContentLoaded", function () {
    const tutti = document.querySelectorAll(".vedi-tutti");

    for (let i = 0; i < tutti.length; i++) {
        tutti[i].addEventListener("click", function () {
            const info = tutti[i].getAttribute("data-info");
            if (!info) return;

            const modal = document.createElement("div");
            modal.classList.add("modal");

            const modalContent = document.createElement("div");
            modalContent.classList.add("modal-content");

            const modalText = document.createElement("p");
            modalText.textContent = info;

            modalContent.appendChild(modalText);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            setTimeout(function () {
                modal.classList.add("visible");
            }, 10);

            modal.addEventListener("click", function (e) {
                if (e.target === modal) {
                    modal.classList.remove("visible");
                    setTimeout(function () {
                        modal.remove();
                    }, 300);
                }
            });
        });
    }
});


/*IMAGE SLIDER PER I 4 PRODOTTI*/
document.addEventListener("DOMContentLoaded", function () {
    const imageSets = {
        "nuovo1.jpg": ["nuovo1.jpg", "nuovo1_alt1.jpg", "nuovo1_alt2.jpg", "nuovo1_alt3.jpg"],
        "nuovo2.jpg": ["nuovo2.jpg", "nuovo2_alt1.jpg", "nuovo2_alt2.jpg", "nuovo2_alt3.jpg"],
        "nuovo3.jpg": ["nuovo3.jpg", "nuovo3_alt1.jpg", "nuovo3_alt2.jpg", "nuovo3_alt3.jpg"],
        "nuovo4.jpg": ["nuovo4.jpg", "nuovo4_alt1.jpg", "nuovo4_alt2.jpg", "nuovo4_alt3.jpg", "nuovo4_alt4.jpg"]
    };

    const sliders = document.getElementsByClassName("image-slider");
    for (let i = 0; i < sliders.length; i++) {
        const slider = sliders[i];
        const img = slider.getElementsByClassName("slide-image")[0];
        const originalSrc = img.getAttribute("src");
        const images = imageSets[originalSrc];
        let index = 0;

        const arrows = slider.getElementsByClassName("arrow");
        for (let j = 0; j < arrows.length; j++) {
            const arrow = arrows[j];

            if (arrow.className.indexOf("left") !== -1) {
                arrow.addEventListener("click", function () {
                    index = (index - 1 + images.length) % images.length;
                    img.src = images[index];
                });
            }

            if (arrow.className.indexOf("right") !== -1) {
                arrow.addEventListener("click", function () {
                    index = (index + 1) % images.length;
                    img.src = images[index];
                });
            }
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    hamburger.addEventListener("click", function () {
        if (mobileMenu.style.display === "flex") {
            mobileMenu.style.display = "none";
        } else {
            mobileMenu.style.display = "flex";
        }
    });
});



//EMAIL NEWSLETTER
function subscribe()
{
    const spazio = document.querySelector(".iscriviti .spazio-avviso");
    if(!spazio.querySelector('.avviso'))
    {
        const new_div = document.createElement('div');
        new_div.textContent='Il campo indirizzo e-mail è obbligatorio';
        new_div.classList.add('avviso');
        spazio.appendChild(new_div);   
    } 
}
const messaggio = document.querySelector('.bottone-iscriviti');
messaggio.addEventListener('click', subscribe);

//API PAGAMENTO
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("payment-modal");
    const closeButton = modal.querySelector(".close-button");
    const confirmButton = document.getElementById("confirm-payment");
    const resultText = document.getElementById("payment-result");
  
    const cards = document.querySelectorAll(".product-card");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (!card.querySelector(".buy-button")) {
        const buyBtn = document.createElement("button");
        buyBtn.textContent = "Acquista ora";
        buyBtn.classList.add("buy-button");
        card.appendChild(buyBtn);
  
        buyBtn.addEventListener("click", function () {
          const productName = card.querySelector("p").textContent;
          const price = card.querySelector(".price").textContent;
  
          document.getElementById("payment-product-name").textContent = productName;
          document.getElementById("payment-price").textContent = price;
          resultText.textContent = "";
  
          modal.classList.add("visible");
          document.body.style.overflow = "hidden";
        });
      }
    }
  
    closeButton.addEventListener("click", function () {
      modal.classList.remove("visible");
      document.body.style.overflow = "";
    });
  
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("visible");
        document.body.style.overflow = "";
      }
    });
  
    confirmButton.addEventListener("click", function () {
      fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          "Authorization": "Bearer secret",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "amount=1000&currency=eur&payment_method_types[]=card"
      })
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        resultText.textContent = "✅ Acquisto completato! ID pagamento: " + json.id;
      })
      .catch(function () {
        resultText.textContent = "❌ Pagamento non effettuato.";
      });
    });
  });


//API PRODOTTI STRIPE
  document.addEventListener("DOMContentLoaded", function () {
    const stripeProductsUrl = "https://api.stripe.com/v1/products";
    const stripeApiKey = "secret";
  
    function getStripeProducts() {
      const loadingMessage = document.getElementById("products-loading-message");
      const productsList = document.getElementById("products-list");
  
      if (loadingMessage) {
        loadingMessage.style.display = "block";
      }
      if (productsList) {
        productsList.innerHTML = "";
      }
  
      fetch(stripeProductsUrl, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + stripeApiKey //autenticazione tramite token (predefinita Stripe)
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data && data.data && data.data.length > 0) { //se ci sono prodotti e quindi se l'array di prodotti è popolato
          for (let i = 0; i < data.data.length; i++) {
            const product = data.data[i];
  
            const productDiv = document.createElement("div"); //creo dinamicamente gli elementi e poi nel css definisco come vengono visualizzati
            productDiv.classList.add("product");
  
            const productName = document.createElement("h3");
            productName.textContent = product.name;
  
            if (product.images && product.images.length > 0) {
              const productImage = document.createElement("img");
              productImage.src = product.images[0];
              productImage.alt = product.name;
              productDiv.appendChild(productImage);
            }
  
            const productDescription = document.createElement("p");
            productDescription.textContent = product.description || "Nessuna descrizione disponibile.";
  
            productDiv.appendChild(productName);
            productDiv.appendChild(productDescription);
  
            productsList.appendChild(productDiv);
          }
  
          if (loadingMessage) {
            loadingMessage.style.display = "none";
          }
        } else {
          if (loadingMessage) {
            loadingMessage.textContent = "Vetrina in evidenza vuota";
          }
        }
      })
      .catch(function (error) {
        if (loadingMessage) {
          loadingMessage.textContent = "Errore nel recupero dei prodotti.";
        }
      });
    }
  
    getStripeProducts();
  });
  