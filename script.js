// Project 4 - Virtual Pet - Kaylin Francisco

// create pet state or load from localStorage
let pet = JSON.parse(localStorage.getItem("pet")) || {
    health: 100,
    hunger: 100,
    energy: 100,
    play: 100,
}

// get DOM elements
const petStatus = document.getElementById("pet");
const hunger = document.getElementById("hungerStatus");
const energy = document.getElementById("energyStatus");
const play = document.getElementById("playStatus");

// buttons
const feedButton = document.getElementById("feedButton");
const playButton = document.getElementById("playButton");
const sleepButton = document.getElementById("sleepButton");
const resetButton = document.getElementById("resetButton");


function updatePetStatus() {
    // update text status
    hunger.textContent = 'Hunger Fullness: ' + pet.hunger;
    energy.textContent = 'Energy Level: ' + pet.energy;
    play.textContent = 'Play Level: ' + pet.play;

    // default background and image
    document.body.style.backgroundColor = "beige";
    petStatus.src = "happy.png";

    // update image pet state - lower numbers indicate poor state
    // if any states are below 40, make a light grey background
    if (pet.hunger <= 40 || pet.energy <= 40 || pet.play <= 40) {
        // show sad image
        petStatus.src = "sad.png";
        document.body.style.backgroundColor = "lightgrey";
    }
    // showing different images based on which stat is low
    else if (pet.energy <= 40) {
        petStatus.src = "sleep.png";
    }
    else if (pet.hunger <= 40) {
        petStatus.src = "feed.png";
    }
    else if (pet.play <= 40) {
        petStatus.src = "play.png";
    }
    else {
        // otherwise happy image
        petStatus.src = "happy.png";
    }
    // save state to localStorage
    localStorage.setItem("pet", JSON.stringify(pet));
};

feedButton.addEventListener("click", () => {
    if (pet.hunger < 100) { // only feed if below max
        // showing the feeding image for a few seconds
        petStatus.src = "feed.png";

        // increase hunger and energy
        pet.hunger = Math.min(100, pet.hunger + 20);
        pet.energy = Math.min(100, pet.energy + 10);

        // show image for 2 seconds before updating status
        setTimeout(() => {
            // return to normal image
            updatePetStatus(); 
        }, 2000);
    }
});

playButton.addEventListener("click", () => {
    // showing playing image
    petStatus.src = "play.png";
    // increase play, decrease energy
    pet.play = Math.min(100, pet.play + 20); // cap at 100
    pet.energy = Math.max(0, pet.energy - 10); // can't go below 0
    
    // show image for 2 seconds before updating status
    setTimeout(() => {
        updatePetStatus();
    }, 2000);
});

sleepButton.addEventListener("click", () => {
    // showing sleeping image
    petStatus.src = "sleep.png";
    // putting cat to sleep for a few seconds
    setTimeout(() => {
        // increase energy
        pet.energy = Math.min(100, pet.energy + 30);
        updatePetStatus();
    }, 2000);
});

function resetPet() {
    // stop the interval
    if (decayInterval !== null) {
        clearInterval(decayInterval);
        decayInterval = null;
    }

    // clear saved state
    localStorage.removeItem("pet");

    // Reload page
    location.reload();
};

// decay function to decrease stats over time
let decayInterval = null;

function startDecay() {
    // prevent multiple intervals from stacking
    if (decayInterval !== null) return;

    // decrease hunger and play every 8 seconds
    decayInterval = setInterval(() => {
        pet.hunger = Math.max(0, pet.hunger - 5);
        pet.play = Math.max(0, pet.play - 3);

        if (pet.hunger <= 20) {
            pet.health = Math.max(0, pet.health - 5);
        }

        updatePetStatus();
    }, 8000);
};
// reset button event listener
resetButton.addEventListener("click", resetPet);

// initial update and start decay
updatePetStatus();
startDecay();