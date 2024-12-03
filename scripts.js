// // console.log("Hello World!");


const photoDatabase = [
    ["fish.jpg", "Animals"], ["bird.jpg", "Animals"], ["Elephant.jpg", "Animals"], ["deer.jpg", "Animals"], ["Tiger.jpg", "Animals"], ["monkey.jpg", "Animals"], ["eagle.jpg", "Animals"], ["fox.jpg", "Animals"], ["Polar bear.jpg", "Animals"],
    ["ai-gen (1).jpg", "AI"], ["ai-gen (2).jpg", "AI"], ["ai-gen (3).jpg", "AI"], ["ai-gen (4).jpg", "AI"], ["ai-gen (5).jpg", "AI"], ["ai-gen (6).jpg", "AI"], ["ai-gen (7).jpg", "AI"], ["ai-gen (8).jpg", "AI"], ["ai-gen (9).jpg", "AI"], ["ai-gen (10).jpg", "AI"], ["f.a.d (1).jpg", "foodAndDrink"], ["f.a.d (2).jpg", "foodAndDrink"], ["f.a.d (3).jpg", "foodAndDrink"], ["f.a.d (4).jpg", "foodAndDrink"], ["f.a.d (5).jpg", "foodAndDrink"],
    ["landscape1.jpg", "Landscape"], ["beachLandscape.jpg", "Landscape"], ["cityLandscape.jpg", "Landscape"], ["forestLandscape.jpg", "Landscape"], ["portLandscape.jpg", "Landscape"], ["snowyForestLandscape.jpg", "Landscape"], ["winterLandscape.jpg", "Landscape"], ["frozenSeaLandscape.jpg", "Landscape"],
    ["night1.jpg", "Night"], ["night2.jpg", "Night"], ["night3.jpg", "Night"], ["night4.jpg", "Night"], ["night5.jpg", "Night"], ["night6.jpg", "Night"], ["night7.jpg", "Night"],
    ["people.jpg", "People"], ["People (1).jpg", "People"], ["People (2).jpg", "People"], ["People (3).jpg", "People"], ["People (4).jpg", "People"], ["People (5).jpg", "People"],
    ["WP (1).jpg", "wallpaper"], ["WP (2).jpg", "wallpaper"], ["WP (3).jpg", "wallpaper"], ["WP (4).jpg", "wallpaper"], ["WP (5).jpg", "wallpaper"], ["WP (6).jpg", "wallpaper"], ["WP (7).jpg", "wallpaper"], ["WP (8).jpg", "wallpaper"], ["WP (9).jpg", "wallpaper"], ["WP (10).jpg", "wallpaper"]
]

const baseFolder = "./Images/";
const gallery = document.getElementById('photo-gallery');


// Function to render photos dynamically
function renderPhotos(categories) {
    gallery.innerHTML = '';


    // Loop through the selected categories and generate photos
    photoDatabase.forEach(([filename, category]) => {
        if (categories.includes('all') || categories.includes(category)) {
            // Create a photo container
            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo';

            // Create an image element
            const img = document.createElement('img');
            img.src = `${baseFolder}${category}/${filename}`;
            img.alt = `${category} photo`;
            img.loading = "lazy";


            photoDiv.appendChild(img);
            gallery.appendChild(photoDiv);
        }
    });


    // Wait for images to load before initializing Masonry
    imagesLoaded(gallery, function () {
        new Masonry(gallery, {
            itemSelector: '.photo',  // Target photo elements
            columnWidth: '.photo',  // Use photo width for columns
            gutter: 10,             // Space between items
            fitWidth: true          // Center the gallery
        });
    });


}

// Function to manage tab clicks
function manageTabs() {
    const tabs = document.querySelectorAll('.tab');
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            let selectedCategories;
            if (category === 'all') {
                selectedCategories = ['all'];
            } else {
                selectedCategories = [category];
            }
            renderPhotos(selectedCategories);
        });
    }
}



document.addEventListener('DOMContentLoaded', () => {
    //manage userProfile
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        const loginLink = document.querySelector(".logIn");

        if (loginLink) {
            const profileElement = document.createElement("a");
            profileElement.className = "profile-info";
            profileElement.innerHTML = `<img src="./Images/profileAvatar.jpg" alt="Profile" class="Profile-icon" width="30">
            <span class="username">${loggedInUser.username}</span><br>
            <button class="logout-button">log out</button>
            `;
            loginLink.parentNode.replaceChild(profileElement, loginLink);

            const logoutButton = document.querySelector(".logout-button");
            logoutButton.addEventListener("click", () => {
                localStorage.removeItem("loggedInUser");
                window.location.href = "./login.html";
            });
        }
    }


    //render all photos on page load
    manageTabs(); // Set up tab click listeners
    renderPhotos(['all']); // Initial render of all categories
});



const toggleButton = document.querySelector('.toggle');
const toggleItems = document.querySelector('.toggle-items');

// Toggle menu visibility when the button is clicked
toggleButton.addEventListener('click', (event) => {
    toggleItems.classList.toggle('active');
    event.stopPropagation(); // Stop click from propagating
});

// Close the menu when clicking outside
document.addEventListener('click', () => {
    if (toggleItems.classList.contains('active')) {
        toggleItems.classList.remove('active');
    }
});

// Prevent menu clicks from closing it
toggleItems.addEventListener('click', (event) => {
    event.stopPropagation();
});






const submitImageButton = document.querySelector(".submit-image");

submitImageButton.addEventListener("click", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
        window.location.href = "./login.html";
        return;
    }
    const dialogBox = document.createElement("dialog");
    dialogBox.className = "SDialog";
    document.body.appendChild(dialogBox);


    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => dialogBox.close());
    dialogBox.appendChild(closeButton);


    //create container to take image Url
    const urlDiv = document.createElement("div");
    urlDiv.className = "urlDiv"

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.placeholder = "Enter Image URL";
    urlInput.style.width = "100%";
    urlInput.style.height = "300px"
    urlInput.required = true;
    urlDiv.appendChild(urlInput);


    const imageCat = document.createElement("select");
    const categoriesOption = ["AI generated", "Animals", "foodAndDrink", "Landscape", "Night", "People", "Wallpaper"];

    categoriesOption.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.toLowerCase().replace(/ /g, "");
        option.textContent = cat;
        imageCat.appendChild(option);
    })


    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.marginTop = "10px"


    dialogBox.appendChild(urlDiv);
    dialogBox.appendChild(imageCat);
    dialogBox.appendChild(submitButton);

    dialogBox.showModal();


});



