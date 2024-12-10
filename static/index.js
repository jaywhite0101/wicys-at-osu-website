document.addEventListener('DOMContentLoaded', function () {
    // JS for Slides
    const slides = document.querySelectorAll('.slide');
    const nextSlideButton = document.querySelector('.next-slide');
    const prevSlideButton = document.querySelector('.prev-slide');

    if (slides.length > 0 && nextSlideButton && prevSlideButton) {
        let currentSlide = 0;

        // Next slide button click handler
        nextSlideButton.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        });

        // Previous slide button click handler
        prevSlideButton.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        });
    }

    //JS for Testimony filtering:
    var testimonyElems = document.getElementsByClassName('testimonial-post')
    for (var i = 0; i < testimonyElems.length; i++) {
        allTestimonies.push(parseTestimonyElem(testimonyElems[i]))
    }


    var filterUpdateButton = document.getElementById('filter-update-button');

    if (filterUpdateButton) {
        console.log('Filter update button found');
        alert("found")
        filterUpdateButton.addEventListener('click', function() {
            console.log('Filter button clicked');
            doFilterUpdate();  // This triggers the filter update function
        });
    } else {
        console.log('Filter update button not found');
        alert("not found")
    }    

    // JS for Testimony Form
    const testimonySubmit = document.getElementById("testimonySubmit");

    if (testimonySubmit) {
        testimonySubmit.addEventListener('click', handleTestimonyAcceptClick);
    }

    function handleTestimonyAcceptClick() {
        const today = new Date().toLocaleDateString();
        const name = document.getElementById('testimonyName').value.trim();
        const desc = document.getElementById('testimonyInput').value.trim();
        const testimonyUrl = document.getElementById('testimonyImage').value;
        const alt = testimonyUrl === "" ? "No image provided." : "An image of WiCyS Club Activities!";

        if (!(name && desc)) {
            alert("Error: You must fill in at least your name and message!");
        } else {
            const processUrl = "/testimonials/addTestimony";

            fetch(processUrl, {
                method: "POST",
                body: JSON.stringify({ url: testimonyUrl, desc, name, date: today, alt }),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(data => {
                if (data.message === "Testimony saved successfully!") {
                    const testimonyTemplate = Handlebars.templates.singleTestimony;
                    const newTestimonyHTML = testimonyTemplate({ url: testimonyUrl, desc, name, alt });
                    const testimoniesSection = document.getElementById("testimonies-flex");
                    testimoniesSection.insertAdjacentHTML("beforeend", newTestimonyHTML);
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(err => {
                alert("An error occurred saving the testimony.");
                console.error("Client-side error:", err);
            });
        }
    }
});

// JS for Testimony Modals
// Debugging: Ensure the script is running
console.log("Script is running");

// Modal element references (Ensure these exist on the page before interacting with them)
var modal = document.getElementById('read-more-modal');
var modalBackdrop = document.getElementById('modal-backdrop');
var modalCloseButton = document.getElementById('modal-close');

// Debugging: Check if modal elements are found
if (modal && modalBackdrop && modalCloseButton) {
    console.log("Modal:", modal);
    console.log("Modal Backdrop:", modalBackdrop);
    console.log("Modal Close Button:", modalCloseButton);

    // Fetch testimony data from the server
    fetch('/testimonyData.json')
        .then(response => response.json())
        .then(testimonyData => {
            console.log("Testimony Data fetched:", testimonyData);

            // Function to show the modal
            function showModal(event) {
                var button = event.target;
                console.log("Button clicked:", button);

                // Retrieve the index of the clicked button
                var index = button.getAttribute('data-index');
                var testimony = testimonyData[index]; // Use the index to get the correct testimony data

                // Debugging: Log data for modal
                console.log("Modal data:", testimony);

                // Update modal content
                modal.querySelector('.modal-header h3').textContent = testimony.name;
                modal.querySelector('.testimony-desc-full').textContent = testimony.desc;
                var img = modal.querySelector('.testimony-img-container img');
                img.src = testimony.url;
                img.alt = testimony.alt;

                // Show the modal
                modal.classList.remove('hidden');
                modalBackdrop.classList.remove('hidden');
                console.log("Modal displayed.");
            }

            // Function to hide the modal
            function hideModal() {
                modal.classList.add('hidden');
                modalBackdrop.classList.add('hidden');
                console.log("Modal hidden.");
            }

            // Attach event listeners to "Read More" buttons if they exist
            var readMoreButtons = document.querySelectorAll('.readMore');
            console.log("Found Read More Buttons:", readMoreButtons);

            // Safeguard: Check if readMoreButtons exist and attach listeners
            if (readMoreButtons.length === 0) {
                console.warn("No Read More buttons found. Check your HTML structure and class names.");
            } else {
                readMoreButtons.forEach(function (button, index) {
                    // Store the index on the button element to pass to the modal function
                    button.setAttribute('data-index', index);
                    button.addEventListener('click', showModal);
                    console.log("Event listener attached to button:", button);
                });
            }

            // Attach event listener to close button
            modalCloseButton.addEventListener('click', hideModal);
            console.log("Event listener attached to modal close button.");

            // Ensure clicking on the backdrop also closes the modal
            modalBackdrop.addEventListener('click', hideModal);
        })
        .catch(error => {
            console.error("Error fetching testimony data:", error);
        });

} else {
    console.error("Modal or related elements not found. Please ensure they exist in the HTML structure.");
}

// Safeguard for Contact Form Elements
var nameVal = document.getElementById("contactName");
var email = document.getElementById("contactEmail");
var phone = document.getElementById("contactPhone");
var message = document.getElementById("contactInput");
var submitButton = document.getElementById("contactSubmit");

// Safeguard: Ensure elements exist before attaching event listeners
if (nameVal && email && phone && message && submitButton) {
    // Function to clear input fields
    function clearInput() {
        nameVal.value = '';
        email.value = '';
        phone.value = '';
        message.value = '';
    }

    // Function to handle form submission
    function submitContact() {
        console.log("here");

        // Check if all fields are filled
        if (nameVal.value == '' || email.value == '' || phone.value == '' || message.value == '') {
            alert('All fields must be completed');
        } else {
            alert('Thanks for reaching out!');
            clearInput(); // Clear input fields after submission
        }
    }

    // Attach event listener to submit button
    submitButton.addEventListener("click", submitContact);
} else {
    console.error("Contact form elements not found. Ensure the correct IDs are applied.");
}

// Safeguard for Navbar Hamburger Menu Interaction
// Ensure the menu icon exists before adding event listener
var menuIcon = document.querySelector('.menu-icon');
var navbarMenu = document.querySelector('.navbar ul');

if (menuIcon && navbarMenu) {
    menuIcon.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
    });
} else {
    console.error("Navbar menu or menu icon not found. Ensure the correct class names are applied.");
}

//JS for testimony filtering:

function insertNewTestimony(message, name, photoURL, date, alt){
    var testimonyContainer = document.getElementById("testimonies-flex")
    var data = {
        testimony:{
            desc: message,
            name: name,
            url: photoURL,
            date: date,
            alt: alt
        }
    };

    var html = Handlebars.templates["singleTestimony"](data);

    testimonyContainer.insertAdjacentHTML("beforeEnd", html)
}

function clearFiltersAndReinsertTestimonies() {
    document.getElementById('filter-text').value = ""
    document.getElementById('filter-start').value = ""
    document.getElementById('filter-end').value = ""
    document.getElementById('filter-image').value = "Yes"

    doFilterUpdate()
}



/*
 * A function to apply the current filters to a specific testimony.  Returns true
 * if the testimony passes the filters and should be displayed and false otherwise.
 */
function testimonyPassesFilters(testimony, filters) {
    if (filters.text) {
        var testimonyMessage = testimony.message.toLowerCase();
        var filterText = filters.text.toLowerCase();
        if (testimonyMessage.indexOf(filterText) === -1) {
            return false;
        }
    }

    if (filters.text) {
        var testimonyName = testimony.name.toLowerCase();
        var filterText = filters.text.toLowerCase();
        if (testimonyName.indexOf(filterText) === -1) {
            return false;
        }
    }

    if (filters.startDate) {
        // Ensure the testimony date is a valid Date object
        var testimonyDate = new Date(testimony.date);
        if (isNaN(testimonyDate.getTime())) {
            return false; // If testimony date is invalid, skip it
        }

        // Compare the testimony date with the filter start date
        if (testimonyDate < filters.startDate) {
            return false; // Testimony date is earlier than the filter start date
        }
    }

    // Check if the end date filter is applied
    if (filters.endDate) {
        // Ensure the testimony date is a valid Date object
        var testimonyDate = new Date(testimony.date);
        if (isNaN(testimonyDate.getTime())) {
            return false; // If testimony date is invalid, skip it
        }

        // Compare the testimony date with the filter end date
        if (testimonyDate > filters.endDate) {
            return false; // Testimony date is later than the filter end date
        }
    }

    if (filters.includeImage === "Yes") { //filtering includes testimonies with images
        if (!testimony.photoURL) {
            return false;
        }
    }

    return true;
}


/*
 * Applies the filters currently entered by the user to the set of all posts.
 * Any post that satisfies the user's filter values will be displayed,
 * including posts that are not currently being displayed because they didn't
 * satisfy an old set of filters.  Posts that don't satisfy the filters are
 * removed from the DOM.
 */
function doFilterUpdate() {
    /*
     * Grab values of filters from user inputs.
     */

    alert("filtering")
    var filters = {
        text: document.getElementById('filter-text').value.trim(),
        startDate: new Date(document.getElementById('filter-start').value), // Convert to Date object
        endDate: new Date(document.getElementById('filter-end').value), // Convert to Date object
        includeImage: document.getElementById('filter-image').value // Either "Yes" or "No"
    }
    

    /*
     * Remove all "testimony" elements from the DOM.
     */
    var testimonyContainer = document.getElementById('testimonies-flex')
    while(testimonyContainer.lastChild) {
        testimonyContainer.removeChild(testimonyContainer.lastChild)
    }

    /*
     * Loop through the collection of all "testimony" elements and re-insert ones
     * that meet the current filtering criteria.
     */
    allTestimonies.forEach(function (testimony) {
        if (testimonyPassesFilters(testimony, filters)) {
            insertNewTestimony(
                testimony.message,
                testimony.photoURL,
                testimony.name,
                testimony.date,
                testimony.alt
            )
        }
    })
}


/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.  The object
 * is structured like this:
 *
 * {
 *   description: "...",
 *   photoURL: "...",
 *   price: ...,
 *   city: "...",
 *   condition: "..."
 * }
 */
function parseTestimonyElem(testimonyData) {
    var testimony = {};

    // Directly extract data from the JSON
    testimony.photoURL = testimonyData.url || null;  // If no URL, set to null
    testimony.message = testimonyData.desc || '';    // Use description
    testimony.name = testimonyData.name || '';       // Use name
    testimony.date = new Date(testimonyData.date);   // Convert date string to Date object
    testimony.alt = testimonyData.alt || "No image provided"; // Alt text for image

    return testimony;
}





