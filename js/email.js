function autoHide(...els) {
  setTimeout(() => els.forEach(el => (el.style.display = "none")), 4000);
}

async function handleFormSubmit({ form, submitBtn, successEl, errorEl, onSuccess }) {
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");

  successEl.style.display = "none";
  errorEl.style.display = "none";
  btnText.style.display = "none";
  btnLoader.style.display = "inline-block";
  submitBtn.disabled = true;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    const data = await res.json();

    if (data.success) {
      successEl.style.display = "block";
      form.reset();
      autoHide(successEl);
      if (onSuccess) onSuccess();
    } else {
      errorEl.style.display = "block";
      autoHide(errorEl);
    }
  } catch {
    errorEl.style.display = "block";
    autoHide(errorEl);
  } finally {
    btnText.style.display = "inline-block";
    btnLoader.style.display = "none";
    submitBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {

  // ── Contact Form ──
  const contactForm = document.getElementById("contact_form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmit({
        form: this,
        submitBtn: document.getElementById("send_message"),
        successEl: document.getElementById("success_message"),
        errorEl: document.getElementById("error_message")
      });
    });
  }

  // ── Popup Form ──
  const popupBtn = document.getElementById("popup_submit_btn");
  if (popupBtn) {
    popupBtn.addEventListener("click", function () {
      const form = document.getElementById("popup_form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      handleFormSubmit({
        form: form,
        submitBtn: this,
        successEl: document.getElementById("popup_success"),
        errorEl: document.getElementById("popup_error"),
        onSuccess: () => {
          setTimeout(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById("consultationModal"));
            if (modal) modal.hide();
          }, 2000);
        }
      });
    });
  }

  // ── Close popup on outside click ──
  const consultationModal = document.getElementById("consultationModal");
  if (consultationModal) {
    consultationModal.addEventListener("click", function (e) {
      if (e.target === this) {
        const modal = bootstrap.Modal.getInstance(this);
        if (modal) modal.hide();
      }
    });
  }

});