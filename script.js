const tempSlider = document.getElementById("tempSlider");
const tempDisplay = document.getElementById("tempDisplay");
const rainCheck = document.getElementById("rainCheck");
const suggestBtn = document.getElementById("suggestBtn");
const clothingSuggestion = document.getElementById("clothingSuggestion");

tempSlider.addEventListener("input", () => {
    tempDisplay.textContent = tempSlider.value + "°F";
});

function getClothingSuggestion() {
    const temp = parseInt(tempSlider.value);
    const isRaining = rainCheck.checked;
    let suggestion = "";

    if (temp >= 80 && !isRaining) {
        suggestion = "T-shirt and shorts!";
    } else if (temp >= 80 && isRaining) {
        suggestion = "T-shirt, shorts, and a light raincoat!";
    } else if (temp >= 60 && !isRaining) {
        suggestion = "Light jacket or long-sleeve shirt!";
    } else if (temp >= 60 && isRaining) {
        suggestion = "Light jacket and an umbrella!";
    } else if (temp < 60 && !isRaining) {
        suggestion = "Warm coat and pants!";
    } else {
        suggestion = "Coat and umbrella!";
    }

    clothingSuggestion.textContent = suggestion;
}

suggestBtn.addEventListener("click", getClothingSuggestion);