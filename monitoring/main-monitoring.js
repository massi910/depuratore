





var app = new Vue({
    el: '#app',
    data: 
    {
        activeMenu: "Utenze",
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

            /*
        const response = await fetch('/status.json')
        const data = await response.json()
        this.utenze = data
        */
    }
});