////////////////////// general
window.onscroll = function () 
{
    stickyNavBar(sticky);
    stickyCalcCard(sticky);
};

var navbar = document.getElementById("top-bar");
var sticky = navbar.offsetTop;  // navigation bar offset position
var navBarHeight = navbar.offsetHeight; // height of the navigation bar
document.documentElement.style.setProperty('--navBar-height', navBarHeight + "px");
var calcCard = document.getElementById("calculator_card");


////////////////////// sticky calculator card effect
function stickyCalcCard(sticky) 
{
    if (window.pageYOffset >= sticky) 
    {
        calcCard.classList.add("sticky-calc-card");
    }
    else 
    {
        calcCard.classList.remove("sticky-calc-card");
    }
}
