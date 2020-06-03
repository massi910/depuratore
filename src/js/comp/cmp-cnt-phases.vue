<template>
    <div id="cntphases" class="container">
        <generalcard
            v-for="phase in phases"
            :key="phase.name"
            :carditem="phase"
            :id="buildPhaseId(phase.id)"
            >
            <template v-slot:title="props">
                <div class="container">
                    <div>
                        <h2 class=""> 
                            {{ props.carditem.name }}
                        </h2>
                    </div>
                </div>
            </template>

            <template v-slot:body="props">
                <div class="container">
                    {{ props.carditem.description }}
                    <div class="mt-2">
                        <a class="btn btn-default btn-sm ml-0" data-toggle="collapse" 
                        :href="'#collapseExample'+buildPhaseId(phase.id)"
                            role="button" aria-expanded="false" :aria-controls="'collapseExample'+buildPhaseId(phase.id)">
                            Utenze coinvolte
                        </a>
                    </div>
                </div>
                
                <div class="collapse" :id="'collapseExample'+buildPhaseId(phase.id)">
                    <div class="container mt-2">
                        <div class="border p-2">
                            <ul class="pl-3 pt-0 pb-0">
                                <li
                                    v-for="item in getInvolvedItems(props.carditem.id)"
                                    :key="item.id">
                                    {{ item.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>

            <template v-slot:mask="props">
                <div class="mask flex-center rgba-green-light p-0"
                v-if="props.carditem.active">
                </div>
            </template>
        </generalcard>
    </div>
</template>


<script>
import generalcard from './cmp-general-card'
import Vue from 'vue'
import $ from 'jquery'
import 'mdbootstrap/css/mdb.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleDown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/**
 * Container for depuration phases
 */
export default {
    components:
    {
        generalcard
    },
    data: function () 
    {
        return{
            activePhase: null,
        }
    },
    props:
    {
        phases:
        {
            type: Array,
            default: []
        },
        // container item menu
        item: Object,
        // if true, this component is currently showing
        isActive: Boolean,
        utenze_db: Array
    },
    watch:
    {
        phases:
        {
            // update the active phase
            handler: function () {
                this.activePhase = this.getFirstActive();
            },
            deep: true,
            immediate: true
        },
        activePhase:
        {
            // update the scroll position
            handler: function () {
                this.updateScrollPosition();
            }
        },
        isActive:
        {
            // update the scroll position
            // when this component is displayed
            handler: function () {
                if (this.isActive)
                    this.updateScrollPosition();
            }
        }
    },
    methods:
    {
        /**
         * Set the menu item scroll position.
         * The first active phase will be on top
         */
        updateScrollPosition: function () {
            if (this.activePhase == null)
                return;
            var temp = this.buildPhaseId(this.activePhase.id);
            this.item.scrollPosition = this.getElPosition(temp);
        },
        getElPosition: function(id)
        {
            var temp = $('#' +id);
            if (!temp.length)
                return 0;
            else
                return temp.offset().top-24
        },
        /**
         * Scroll to given id element
         * (-10 y offset)
         * @param {String} id 
         */
        scrollToItem: function (id)
        {  
            var temp = $('#' +id);
            if (!temp.length)
                return;
            $('html, body').animate({
                scrollTop: temp.offset().top-24
            }, 500);
        },
        /**
         * Build id structure for a phase component
         * @param {String} id 
         */
        buildPhaseId: function (id)
        {
            return "phase" + id + "id";
        },
        /**
         * Return the first active phase,
         * otherwise return the first phase in the array
         */
        getFirstActive()
        {
            for (const i in this.phases)
                if (this.phases[i].active) 
                    return this.phases[i];
            
            return this.phases[0];
        },
        getInvolvedItems(phaseId)
        {
            return this.utenze_db.filter((item) =>
            {
                return item.phase == phaseId;
            })
        }
    },
    mounted()
    {
        // set the scroll position when all phases are rendered
        var instance = this;
        setTimeout(function(){
            instance.updateScrollPosition()
            }, 2000);
        
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
    }
}
</script>

<style scoped>
    .mask {
        pointer-events:none;
    }
</style>