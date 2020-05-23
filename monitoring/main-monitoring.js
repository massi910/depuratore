


var app = new Vue({
    el: '#app',
    data: 
    {
        interval: Object,
        activeMenu: "Allarmi",
        menus:
        {
            'Utenze': { name: "Utenze", description: "Utenze monitorabili", counter: 0, position: 0 },
            'Allarmi': { name: "Allarmi", description: "Controllo allarmi", counter: 0, position: 0  },
            'Grafici': { name: "Grafici", description: "Grafici e statistiche", counter: 0, position: 0 },
            'Fasi': { name: "Fasi", description: "Fasi di depurazione", counter: 0, position: 0 }
        },
        utenze: [],
        sections: [],
        units: [],
        consumptions: [],
        phases: [],
        water_cons: [],
        water_level: []
    },
    methods:
    {
        sendItems: function ()
        {
            axios
                .post("/php/update-mnt_items.php", this.utenze)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
        loadItems: function () 
        {
            axios
                .get('/php/mnt_items.php')
                .then(response => (this.utenze = response.data))
                .catch(error => console.log(error));
        },
        loadSections: function () 
        {
            axios
                .get('/php/mnt_sections.php')
                .then(response => (this.sections = response.data))
                .catch(error => console.log(error))
        },
        loadPhases: function ()
        {
            axios
                .get('/php/load-phases.php')
                .then(response => (this.phases = response.data))
                .catch(error => console.log(error))
        },
        /** handler for activation menu change */
        setActiveMenu: function (name) 
        {
            this.activeMenu = name; // set active menu
            this.setScrollPosition(name);   // set scrolling position
        },
        /**
         * Set the scroll position according to
         * the given menu
         * @param {String} menu 
         */
        setScrollPosition: function (menu) {
            $('html, body').animate({
                scrollTop: this.menus[menu].position
            }, 700);
        },
        moveToWarnings: function() {            
            this.activeMenu = this.menus.Allarmi.name;
        },
        reloadData: function () {
            this.loadItems();
            this.loadSections();
            this.loadPhases();
        },
        /**
         * Scroll to given id element
         * @param {String} id 
         */
        scrollToItem: function (id)
        {  
            $('html, body').animate({
                scrollTop: $('#' +id).offset().top
            }, 700);
        }
    },
    mounted()
    {
        /** get saved active menu */
        if (localStorage.activeMenu)
        {
            this.activeMenu = localStorage.activeMenu;
        }
        
    },
    watch:
    {
        utenze:
        {
            handler: function () {                
                this.sendItems();
            },
            deep: true
        },
        // whenever activeAlarmCounter changes, this function will run
        activeAlarmCounter: function () 
        {
            this.menus.Allarmi.counter = count;
        },
        /** store last active menu to the client machine */
        activeMenu(newValue)
        {
            localStorage.activeMenu = newValue;
        }
    },
    computed:
    {
        isActive: function ()
        {
            return (name) => {   return this.activeMenu == name; }
        },
        /** active alarms counter */
        activeAlarmCounter: function ()
        {
            count = 0;
            this.utenze.forEach(utenza => {
                if (utenza.b_alarm == true)
                    count++;
            });
            return count;
        },
    },
    created: async function() 
    {
        this.loadItems();
        this.loadSections();
        this.loadPhases();
        
        axios
            .get('/php/units.php')
            .then(response => this.units = response.data)
            .catch(error => console.log(error))

        axios.get('/php/consumptions.php')
            .then(response => this.consumptions = response.data)
            .catch(error => console.log(error))

        axios.get('/php/water_cons.php')
            .then(response => this.water_cons = response.data)
            .catch(error => console.log(error))

        axios.get('/php/water_level.php')
            .then(response => this.water_level = response.data)
            .catch(error => console.log(error))
    }
});