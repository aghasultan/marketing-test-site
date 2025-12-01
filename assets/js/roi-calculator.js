document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("roi-form");
  if (!form) return;

  const calculate = () => {
    const monthlySpend =
      parseFloat(document.getElementById("monthly-spend").value) || 0;
    const hoursPerWeek =
      parseFloat(document.getElementById("hours-week").value) || 0;
    const hourlyRate =
      parseFloat(document.getElementById("hourly-rate").value) || 0;

    const annualLaborSavings = hoursPerWeek * hourlyRate * 52;
    const adWasteSavings = monthlySpend * 0.2 * 12; // 20% efficiency gain
    const totalUpside = annualLaborSavings + adWasteSavings;

    // ROI calculation wasn't explicitly requested to change, but logic implies it depends on upside.
    // Keeping original ROI calc logic if it makes sense or updating based on implied context.
    // The prompt specifically asked to implement logic for totalUpside.
    // "Update DOM elements #projected-savings with totalUpside"

    const annualROI =
      monthlySpend > 0 ? (totalUpside / (monthlySpend * 12)) * 100 : 0;

    const savingsEl = document.getElementById("projected-savings");
    const roiEl = document.getElementById("annual-roi");

    if (savingsEl)
      savingsEl.innerText =
        "$" +
        totalUpside.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
    if (roiEl) roiEl.innerText = annualROI.toFixed(0) + "%";
  };

  form.addEventListener("input", calculate);
});
