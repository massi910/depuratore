<template>
    <div>
        <div class="btn-group btn-toolbar btn-group-toggle pt-3 sticky-top">
            <button class="btn btn-default" :class="{ active : sezioneCorrente ==  undefined }" @click="sezioneCorrente = undefined">TUTTE</button>
            <button 
                v-for="sezione in sezioni"
                :key="sezione.id" 
                @click="setSezioneCorrente(sezione.id)"
                class="btn btn-default"
                :class="{ active : sezioneCorrente ==  sezione.id }">
                {{sezione.name}}
            </button>
        </div>
        <utenza v-on="$listeners" 
            v-for="(utenza, index) in utenzeAttive" 
            v-bind:utenza="utenza"
            v-bind:utenza_db="utenze_dbAttive[index]"
            v-bind:key="utenza.id"></utenza>
    </div>
</template>


<script>
import utenza from './utenza'

export default {
    components:
    {
        utenza
    },
    props: 
    {
        utenze: Array,
        utenze_db: Array,
        sezioni: Array,
    },
    data: function() {
        return {
            sezioneCorrente: undefined
        }
    },
    computed: {
        utenzeAttive: function() {
            var alias = this;
            if (this.utenze == null)
                console.log("null");
                
            return this.utenze.filter(function(utenza) 
            {                 
                if (alias.sezioneCorrente == undefined) // show all when starting
                    return true;
                    
                return utenza.section_id == alias.sezioneCorrente 
            })},
        utenze_dbAttive: function() {
            var alias = this;
            return this.utenze_db.filter(function(utenza) 
            {                 
                if (alias.sezioneCorrente == undefined) // show all when starting
                    return true;
                    
                return utenza.section_id == alias.sezioneCorrente 
            })}
    },
    methods: 
    {
        setSezioneCorrente: function(sezione) {            
            this.sezioneCorrente = sezione
        }
    },
    mounted()
    {

    }
}
</script>