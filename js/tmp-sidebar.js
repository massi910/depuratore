/**
 * (monitoring) sidebar component
 */
Vue.component('sidebar',
{
    props: ['sections'],
    methods:
    {
        activation: function (e) {           
            this.$emit('activation', e.target.id)
          }
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

        <!-- content sections -->
        <div class="collapse navbar-collapse mr-auto pt-2 align-items-start" id="navbarNavAltMarkup">
            <div class="navbar-nav flex-column">
                <div v-for="section in sections" :key="section.name" class="nav-item nav-link">
                    <a href="#"
                    v-on:click="activation"
                    :id="'link-'.concat(section.name)"
                    :class="section.activeClass" class="nav-link"> {{ section.name }} </a>
                </div>
            </div>
        </div>
    </nav>
    `
});
