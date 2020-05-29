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
            activePhase: this.phases[0],
            scrollPosition: Object,
        }
    },
    props:
    {
        phases:
        {
            type: Array,
            default: []
        },
        // container menu
        menu: Object
    },
    watch:
    {
        // what phases and eventually update active phase
        phases: 
        {
            handler: function () {
                this.activePhase = this.getFirstActive();
            },
            deep: true,
            immediate: true
        },
        // watch current active phase and eventually scroll to it
        activePhase:
        {
            handler: function ()
            {
                setTimeout(() => {
                        var temp = this.buildPhaseId(this.activePhase.id);
                        this.scrollToItem(temp);
                    },
                    1000);
                    this.saveCurrentPosition();
                
            },
            deep: true,
            immediate: true
        },
        // watch the scroll position to change menu value
        scrollPosition:
        {
            handler: function (e) {
                this.menu.position = this.scrollPosition;
            }
        }
    },
    methods:
    {
        /**
         * save the current position
         */
        saveCurrentPosition: function () {
            setTimeout(() => {
                this.scrollPosition = window.pageYOffset;
                },
                2000);
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
                scrollTop: temp.offset().top-10
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
    }
}
</script>