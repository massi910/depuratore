<template>
    <div id="cntphases" class="container">
        <generalcard
            v-for="phase in phases"
            :key="phase.name"
            :carditem="phase"
            :id="buildPhaseId(phase.id)"
            >
            <template v-slot:title="props">
                <div>
                    <h2> {{ props.carditem.name }} </h2>
                </div>
                
            </template>

            <template v-slot:body="props">
                {{ props.carditem.description }}
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
import $ from 'jquery'

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
        isActive: Boolean
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
        }
    },
    mounted()
    {
        // set the scroll position when all phases are rendered
        var instance = this;
        setTimeout(function(){
            instance.updateScrollPosition()
            }, 2000);
        
    }
}
</script>