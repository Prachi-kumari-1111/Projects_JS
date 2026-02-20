var icon = document.getElementById("icon");

if (localStorage.getItem("theme")) {
    document.body.classList.add(localStorage.getItem("theme")); //
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "sun.png";
    } else {
        icon.src = "moon.png";
    }
}

icon.onclick = function() {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
        icon.src = "sun.png";
        localStorage.setItem("theme", "dark-theme");
    } else {
        icon.src = "moon.png";
        localStorage.setItem("theme", "light-theme");
    }
};

