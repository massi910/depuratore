





var app = new Vue({
    el: '#app',
    data: 
    {
        activeMenu: "Allarmi",
        menus: 
        [
            { name: "Utenze", description: "Utenze monitorabili", counter: 0 },
            { name: "Allarmi", description: "Controllo allarmi", counter: 0 },
            { name: "Grafici Acqua", description: "Grafici consumo e livello acqua", counter: 0 },
            { name: "Grafici Utenze", description: "Grafici statistiche utenze", counter: 0 }
        ],
        utenze: [],
        sections: [],
        units: [],
        consumptions: [],
        water_cons: [],
        water_level: []
    },
    methods:
    {
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
        /** handler for activation menu change */
        setActiveMenu: function (name) 
        {
            this.activeMenu = name;
        },
        moveToWarnings: function() {
            console.log(this.menus[1].name);
            
            this.activeMenu = this.menus[1].name;
        },
        reloadData: function () {
            this.loadItems();
            this.loadSections();
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
        // whenever activeAlarmCounter changes, this function will run
        activeAlarmCounter: function (newValue, oldValue) 
        {
            this.menus[1].counter = count;
        },
        /** store last active menu to the client machine */
        activeMenu(newValue)
        {
            localStorage.activeMenu = newValue;
        }
    },
    computed:
    {
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
        isActive() 
        {
            return (name) => {   return this.activeMenu == name; }
        }
    },
    created: async function() 
    {
        this.loadItems();
        this.loadSections();
        
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