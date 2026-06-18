const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

const demoData = {
  new: {
    title: "First-time shopper",
    offer: "Welcome offer: 10% off trending essentials",
    products: ["Everyday tote", "Starter capsule", "Best seller kit"],
    conversion: "+9.4%",
    aov: "+6.1%"
  },
  intent: {
    title: "High-intent buyer",
    offer: "Urgency offer: free express shipping on viewed items",
    products: ["Viewed jacket", "Matching sneaker", "Limited colorway"],
    conversion: "+14.8%",
    aov: "+11.2%"
  },
  vip: {
    title: "VIP repeat customer",
    offer: "Loyalty offer: early access to premium drops",
    products: ["Premium bundle", "Members-only set", "New arrival edit"],
    conversion: "+18.3%",
    aov: "+17.6%"
  },
  saver: {
    title: "Cart saver",
    offer: "Recovery offer: complete checkout with a smart bundle",
    products: ["Cart item", "Frequently bought pair", "Add-on under $25"],
    conversion: "+22.1%",
    aov: "+8.9%"
  }
};

function renderDemo(mode) {
  const data = demoData[mode];
  if (!data) return;
  document.querySelectorAll("[data-demo-title]").forEach((node) => node.textContent = data.title);
  document.querySelectorAll("[data-demo-offer]").forEach((node) => node.textContent = data.offer);
  document.querySelectorAll("[data-demo-conversion]").forEach((node) => node.textContent = data.conversion);
  document.querySelectorAll("[data-demo-aov]").forEach((node) => node.textContent = data.aov);
  document.querySelectorAll("[data-demo-product]").forEach((node, index) => {
    node.textContent = data.products[index] || data.products[0];
  });
  document.querySelectorAll("[data-demo]").forEach((button) => {
    button.classList.toggle("active", button.dataset.demo === mode);
  });
}

document.querySelectorAll("[data-demo]").forEach((button) => {
  button.addEventListener("click", () => renderDemo(button.dataset.demo));
});
renderDemo("new");

const billingToggle = document.querySelector("[data-billing-toggle]");
const billingLabel = document.querySelector("[data-billing-label]");
const prices = document.querySelectorAll("[data-monthly]");

if (billingToggle) {
  billingToggle.addEventListener("click", () => {
    const yearly = billingToggle.classList.toggle("yearly");
    billingToggle.setAttribute("aria-pressed", String(yearly));
    if (billingLabel) billingLabel.textContent = yearly ? "Yearly" : "Monthly";
    prices.forEach((price) => {
      price.textContent = `$${yearly ? price.dataset.yearly : price.dataset.monthly}`;
    });
  });
}

document.querySelectorAll(".faq-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector(".faq-icon").textContent = isOpen ? "-" : ">";
  });
});

function buildModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "signup-title");
  modal.innerHTML = `
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-panel">
      <button class="modal-close" type="button" aria-label="Close" data-close-modal>x</button>
      <span class="pill light">Start free</span>
      <h3 id="signup-title" style="margin-top:20px">Create your Kartos trial</h3>
      <p class="lead" style="margin-left:0;font-size:18px">Launch a personalized storefront demo for your ecommerce team.</p>
      <form class="signup-form">
        <label>Full name<input required name="name" autocomplete="name"></label>
        <label>Work email<input required type="email" name="email" autocomplete="email"></label>
        <label>Store URL<input required name="store" autocomplete="url" placeholder="https://yourstore.com"></label>
        <button class="btn full" type="submit">Start 14-day free trial</button>
      </form>
      <div class="success" hidden>Your Kartos trial request is ready. The team will follow up by email.</div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-close-modal]").forEach((node) => node.addEventListener("click", closeModal));
  modal.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    modal.querySelector("form").hidden = true;
    modal.querySelector(".success").hidden = false;
  });
  return modal;
}

const modal = buildModal();

function openModal() {
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector("input").focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  const form = modal.querySelector("form");
  form.hidden = false;
  form.reset();
  modal.querySelector(".success").hidden = true;
}

document.querySelectorAll("[data-signup]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});
