<template>
<div class="container-fluid">
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
                        v-for="item in menu"
                        :key="item.name"
                        v-on:click="setActiveItem(item)"
                        :class="item.name == activeItem.name ? 'active' : '' "
                        >
                        <a> 
                            {{ item.name }}
                            <slot 
                                :name="getNavItemId(item)"
                                v-bind:item="item"
                            ></slot>
                        </a>
                        
                    </div>
                </div>
            </div>

            <!-- buttom section
            <div class="collapse navbar-collapse mr-auto pt-2 align-items-start bg-info">
                <div class="navbar-nav flex-column p-4">
                        <h4></h4>
                        <h4>info2</h4>
                </div>
            </div>
             -->

            <!-- controllers -->
            <div class="container-fluid p-0">
                <div class="collapse navbar-collapse bg-secondary" id="navbarNavAltMarkup">
                    <a v-on:click="autoRefresh" class="ml-2">
                        <font-awesome-icon id="autoRefresh" icon="sync" />
                    </a>
                    <a v-on:click="refresh" class="ml-2">
                        <font-awesome-icon id="refresh" icon="redo" />
                    </a>            
                </div>
            </div>
        </nav>  
    </div>

    <div class="col-lg-10">
        <div class="container-fluid"
            v-for="item in menu"
            :key="item.name">
            <div v-show="activeItem == item">
                <!-- bind the setActiveItem method in order for other item to change it -->
                <slot :name="getCntItemId(item)" 
                    v-bind:setActiveItemForName="setActiveItemForName"
                    v-bind:item="item"
                    v-bind:isActive="activeItem == item"
                ></slot>
            </div>
        </div>
    </div>
    
</div>
</div>
</template>


<script>
import Vue from 'vue'
import $ from 'jquery'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
library.add(faSync)
library.add(faRedo)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/**
 * (monitoring) sidebar component
 * 
 * Each item in menu should have at last:
 * - name
 * 
 * For each item in menu will be available:
 * - slot for navigation item with name {nav-item_name}
 * - slot for content item with name {con-item_name}
 * - scrollPosition prop
 */
export default
{
    components:
    {
        
    },
    data: function () {
        return {
            refreshInterval: null,
            activeItem: Object,
        }
    },
    props:
    {
        menu: Array,
    },
    watch:
    {
        /** store last active menu to the client machine */
        activeItem: 
        {
            handler: function()
            {                                   
                localStorage.activeItem = this.activeItem.name;
                this.setScrollPosition(this.activeItem);
            },
            deep: true
        },
    },
    methods:
    {
        setActiveItem(item)
        {
            this.activeItem = item;
        },
        setActiveItemForName(itemName)
        {
            this.activeItem = this.getItemFromName(itemName);
        },
        // return the navigation item id on menu side bar
        getNavItemId(item)
        {
            return "nav" + item.name.toLowerCase();
        },
        // return the section item id linked to the navigation item
        getCntItemId(item) {
            return "cnt" +item.name.toLowerCase();
        },
        /**
         * Set the scroll position according to
         * the given menu
         * @param {String} menu 
         */
        setScrollPosition(item) {
            $('html, body').animate({
                scrollTop: item.scrollPosition
            }, 500);
        },
        addPropToMenu(prop, propVal)
        {
            this.menu.forEach(item => {
                Vue.set(item, prop, propVal)
            });
        },
        getItemFromName(toLook)
        {
            for (const i in this.menu) 
            {                
                if (this.menu[i].name == toLook)
                    return this.menu[i];
            }
        },
        /** emit the refresh event */
        emitRefresh: function () {         
            this.$emit('refresh')
        },
        /** single refresh animation */
        refreshAnim: function()
        {
            $('#refresh').addClass("fa-pulse")
            setTimeout(() => {
                $('#refresh').removeClass("fa-pulse")
            },
            1000);
        },
        /** auto refresh animation */
        autoRefreshAnim: function(val)
        {
            if (val)
                $('#autoRefresh').addClass("fa-spin");
            else
                $('#autoRefresh').removeClass("fa-spin");
        },
        /**
         * single refresh handle
         */
        refresh: function () {
            this.refreshAnim()
            this.emitRefresh()
        },
        /**
         * handle the auto refresh state setting an interval
         * to emit of 2 sec for emitting the refresh event
         */
        autoRefresh: function () 
        {    
            if (this.refreshInterval == null)
            {
                this.refreshInterval = setInterval(this.emitRefresh, 2000);
                this.autoRefreshAnim(true);
            }
            else
            {
                clearInterval(this.refreshInterval)
                this.refreshInterval = null;
                this.autoRefreshAnim(false);
            }
        }
    },
    mounted()
    {
        /** get starting active item in menu */
        if (localStorage.activeItem)
            this.activeItem = this.getItemFromName(localStorage.activeItem);
        else
            this.activeItem = this.menu[0]
        
        // add starting scroll position for all item in menu
        this.addPropToMenu("scrollPosition", 0)
    }
};
</script>