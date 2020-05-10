/**
 * (monitoring) sidebar template
 */
Vue.component('sidebar',
{
    data: function() 
    {
        return{
            currentPath: window.location.pathname,
            menus: 
            [
                { name: "Pozzo", link: "/monitoring/pozzo.html", activeClass: ""},
                { name: "Ossigenazione", link: "/monitoring/ossigenazione.html", activeClass: ""},
                { name: "Lavaggio", link: "/monitoring/lavaggio.html", activeClass: ""},
                { name: "Pescante", link: "/monitoring/pescante.html", activeClass: ""},
                { name: "Allarmi", link: "/monitoring/allarmi.html", activeClass: ""},
                { name: "Grafici", link: "/monitoring/grafici.html", activeClass: ""}                
            ]
        };
    },
    methods:
    {
        /** menu active function */
        evalActive()
        {
            this.menus.forEach(menu => {
                if (menu.link == this.currentPath)
                    menu.activeClass = "active";
            });
        }
    },
    created()
    {
        this.evalActive();
    },
    template:
    `
    <nav id="sidebar" 
    class="navbar navbar-expand-lg navbar-dark bg-dark flex-column sticky-top">
        
        <a class="navbar-brand" href="#/home.html">Depuratore MD1</a>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- content menu -->
        <div class="collapse navbar-collapse mr-auto pt-2 align-items-start" id="navbarNavAltMarkup">
            <div class="navbar-nav flex-column">
                <div v-for="menu in menus" :key="menu.name" class="nav-item nav-link">
                    <a v-bind:href="menu.link" :class="menu.activeClass" class="nav-link"> {{ menu.name }} </a>
                </div>
            </div>
        </div>
    </nav>
    `
});
