// ==================================================
// CROSSCUT SALON
// JAVASCRIPT
// MODULE 15 - PHASE 1 CHECKPOINT
// ==================================================



// ==================================================
// 1. BURGER MENU
// MODULE 12 - DOM + EVENTS
// ==================================================


const menuToggle =
    document.querySelector("#menu-toggle");


const siteNav =
    document.querySelector("#site-nav");



menuToggle.addEventListener(
    "click",
    function () {

        siteNav.classList.toggle("active");

        menuToggle.classList.toggle("active");


        const isOpen =
            siteNav.classList.contains("active");


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);



// Close mobile menu after clicking a link

const navigationLinks =
    document.querySelectorAll(
        ".site-nav a"
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                siteNav.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);



// ==================================================
// 2. SELECT DOM ELEMENTS
// ==================================================


const servicesGrid =
    document.querySelector(
        "#services-grid"
    );


const serviceSelect =
    document.querySelector(
        "#service-select"
    );


const bookingForm =
    document.querySelector(
        "#booking-form"
    );


const formMessage =
    document.querySelector(
        "#form-message"
    );



// ==================================================
// 3. FETCH SERVICES FROM JSON
// MODULE 14 - FETCH + JSON
// ==================================================


function loadServices() {


    fetch("data/services.json")

        .then(
            function (response) {


                // Check if the file exists

                if (!response.ok) {

                    throw new Error(
                        "Unable to load services.json"
                    );

                }


                return response.json();

            }
        )


        .then(
            function (services) {


                console.log(
                    "Services loaded:",
                    services
                );


                displayServices(
                    services
                );


                populateServiceSelect(
                    services
                );

            }
        )


        .catch(
            function (error) {


                console.error(
                    "Error loading services:",
                    error
                );


                servicesGrid.innerHTML = `

                    <p class="loading-message">

                        Unable to load services.
                        Please try again later.

                    </p>

                `;

            }
        );

}



// ==================================================
// 4. DISPLAY SERVICES
// ==================================================


function displayServices(services) {


    // Clear loading message

    servicesGrid.innerHTML = "";


    services.forEach(
        function (service) {


            // Create article

            const serviceCard =
                document.createElement(
                    "article"
                );


            // Add CSS class

            serviceCard.classList.add(
                "service-card"
            );


            // Add service content

            serviceCard.innerHTML = `

                <div class="service-number">
                    Service ${service.id}
                </div>

                <h3>
                    ${service.name}
                </h3>

                <p>
                    ${service.description}
                </p>

                <p class="price">
                    ₱${service.price.toLocaleString()}
                </p>

                <a
                    href="#booking"
                    class="button book-service"
                    data-service-id="${service.id}"
                >
                    Book Now
                </a>

            `;


            // Add card to page

            servicesGrid.appendChild(
                serviceCard
            );

        }
    );

}



// ==================================================
// 5. ADD SERVICES TO BOOKING SELECT
// ==================================================


function populateServiceSelect(
    services
) {


    services.forEach(
        function (service) {


            const option =
                document.createElement(
                    "option"
                );


            option.value =
                service.name;


            option.textContent =
                `${service.name} - ₱${service.price.toLocaleString()}`;


            serviceSelect.appendChild(
                option
            );

        }
    );

}



// ==================================================
// 6. BOOK NOW BUTTON
// DOM EVENT DELEGATION
// ==================================================


servicesGrid.addEventListener(
    "click",
    function (event) {


        const clickedButton =
            event.target.closest(
                ".book-service"
            );


        if (!clickedButton) {

            return;

        }


        const serviceId =
            clickedButton.dataset.serviceId;


        console.log(
            "Selected service ID:",
            serviceId
        );


        // Scroll to booking form

        document
            .querySelector("#booking")
            .scrollIntoView({
                behavior: "smooth"
            });


        // Find the service option

        const serviceOptions =
            serviceSelect.options;


        for (
            let i = 0;
            i < serviceOptions.length;
            i++
        ) {


            if (
                serviceOptions[i]
                    .value ===
                clickedButton
                    .closest(".service-card")
                    .querySelector("h3")
                    .textContent
            ) {

                serviceSelect.value =
                    serviceOptions[i]
                        .value;

                break;

            }

        }

    }
);



// ==================================================
// 7. FORM VALIDATION
// MODULE 13
// ==================================================


bookingForm.addEventListener(
    "submit",
    function (event) {


        event.preventDefault();


        clearErrors();


        let isValid = true;



        // ------------------------------------------
        // NAME
        // ------------------------------------------

        const nameInput =
            document.querySelector(
                "#customer-name"
            );


        const name =
            nameInput.value.trim();


        if (name === "") {

            showError(
                nameInput,
                "name-error",
                "Please enter your full name."
            );

            isValid = false;

        }
        else if (name.length < 2) {

            showError(
                nameInput,
                "name-error",
                "Name must contain at least 2 characters."
            );

            isValid = false;

        }



        // ------------------------------------------
        // PHONE
        // ------------------------------------------

        const phoneInput =
            document.querySelector(
                "#customer-phone"
            );


        const phone =
            phoneInput.value.trim();


        const phonePattern =
            /^09\d{9}$/;


        if (phone === "") {

            showError(
                phoneInput,
                "phone-error",
                "Please enter your mobile number."
            );

            isValid = false;

        }
        else if (
            !phonePattern.test(phone)
        ) {

            showError(
                phoneInput,
                "phone-error",
                "Please enter a valid Philippine mobile number."
            );

            isValid = false;

        }



        // ------------------------------------------
        // SERVICE
        // ------------------------------------------

        const selectedService =
            serviceSelect.value;


        if (
            selectedService === ""
        ) {

            showError(
                serviceSelect,
                "service-error",
                "Please select a service."
            );

            isValid = false;

        }



        // ------------------------------------------
        // DATE
        // ------------------------------------------

        const dateInput =
            document.querySelector(
                "#booking-date"
            );


        const selectedDate =
            dateInput.value;


        if (
            selectedDate === ""
        ) {

            showError(
                dateInput,
                "date-error",
                "Please select an appointment date."
            );

            isValid = false;

        }
        else {

            const today =
                new Date();


            today.setHours(
                0,
                0,
                0,
                0
            );


            const chosenDate =
                new Date(
                    selectedDate
                );


            if (
                chosenDate < today
            ) {

                showError(
                    dateInput,
                    "date-error",
                    "Please select a future date."
                );

                isValid = false;

            }

        }



        // ------------------------------------------
        // TIME
        // ------------------------------------------

        const timeInput =
            document.querySelector(
                "#booking-time"
            );


        if (
            timeInput.value === ""
        ) {

            showError(
                timeInput,
                "time-error",
                "Please select an appointment time."
            );

            isValid = false;

        }



        // ------------------------------------------
        // FINAL RESULT
        // ------------------------------------------

        if (isValid) {


            formMessage.textContent =
                "Booking information looks good! This is a demo booking and is not yet saved to a database.";


            formMessage.className =
                "form-message success";


            console.log(
                "Valid booking:",
                {
                    name: name,
                    phone: phone,
                    service: selectedService,
                    date: selectedDate,
                    time: timeInput.value
                }
            );


        }
        else {


            formMessage.textContent =
                "Please correct the errors above.";


            formMessage.className =
                "form-message error";

        }

    }
);



// ==================================================
// 8. SHOW VALIDATION ERROR
// ==================================================


function showError(
    input,
    errorId,
    message
) {


    input.classList.add(
        "input-error"
    );


    const errorElement =
        document.querySelector(
            `#${errorId}`
        );


    errorElement.textContent =
        message;

}



// ==================================================
// 9. CLEAR VALIDATION ERRORS
// ==================================================


function clearErrors() {


    const inputs =
        document.querySelectorAll(
            ".input-error"
        );


    inputs.forEach(
        function (input) {

            input.classList.remove(
                "input-error"
            );

        }
    );


    const errors =
        document.querySelectorAll(
            ".error-message"
        );


    errors.forEach(
        function (error) {

            error.textContent = "";

        }
    );


    formMessage.textContent = "";

    formMessage.className =
        "form-message";

}



// ==================================================
// 10. SET MINIMUM BOOKING DATE
// ==================================================


const bookingDate =
    document.querySelector(
        "#booking-date"
    );


const today =
    new Date();


const year =
    today.getFullYear();


const month =
    String(
        today.getMonth() + 1
    ).padStart(
        2,
        "0"
    );


const day =
    String(
        today.getDate()
    ).padStart(
        2,
        "0"
    );


bookingDate.min =
    `${year}-${month}-${day}`;



// ==================================================
// 11. CURRENT YEAR
// ==================================================


const currentYear =
    document.querySelector(
        "#current-year"
    );


currentYear.textContent =
    new Date().getFullYear();



// ==================================================
// 12. START APPLICATION
// ==================================================


loadServices();