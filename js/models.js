
///////////////
/**
 * Class to represent prices
 */
class Money 
{
    constructor(val) 
    {
        this.currency = usedCurrency;
        this.value = parseFloat(val);
    }

    add(money)
    {
        if (money.currency == this.currency)
            this.value += money.value;
    }

    toString() 
    {
        if (this.value == 0)
            return "";
        return this.currency + " " + this.value.toFixed(2);
    }
}


/**
 * This class represent a model for a
 * section in the budgeting page.
 */
class PvSection
{
    constructor(id, name, description, items, mandatory)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.items = items;
        this.items.push(new PvItem(99, "nessuno", "nessuno", 0, id));
        this.mandatory = mandatory;
        this.selected = null;
        if (mandatory)
            this.selected = this.items[0];
    }

    /**
     * Set the selected item in this section
     * 
     * @param index 
     */
    setSelectedItem(index)
    {
        this.selected = this.items[index];
        $("#selected"+this.id).text(this.selected.name);
        $("#included" +this.id).text(this.selected.price.toString());
    }

    /**
     * Scaffold the section object and
     * append it to the given parent parameter
     * 
     * @param parent 
     */
    scaffoldSection(parent)
    {
        var card = this.createCard();
        var cardHeader = this.createCardHeader();
        var button = this.createButton();
        
        cardHeader.append(button);
        card.append(cardHeader)
        if (this.selected == null)
        {
            var collapse = this.createCollapse();
            card.append(collapse);
        }
            

        parent.append(card);
    }

    createCard()
    {
        var temp = document.createElement('div');
        return $(temp).addClass('card');
    }

    createCardHeader()
    {
        var temp = document.createElement('div');
        return $(temp)
            .addClass('card-header')
            .attr('id', "heading-" +this.id);
    }

    createButton()
    {
        var temp = document.createElement('button');
        var button = $(temp)
            .addClass('btn')
            .addClass('btn-block')
            .addClass('btn-lg')
            .addClass('btn-light')
            .attr('type', 'button')
            .attr('data-toggle', 'collapse')
            .attr('data-target', "#collapse" +this.id)
            .attr('aria-expanded', 'true')
            .attr('aria-controls', "collapse" +this.id);

        var tRow1 = document.createElement('div');
        var row1 = $(tRow1).addClass('row');
        var tCntTitle = document.createElement('div');
        var cntTitle = $(tCntTitle)
            .addClass('col')
            .addClass('text-left');
        var tTitle = document.createElement('h4');
        var title = $(tTitle)
            .text(this.name);
        
        var tRow2 = document.createElement('div');
        var row2 = $(tRow2)
            .addClass('row')
            .addClass('selected-item');

        // selected item
        var sel = "nessuno";
        var inc = "";
        if (this.selected != null)
        {
            sel = this.selected.name;
            inc = this.selected.price.toString();
            button.addClass('disabled');
        }

        var tCol1 = document.createElement('div');
        var col1 = $(tCol1)
            .attr('id', "selected" +this.id)
            .text(sel)
            .addClass('col-lg-10')
            .addClass('text-left');
        var tCol2 = document.createElement('div');
        var col2 = $(tCol2)
            .attr('id', "included" + this.id)
            .text(inc)
            .addClass('col-lg-2')
            .addClass('text-right');

        cntTitle.append(title);
        row1.append(cntTitle);
        row2.append(col1).append(col2);

        return button.append(row1).append(row2);
    }

    createCollapse()
    {
        var tCollapse = document.createElement('div');
        var collapse = $(tCollapse)
            .addClass('collapse')
            .attr('id', "collapse" +this.id)
            .attr('aria-labelledby', "heading"+this.id)
            .attr('data-parent', '#pvAccordion')

        var tCnt = document.createElement('div');
        var cnt = $(tCnt)
            .addClass('container')
            .addClass('p-4');


        for (let index = 0; index < this.items.length; index++) 
        {
            const item = this.items[index];
            cnt.append(item.scaffoldItem(index));
        }

        return collapse.append(cnt);
    }
    
}

/**
 * This class represent a model
 * for a single item in the budgeting page.
 */
class PvItem
{
    constructor(id, name, description, price, section)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = new Money(price);
        this.section = section;
    }

    /**
     * Return a button object properly formatted
     * representing this item.
     * 
     * @param index 
     */
    scaffoldItem(index)
    {
        var tButton = document.createElement('button');
        var button = $(tButton)
            .attr('id', "pv-btn-item" +this.id)
            .attr('data-section', this.section)
            .attr('data-index', index)
            .attr('data-id', this.id)   // not used
            .addClass('btn')
            .addClass('btn-outline-secondary')
            .addClass('btn-block')
            .addClass('pv-btn-item');

        var tRow = document.createElement('div');
        var row = $(tRow)
            .addClass('row');

        var tCol1 = document.createElement('div');
        var col1 = $(tCol1)
            .text(this.name)
            .addClass('col')
            .addClass('text-left')
            .addClass('pv-el-info');

        var tCol2 = document.createElement('div');
        var col2 = $(tCol2)
            .text(this.price.toString())
            .addClass('col-md-2')
            .addClass('text-right')
            .addClass('pv-el-money');

        row.append(col1).append(col2);

        return button.append(row);
    }
}