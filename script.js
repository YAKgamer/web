let navmenu = document.getElementById("nav");
let nav = document.querySelector(".reveal");
let home = document.getElementById("home");
let index = document.getElementById("index");
let black = document.getElementById("black");
let h4 = document.getElementById("h4");
let bool = true;
function toggleNavMenu(state) {
    if (state === "show") {
        navmenu.style.left = "-0.625rem"; 
        nav.style.left = "13.125rem";
        home.style.left = "0.3125rem";
        black.style.opacity = "0.5";
        black.style.pointerEvents = "auto";
        nav.id = "showing";
    } else {
        navmenu.style.left = "-19.375rem";
        home.style.left = "-19.375rem";
        nav.style.left = "-0.625rem";
        black.style.pointerEvents = "none";
        black.style.opacity = "0";
        nav.id = "hiding";
    }
}

function resetNavMenu() {
    navmenu.style.transition = "0s";
    navmenu.style.width = "18.75rem";
    navmenu.style.left = "-19.375rem";
    black.style.transition = "0s";
    black.style.opacity= "0";
    navmenu.style.backgroundColor = "rgb(0, 100, 200)";
    // Re-enable transition after reset
    setTimeout(function() {
        navmenu.style.transition = "0.65s";
        black.style.transition = "0.65s";
    }, 50);
}

nav.addEventListener("click", function () {
    toggleNavMenu(nav.id === "hiding" ? "show" : "hide");
});

home.addEventListener("click", function () {
    goto("index");
});

h4.addEventListener("click", function () {
    goto("page1");
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        toggleNavMenu("hide");
    }
});

document.addEventListener("click", function(event) {
    if (!navmenu.contains(event.target) && !nav.contains(event.target)) {
        toggleNavMenu("hide");
    }
});

function goto(thepage){
    // Expand nav menu
    toggleNavMenu("hide");
    if (window.location.pathname.endsWith(thepage+".html")) {
        return;
    }
    h4.style.top = "0.5%";
    h4.style.left = "20%";
    navmenu.style.width = "250%";
    navmenu.style.transition = "0.65s"; // Enable animation

    // Simulate page change with background color
    setTimeout(function() {
        navmenu.style.backgroundColor = "rgb(0, 38, 71)";
    }, 500);

    // Move buttons out of view
    home.style.left = "-19.375rem";
    nav.style.left = "-0.625rem";
    
    nav.id = "hiding";
    index.style.opacity = "0";

    // Reset after animation
    setTimeout(function() {
        resetNavMenu();
    }, 1100);
    setTimeout(function() {
        fadeOutPage(thepage);
    }, 150);
    
    
}

// Function to apply fade-out effect on the current page
function fadeOutPage(thepage) {
    document.getElementById("page-content").classList.add('fade');  // Trigger the fade effect
    setTimeout(() => {
        window.location.href = thepage+".html";  // After fading out, navigate to the new page
    }, 985);  // Wait for the fade-out animation to finish (1s in this case)

    setTimeout(() => {
        document.getElementById("page-content").classList.add('fade', 'in');  // After fading out, navigate to the new page
    }, 985); 
}

// Function to apply fade-in effect on the new page
window.onload = function () {
    document.getElementById("page-content").classList.add('fade', 'in','loaded');  // Apply fade-in effect when the new page loads
};
