

//////////////////////////////////////////////////////////////////
//////////////////////// UTILS FUNC //////////////////////////////
//////////////////////////////////////////////////////////////////


/**
 * Return the total price evaluating
 * the input sections.
 * 
 * @param sectionsMap 
 */
function evalPrice(sectionsMap) 
{
    var current = new Money(0);
    sectionsMap.forEach((value) => {
        var selected = value.selected;
        if (selected != null)
            current.add(selected.price);
    });

    return current;
}

/**
 * Set the target element
 * as selected item.
 * (item selection handler)
 */
function itemSelectionHandler()
{    
    console.log(pvSectionsMap);
    
    var section = pvSectionsMap.get(parseInt(this.getAttribute("data-section")));
    console.log(section);
    
    section.setSelectedItem(parseInt(this.getAttribute("data-index")));
}

/**
 * Payment summary sticky effect.
 * @param sticky 
 */
function stickyCalcCardHandler(sticky) {
    // pageYOffset: pixels the current document has been scrolled from the upper left corner
    if (window.pageYOffset >= sticky)
        calcCard.addClass("sticky-calc-card");
    else
        calcCard.removeClass("sticky-calc-card");
}

//////////////////////////////////////////////////////////////////
///////////////////////////// MAIN ///////////////////////////////
//////////////////////////////////////////////////////////////////

// calc-card sticky effect
var navBarHeight = $('#top-bar').outerHeight();   // navigation bar height
var calcCard = $('#calc-card');
var parentTopPadding = calcCard.parent().css('padding-top');    // calc-card parent top padding
var calcCardSticky = (parseInt(parentTopPadding.replace(/px/, "")) + navBarHeight);
$(':root').css('--navBar-height', calcCardSticky + "px");   // set global property


////////////////////////
////////////////////////    TODO DB
////////////////////////

// money currency
var usedCurrency = "€"; // todo DB

////////////////////////
////////////////////////
////////////////////////


var pvItemsMap = new Map(); // items map
var pvSectionsMap = new Map();  // sections map

// items and sections loading
$(document).ready(function () 
{
    $.ajax({
        url: '/budgeting/items.php',
        type: 'get',
        dataType: 'JSON',   // type of data expected from the server
        success: function (response) 
        {
            var len = response.length;
            for (var i = 0; i < len; i++) {
                var id = parseInt(response[i].id);
                var name = response[i].name;
                var description = response[i].description;
                var price = response[i].price;
                var section = parseInt(response[i].section);

                var newItem = new PvItem(id, name, description, price, section);
                var temp = pvItemsMap.get(section);
                if (temp != undefined)
                    temp.push(newItem);
                else
                    temp = [newItem];
                pvItemsMap.set(section, temp);
            }
        },
        error: function () 
        {
            console.log("error");   // todo
        }
    });

    $.ajax({
        url: '/budgeting/sections.php',
        type: 'get',
        dataType: 'JSON',
        success: function (response) {
            var len = response.length;
            for (var i = 0; i < len; i++) {
                var id = parseInt(response[i].id);
                var name = response[i].name;
                var description = response[i].description;
                var mandatory = response[i].mandatory != 0;                
                pvSectionsMap.set(id, new PvSection(id, name, description, pvItemsMap.get(id), mandatory));
            }   
        }
    });
});

//////////////////////////////////////////////////////////////////
///////////////////// EVENT HANDLERS /////////////////////////////
//////////////////////////////////////////////////////////////////

$(window).scroll(function () {
    stickyCalcCardHandler(calcCardSticky);
});

$(document).ajaxStop(function () {
    // add sections
    var pvAccordion = $('#pvAccordion');
    pvSectionsMap.forEach(section => section.scaffoldSection(pvAccordion));
    $('.pv-btn-item').click(itemSelectionHandler);
    $('.pv-btn-item').click(function () {
        $('#current-price').html(evalPrice(pvSectionsMap).toString());
    });

    // payment summary init
    var basePrice = evalPrice(pvSectionsMap);    // todo DB
    var currentPrice = new Money(basePrice.value);
    $('#base-price').html(basePrice.toString());
    $('#current-price').html(currentPrice.toString());
})

