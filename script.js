
//These four constants grab elements from the HTML by their respective IDs to be interacted with
const cityInput = document.getElementById("cityInput");  //text box where the user enters the city name
const suggestBtn = document.getElementById("suggestBtn"); //the button that the user clicks after entering city name
const clothingSuggestion = document.getElementById("clothingSuggestion"); //where the outfit reccomendation will be displayed
const clothingImage = document.getElementById("clothingImage"); //where the image of the recommended outfit is shown

 // click listener that runs getClothingFromAPI function after the suggestBtn is clicked
suggestBtn.addEventListener("click", getClothingFromAPI);

//getClothingFromAPI async function
async function getClothingFromAPI() {
    // Step 1: Get & Validate the city input
    const city = cityInput.value.trim();  // Gets the value typed in the input box
    if (!city) {
        // If the user didn't type anything, it shows a message and stops the function
        clothingSuggestion.textContent = "Please enter a city name.";
        clothingImage.innerHTML = "";
        return;
    }

    // Step 2: Prepare the API URL
    const apiKey = "ca560f5451ad44e789504019252205";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
    console.log("Requesting:", url);
    const response = await fetch(url); // requests data from weather API
    console.log("Response status:", response.status);

    const data = await response.json(); // parses the response body into a usable JS object
    console.log("Raw response:", data);

    // Step 4: Validate response
        // If the API returns ans error, it is thrown to the catch{} block
    if (data.error) {
        throw new Error(data.error.message);
    }

    // Step 5: Extract weather details
    const temp = data.current.temp_f; // current temperature in Fahrenheit
    const conditionText = data.current.condition.text; // weather description
    const isRaining = conditionText.toLowerCase().includes("rain"); // value of true or false depending whether or not rain is mentioned

    console.log(`City: ${city}, Temp: ${temp}, Condition: ${conditionText}, Raining: ${isRaining}`);

    // initialie suggestion and image as empty strings
    let suggestion = "";
    let img = "";

    // Step 6: Generate suggestion and image
        // A series of if-else conditions determine what outfit to suggest and which image to show based on temperature and rain.
    if (temp >= 80 && !isRaining) {
        suggestion = "T-shirt and shorts!";
        img = "images/summer.png";
    } else if (temp >= 80 && isRaining) {
        suggestion = "T-shirt, shorts, and a light raincoat!";
        img = "images/summer_rain.png";
    } else if (temp >= 60 && !isRaining) {
        suggestion = "Light jacket or long-sleeve shirt!";
        img = "images/spring.png";
    } else if (temp >= 60 && isRaining) {
        suggestion = "Light jacket and an umbrella!";
        img = "images/spring_rain.png";
    } else if (temp < 60 && !isRaining) {
        suggestion = "Warm coat and pants!";
        img = "images/winter.png";
    } else {
        suggestion = "Coat and umbrella!";
        img = "images/winter_rain.png";
    }

    // Step 7: Show the suggestion
    // Updates the webpage with:
    // A sentence that summarizes the current weather and outfit suggestion
    clothingSuggestion.textContent = `In ${city}, it’s ${temp}°F and ${isRaining ? 'raining' : 'clear'} — ${suggestion}`;
    // An image corresponding to that outfit
    clothingImage.innerHTML = `<img src="${img}" alt="Outfit suggestion" style="max-width: 100%; height: auto;">`;

    // Step 8: Handle errors
        // If anything fails (network issues, invalid city, etc.), 
        // it shows an error message in the UI and logs the full error to the console.
    } catch (error) {
        console.error("Error fetching weather:", error);
        clothingSuggestion.textContent = `Could not retrieve weather data: ${error.message}`;
        clothingImage.innerHTML = "";
    }

}
