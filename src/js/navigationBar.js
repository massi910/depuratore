

///////////////////////////////////////////////
/////////// top navigation bar effect /////////
///////////////////////////////////////////////


function stickyNavBar(sticky)
{
    if (window.pageYOffset >= sticky)
    {
        navbar.classList.add("top-bar-sticky");
    }
    else
    {
        navbar.classList.remove("top-bar-sticky");
    }
}

