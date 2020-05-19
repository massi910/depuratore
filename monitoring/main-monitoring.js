





var app = new Vue({
    el: '#app',
    data: 
    {
        activeMenu: "Allarmi",
        menu: 
        [
            { name: "Utenze", description: "Utenze monitorabili" },
            { name: "Allarmi", description: "Controllo allarmi" },
            { name: "Grafici", description: "Grafici e statistiche" }
        ],
        utenze: [],
        sections: [],
        units: [],
        consumptions: []
    },
    methods:
    {
        setActiveMenu: function (name) 
        {
            this.activeMenu = name.replace("link-", "");
        },
        moveToWarnings: function() {
            this.activeMenu = this.menu[1].name
        }
    },
    computed:
    {
        isActive() 
        {
            return (id) => {   return this.activeMenu == id; }
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

        axios
            .get('/php/units.php')
            .then(response => this.units = response.data)
            .catch(error => console.log(error))

        axios.get('/php/consumptions.php')
            .then(response => this.consumptions = response.data)
            .catch(error => console.log(error))
    }
});