(() => {
  "use strict";
  const images = {
    primary: "https://lh3.googleusercontent.com/aida/AEtjO1WVo62uo_zhrVS1zQ-8fus740Uf4lCreDGpBoAiJPtF4mgWRufi7Y39PFyoQAb5KqHXaQTYOnK581Rn_WRcRPVHsdEmr6I7UudLIHV_fLB8FhR2QfW0Z19EqBWF5f5jBgl8uQe8ocr4tKQgCmtko35UGX-RoEj9op_fNrbvOiWqulb4YpYatQlkDoWcmJTZhQ_4dsxeNB6Lrg2jezztMUsVk8m54c3nx9u82qEcdCHv85N8nWvir0DHePGE",
    secondary: "https://lh3.googleusercontent.com/aida/AEtjO1WNjMo6tjab06p3f7epmLD4q6VWLejueLUxGuCDSkiFQv0nchYhjUhiEq25NcR9ucMz6qAT9hZwGdAMuNyDyEtyvw2WuUPHg1YffP-h3WYs7Od1k2y-et5ghBuTMhPENYjIxGSTCSLdQhRGY_vxY40IWKgSBjmaeI6bVrlV2aiChwM9Kig61jb4JKfsjrC4luK_1wt8wPu975Mn320xVPJjOmVeaR0DwaT_jDrDi2PjipGWl4mynTgyiQ"
  };
  const state = { price: 799, quantity: 1, delivery: 60 };
  const $ = (id) => document.getElementById(id);
  const banglaNumber = (value) => String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  function render() {
    const subtotal = state.price * state.quantity;
    const total = subtotal + state.delivery;
    $("quantity").textContent = banglaNumber(state.quantity);
    $("summary-price").textContent = banglaNumber(state.price);
    $("subtotal").textContent = banglaNumber(subtotal);
    $("delivery-cost").textContent = banglaNumber(state.delivery);
    $("total").textContent = banglaNumber(total);
    $("mobile-total").textContent = banglaNumber(total);
  }
  function selectProduct(button) {
    state.price = Number(button.dataset.price);
    $("summary-name").textContent = button.dataset.name;
    $("summary-image").src = button.dataset.image;
    $("summary-image").alt = button.dataset.name;
    document.querySelectorAll("[data-product-card]").forEach((card) => card.classList.remove("is-selected"));
    button.closest("[data-product-card]")?.classList.add("is-selected");
    render();
    $("order-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function setVideo(type) {
    const isPrimary = type === "demo";
    $("video-preview").src = isPrimary ? images.primary : images.secondary;
    $("video-title").textContent = isPrimary ? "স্মার্ট ড্রয়িং প্রজেক্টর" : "আনবক্সিং প্রিভিউ";
    document.querySelectorAll(".video-option").forEach((button) => {
      const active = button.dataset.video === type;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }
  document.querySelectorAll(".product-button").forEach((button) => button.addEventListener("click", () => selectProduct(button)));
  document.querySelectorAll("[data-quantity]").forEach((button) => button.addEventListener("click", () => {
    state.quantity = Math.max(1, Math.min(20, state.quantity + Number(button.dataset.quantity)));
    render();
  }));
  document.querySelectorAll("input[name=delivery]").forEach((radio) => radio.addEventListener("change", () => {
    state.delivery = Number(radio.value);
    document.querySelectorAll(".radio-card").forEach((card) => card.classList.toggle("is-active", card.querySelector("input").checked));
    render();
  }));
  document.querySelectorAll(".video-option").forEach((button) => button.addEventListener("click", () => setVideo(button.dataset.video)));
  $("video-toggle").addEventListener("click", () => setVideo(document.querySelector(".video-option.is-active").dataset.video === "demo" ? "unboxing" : "demo"));
  $("order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    $("order-id").textContent = `DEMO-${banglaNumber(Date.now().toString().slice(-6))}`;
    $("success-total").textContent = banglaNumber(state.price * state.quantity + state.delivery);
    form.closest(".order-box").hidden = true;
    $("success-box").hidden = false;
    $("success-box").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  $("new-order").addEventListener("click", () => {
    $("order-form").reset();
    state.quantity = 1; state.delivery = 60;
    document.querySelectorAll(".radio-card").forEach((card) => card.classList.toggle("is-active", card.querySelector("input").checked));
    $("order-form").closest(".order-box").hidden = false;
    $("success-box").hidden = true;
    render();
  });
  $("summary-name").textContent = document.querySelector(".product-button").dataset.name;
  $("summary-image").src = document.querySelector(".product-button").dataset.image;
  $("summary-image").alt = $("summary-name").textContent;
  render();
})();
