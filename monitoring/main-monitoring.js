





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
        sections: []
    },
    methods:
    {
        setActiveMenu: function (name) 
        {
            this.activeMenu = name.replace("link-", "");
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
    }
});