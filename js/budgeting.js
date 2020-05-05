

////////////////////// sticky calculator card effect
function stickyCalcCard(sticky) 
{
    // pageYOffset: pixels the current document has been scrolled from the upper left corner
    if (window.pageYOffset >= sticky) 
        calcCard.addClass("sticky-calc-card");
    else 
        calcCard.removeClass("sticky-calc-card");
}



/**
 * Return the total price evaluating
 * the input sections
 * 
 * @param sectionsMap 
 */
function evalPrice(sectionsMap) 
{
    var current = new Money(0);
    sectionsMap.forEach((value, key) => {
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
function itemSelection()
{
    var section = pvSectionsMap.get(parseInt(this.getAttribute("data-section")));
    section.setSelectedItem(parseInt(this.getAttribute("data-index")));
}

//////////////////////////////////////////////////////////////////
///////////////////////////// MAIN ///////////////////////////////
//////////////////////////////////////////////////////////////////

$(window).scroll(function () {
    stickyCalcCard(calcCardSticky);
});

// calc-card sticky
var navBarHeight = $('#top-bar').outerHeight();   // navigation bar height
var calcCard = $('#calc-card');
var parentTopPadding = calcCard.parent().css('padding-top');    // calc-card parent top padding
var calcCardSticky = (parseInt(parentTopPadding.replace(/px/, "")) + navBarHeight);
$(':root').css('--navBar-height', calcCardSticky + "px");



////////////////////////
////////////////////////    TODO DB
////////////////////////

// money currency
var usedCurrency = "€"; // todo DB

// sections and items init


var pvItemsMap = new Map(); // todo DB
pvItemsMap.set(1, [new PvItem(1, "Vasca in Moplen", "Vasca contenitore in moplen", 150, 1),
    new PvItem(2, "Vasca in alluminio", "Vasca contenitore in alluminio", 100, 1)]);
pvItemsMap.set(2, [new PvItem(3, "Filtro a sabbia", "Filtro a sabbia", 50, 2)]);
pvItemsMap.set(3, [new PvItem(4, "Base in cemento piccola", "Base in cemento 3x3", 40, 3),
    new PvItem(5, "Base in cemento grande", "Base in cemento 4x4", 60, 3)]);
pvItemsMap.set(4, [new PvItem(6, "item6", "item6", 40, 4),
    new PvItem(7, "item7", "item7", 60, 4)]);
pvItemsMap.set(5, [new PvItem(8, "item8", "item8", 40, 5),
    new PvItem(9, "item9", "item9", 60, 5)]);
pvItemsMap.set(6, [new PvItem(10, "item10", "item10", 40, 6),
    new PvItem(11, "item11", "item11", 60, 6)]);
pvItemsMap.set(7, [new PvItem(12, "item12", "item12", 40, 7),
    new PvItem(11, "item13", "item13", 60, 7)]);
pvItemsMap.set(8, [new PvItem(14, "item14", "item14", 40, 8),
    new PvItem(15, "item15", "item15", 60, 8)]);

var pvSectionsMap = new Map();    // todo DB
pvSectionsMap.set(1, new PvSection(1, "Vasca contenitore", "vasca cnt", pvItemsMap.get(1), false));
pvSectionsMap.set(2, new PvSection(2, "filtro", "filtro acqua", pvItemsMap.get(2), true));
pvSectionsMap.set(3, new PvSection(3, "base cemento", "base in cemento per struttura", pvItemsMap.get(3), false));
pvSectionsMap.set(4, new PvSection(4, "Section4", "sezione 4", pvItemsMap.get(4), false));
pvSectionsMap.set(5, new PvSection(5, "Section5", "sezione 5", pvItemsMap.get(5), false));
pvSectionsMap.set(6, new PvSection(6, "Section6", "sezione 6", pvItemsMap.get(6), false));
pvSectionsMap.set(7, new PvSection(7, "Section7", "sezione 7", pvItemsMap.get(7), false));
pvSectionsMap.set(8, new PvSection(8, "Section8", "sezione 8", pvItemsMap.get(8), false));
////////////////////////
////////////////////////
////////////////////////


// add sections
var pvAccordion = $('#pvAccordion');
pvSectionsMap.forEach(section => section.scaffoldSection(pvAccordion));

$('.pv-btn-item').click(itemSelection);
$('.pv-btn-item').click(function () 
{
    $('#current-price').html(evalPrice(pvSectionsMap).toString());
});

// payment summary init
var basePrice = evalPrice(pvSectionsMap);    // todo DB
var currentPrice = new Money(basePrice.value);
$('#base-price').html(basePrice.toString());
$('#current-price').html(currentPrice.toString());