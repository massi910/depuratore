





var app = new Vue({
    el: '#app',
    data: 
    {
        activemenu: "Allarmi",
        menus: 
        [
            { name: "Utenze", description: "Utenze monitorabili", counter: 0 },
            { name: "Allarmi", description: "Controllo allarmi", counter: 0 },
            { name: "Grafici", description: "Grafici e statistiche", counter: 0 }
        ],
        utenze: [],
        sections: []
    },
    methods:
    {
        /** handler for activation menu change */
        setActiveMenu: function (name) 
        {
            this.activemenu = name;
        },
        moveToWarnings: function() {
            this.activeMenu = this.menu[1].name
        }
    },
    mounted()
    {
        /** get saved active menu */
        if (localStorage.activemenu)
        {
            this.activemenu = localStorage.activemenu;
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
        activemenu(newValue)
        {
            localStorage.activemenu = newValue;
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
            return (name) => {   return this.activemenu == name; }
        }
    },
    created: async function() 
    {
        axios
            .get('/php/mnt_items.php')
            .then(response => (this.utenze = response.data))
            .catch(error => console.log(error));

        axios
            .get('/php/mnt_sections.php')
            .then(response => (this.sections = response.data))
            .catch(error => console.log(error))
    }
});