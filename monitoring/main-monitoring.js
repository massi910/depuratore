





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
        utenze: []
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
    created: async function() {
        const response = await fetch('/status.json')
        const data = await response.json()
        this.utenze = data
    }
});