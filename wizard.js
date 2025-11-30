document.addEventListener("DOMContentLoaded", () => {
  const wizard = document.getElementById("wizard-app");
  if (!wizard) return;
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"; // TODO: Update ID
  const state = { step: 0, maxStep: 2, formData: {} };
  const steps = Array.from(wizard.querySelectorAll("fieldset[data-step]"));
  const progressBar = document.getElementById("wizard-progress-fill");
  const nextBtn = document.getElementById("btn-next");
  const prevBtn = document.getElementById("btn-prev");
  const submitBtn = document.getElementById("btn-submit");
  const form = document.getElementById("wizard-form");
  const successMsg = document.getElementById("wizard-success");

  const updateUI = () => {
    steps.forEach((el, index) => {
      if (index === state.step) {
        el.classList.remove("hidden");
        el.classList.add("active-step");
        const firstInput = el.querySelector("input, select, textarea");
        if (firstInput) firstInput.focus();
      } else {
        el.classList.add("hidden");
        el.classList.remove("active-step");
      }
    });
    const progress = ((state.step + 1) / (state.maxStep + 1)) * 100;
    progressBar.style.width = `${progress}%`;
    prevBtn.style.visibility = state.step === 0 ? "hidden" : "visible";
    if (state.step === state.maxStep) {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    } else {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
  };

  const validateStep = (stepIndex) => {
    const currentFieldset = steps[stepIndex];
    const inputs = currentFieldset.querySelectorAll("input, select, textarea");
    let isValid = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValid = false;
        showError(input);
      } else {
        clearError(input);
      }
    });
    return isValid;
  };

  const showError = (input) => {
    const group = input.closest(".form-group");
    group.classList.add("invalid");
    group.classList.remove("valid");
  };
  const clearError = (input) => {
    const group = input.closest(".form-group");
    group.classList.remove("invalid");
    group.classList.add("valid");
  };

  const handleNext = () => {
    if (validateStep(state.step)) {
      state.step++;
      updateUI();
    } else {
      const currentFieldset = steps[state.step];
      const invalidInput = currentFieldset.querySelector(":invalid");
      if (invalidInput) invalidInput.focus();
    }
  };

  const handlePrev = () => {
    if (state.step > 0) {
      state.step--;
      updateUI();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(state.step)) return;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    const payload = new FormData(form);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.classList.add("hidden");
        document.querySelector(".wizard-controls").classList.add("hidden");
        document.querySelector(".wizard-progress").classList.add("hidden");
        successMsg.classList.remove("hidden");
        successMsg.classList.add("fade-in");
      } else { throw new Error("Submission failed"); }
    } catch (error) {
      alert("Something went wrong. Please email me directly at hello@aghasultan.com");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Application";
    }
  };

  nextBtn.addEventListener("click", handleNext);
  prevBtn.addEventListener("click", handlePrev);
  submitBtn.addEventListener("click", handleSubmit);
  form.addEventListener("blur", (e) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
      e.target.checkValidity() ? clearError(e.target) : showError(e.target);
    }
  }, true);
  updateUI();
});
