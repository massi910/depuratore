<template>
    <generalcard :carditem="{utenza: utenza, utenza_db: utenza_db}">
        
        <!-- title -->
        <template v-slot:title="props">
            <h2 class="pl-2"> {{ props.carditem.utenza.name }} </h2>
        </template>

        <!-- body -->
        <template v-slot:body="props">
            <div class="container p-0">
                <div class="p-1">
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-light" :class="{ active : !props.carditem.utenza.b_manual }" @click="props.carditem.utenza.b_manual = false">
                            <input type="radio" name="options" id="option1" autocomplete="off" :checked="!props.carditem.b_manual">Automatico
                        </label>
                        <label class="btn btn-light" :class="{ active : props.carditem.utenza.b_manual }" @click="props.carditem.utenza.b_manual = '1'">
                            <input type="radio" name="options" id="option2" autocomplete="off" :checked="props.carditem.utenza.b_manual">Manuale
                        </label>
                    </div>
                    <div class="float-right p-2">
                        <font-awesome-icon id="power" icon="power-off" 
                            :style="{ color : props.carditem.utenza_db.b_status ? 'green' : 'red' }" 
                            size="2x" />
                    </div>
                    
                    <div class=" container-fluid mt-3 pl-2">
                        <div v-if="props.carditem.utenza.b_manual" class="">
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" :id="props.carditem.utenza.id" :name="props.carditem.utenza.name" :checked="props.carditem.utenza.b_status" @click="updateStatus">
                                <label class="custom-control-label" :for="props.carditem.utenza.id">Attivazione</label>
                            </div>
                        </div>
                    </div>
                    <div v-if="props.carditem.utenza.b_alarm" class="mt-3">
                            <button class="btn btn-warning" @click="alarm">Allarme</button>
                    </div>
                </div>
            </div>
        </template>
    </generalcard>
</template>

<script>
import Vue from 'vue'
import generalcard from './cmp-general-card'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
library.add(faPowerOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
    components:
    {
        generalcard
    },
    props: 
    {
        utenza:
        {
            id: Number,
            name: String,
            description: String,
            b_status: Boolean,
            b_alarm: Boolean,
            b_manual: Boolean,
            section_id: Number
        },
        utenza_db:
        {
            id: Number,
            name: String,
            description: String,
            b_status: Boolean,
            b_alarm: Boolean,
            b_manual: Boolean,
            section_id: Number
        }
    },

    methods: {
        updateStatus: function() {
            this.utenza.b_status = !this.utenza.b_status
        },
        alarm: function() {
            this.$emit('alarm')
        }
    }
}
</script>