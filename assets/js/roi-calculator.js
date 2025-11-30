document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('roi-form');
    if (!form) return;

    const calculate = () => {
        const spend = parseFloat(document.getElementById('monthly-spend').value) || 0;
        const hours = parseFloat(document.getElementById('hours-week').value) || 0;
        const rate = parseFloat(document.getElementById('hourly-rate').value) || 0;

        // Logic: Annual Internal Cost vs Agency Efficiency
        // Assuming we save 80% of their manual time + improve ad efficiency by 20%
        const annualLaborCost = hours * rate * 52;
        const adInefficiencyCost = spend * 0.20 * 12; // 20% wasted spend

        const totalSavings = annualLaborCost + adInefficiencyCost;
        const annualROI = spend > 0 ? (totalSavings / (spend * 12)) * 100 : 0;

        const savingsEl = document.getElementById('projected-savings');
        const roiEl = document.getElementById('annual-roi');

        if(savingsEl) savingsEl.innerText = '$' + totalSavings.toLocaleString();
        if(roiEl) roiEl.innerText = annualROI.toFixed(0) + '%';
    };

    form.addEventListener('input', calculate);
});
