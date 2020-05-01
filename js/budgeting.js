////////////////////// general
window.onscroll = function () 
{
    stickyCalcCard(this.calcCardSticky);
};

var navBarHeight = $('#top-bar').outerHeight();   // navigation bar height
var calcCard = $('#calc-card');
var parentTopPadding = calcCard.parent().css('padding-top');    // calc-card parent top padding
var calcCardSticky = (parseInt(parentTopPadding.replace(/px/, "")) + navBarHeight);
$(':root').css('--navBar-height', calcCardSticky + "px");


////////////////////// sticky calculator card effect
function stickyCalcCard(sticky) 
{
    // pageYOffset: pixels the current document has been scrolled from the upper left corner
    if (window.pageYOffset >= sticky) 
    {
        calcCard.addClass("sticky-calc-card");
    }
    else 
    {
        calcCard.removeClass("sticky-calc-card");
    }
}
