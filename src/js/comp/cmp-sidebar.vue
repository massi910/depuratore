<template>
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

        <!-- content sections -->
        <div class="collapse navbar-collapse mr-auto pt-2 align-items-start" id="navbarNavAltMarkup">
            <div class="navbar-nav flex-column p-4">
                <cmpsidemenuitem
                    v-for="item in menus"
                    :key="item.name"
                    v-bind:item="item"
                    v-bind:isactive="activemenu == item.name"
                    v-on="$listeners">
                </cmpsidemenuitem>
            </div>
        </div>

        <div class="collapse navbar-collapse mr-auto pt-2 align-items-end" id="navbarNavAltMarkup">
            <div class="navbar-nav flex-column p-4">
            
            
            <a type="button" class="btn btn-default btn-sm" href="../../tables/vue-tables.html">
                tables
            </a>
            

            <!-- refresh button -->
            <button type="button" class="btn btn-default btn-sm"
                v-on:click="refresh"
                v-if="liveOn == null"
                >
                Refresh
            </button>

            <!-- live button -->
            <button type="button" class="btn btn-default btn-sm"
                v-on:click="liveSet"
                >
                {{ liveOn == null ? 'Auto-refresh' : 'Manual-refresh' }}
            </button>

            </div>
        </div>

    </nav>
</template>


<script>
import cmpsidemenuitem from "./cmp-sidemenuitem"

/**
 * (monitoring) sidebar component
 */
export default
{
    components:
    {
        cmpsidemenuitem
    },
    data: function () {
        return {
            liveOn: null
        }
    },
    props:
    {
        activemenu: String,
        menus: Object
    },
    methods:
    {
        refresh: function () {         
            this.$emit('refresh')
        },
        /**
         * Set the refresh data
         * interval to automatic or manual
         */
        liveSet: function () 
        {
            if (this.liveOn == null)
            {
                var temp = setInterval(this.refresh, 2000);
                this.liveOn = temp;
            }
            else
            {
                clearInterval(this.liveOn);
                this.liveOn = null;
            }
        }
    },
};
</script>