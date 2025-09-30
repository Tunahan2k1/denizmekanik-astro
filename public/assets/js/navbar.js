// public/assets/js/navbar.js

$(document).ready(function () {
  // Aktif menü öğesini vurgula
  const currentPath = window.location.pathname;

  // Ana sayfa için özel kontrol
  if (currentPath === "/" || currentPath === "/index.html") {
    $('.navbar-nav .nav-link[href="/"]').addClass("active");
  } else {
    // Diğer sayfalar için kontrol
    $(".navbar-nav .nav-link").each(function () {
      const linkHref = $(this).attr("href");
      
      // Eğer link yolu, mevcut URL yolunun bir parçasıysa ve kök dizin değilse
      if (linkHref !== "/" && currentPath.startsWith(linkHref)) {
        $(this).addClass("active");
      }
    });
  }
});