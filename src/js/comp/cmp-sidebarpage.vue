<template>
<div class="row">
    <div class="col-lg-2 p-0">
        <nav id="sidebar" 
            class="navbar navbar-expand-lg navbar-dark bg-dark flex-column sticky-top p-0">
            
            <!-- navbar header -->
            <div class="container-fluid bg-secondary p-3">
                <a class="navbar-brand mx-auto" href="../../home/home.html">Depuratore MD1</a>
            </div>
            
            <!-- collapse for smaller screens -->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- menu sections -->
            <div class="collapse navbar-collapse mr-auto pt-2 align-items-start" id="navbarNavAltMarkup">
                <div class="navbar-nav flex-column p-4">
                    <div class="nav-item nav-link mb-3"
                        v-for="menu in menus"
                        :key="menu.name"
                        >
                        <a> {{ menu.name }} </a>
                        <slot :name="menu.id1"></slot>
                    </div>
                </div>
            </div>

            <!-- buttom section -->
            <div class="collapse navbar-collapse mr-auto pt-2 align-items-end" id="navbarNavAltMarkup">
                <div class="navbar-nav flex-column p-4">
                    <a type="button" class="btn btn-default btn-sm" href="../../tables/vue-tables.html">
                        tables
                    </a>
                </div>
            </div>

        </nav>  
    </div>

    <div class="col-lg-10">
        <div class="container"
            v-for="menu in menus"
            :key="menu.name"
            >
            <div v-if="menu.name == active">
                <h2> {{ menu.name }} </h2>
                <slot></slot>
            </div>
        </div>
    </div>

</div>
</template>


<script>

/**
 * (monitoring) sidebar component
 */
export default
{
    components:
    {
        
    },
    data: function () {
        return {
            active: "menu1"
        }
    },
    props:
    {
        menus: Array
    },
    methods:
    {
        
    },
};
</script>