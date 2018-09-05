var openMenu = document.querySelector(".page-header__btn");
var menu = document.querySelector(".main-nav");
var header = document.querySelector(".page-header");

menu.classList.remove("show");
header.classList.remove("page-header--background");

openMenu.addEventListener("click", function(evt){
  menu.classList.toggle("show");
  openMenu.classList.toggle("page-header__btn--open");
  header.classList.toggle("page-header--background");
});
