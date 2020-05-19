/**
 * (monitoring) sidebar component
 */
Vue.component('sidebar',
{
    props:
    {
        activemenu: String,
        menus: Array
    },
    template:
    `
    <nav id="sidebar" 
        class="navbar navbar-expand-lg navbar-dark bg-dark flex-column sticky-top p-0">
        
        <!-- navbar header -->
        <div class="container-fluid bg-secondary p-3">
            <a class="navbar-brand mx-auto" href="/home.html">Depuratore MD1</a>
        </div>
        
        <!-- collapse for smaller screens -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- content sections -->
        <div class="collapse navbar-collapse mr-auto pt-2 align-items-start" id="navbarNavAltMarkup">
            <div class="navbar-nav flex-column p-4">
                <sidemenuitem
                    v-for="item in menus"
                    :key="item.name"
                    v-bind:item="item"
                    v-bind:isactive="activemenu == item.name"
                    v-on="$listeners">
                </sidemenuitem>
            </div>
        </div>
    </nav>
    `
});
