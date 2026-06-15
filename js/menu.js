document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const menuLinks = document.querySelectorAll("#mainmenu a.menu-item");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Sirf mobile menu open ho tab hi close karo
      if (menuBtn.classList.contains("menu-open")) {
        menuBtn.click();
      }
    });
  });
});