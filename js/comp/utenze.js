Vue.component('utenze', {
    template: `
    <div>
        <div class="btn-group mt-3">
            <button 
                v-for="sezione in sezioni"
                :key="sezione.id" 
                @click="setSezioneCorrente(sezione.id)" 
                class="btn btn-primary">{{sezione.name}}
            </button>
        </div>
        <utenza v-on:alarm="raise" v-for="utenza in utenzeAttive" v-bind:utenza="utenza" v-bind:key="utenza.id"></utenza>
    </div>`,
    props: 
    {
        utenze: Array,
        sezioni: Array
    },
    data: function() {
        return {
            sezioneCorrente: undefined
        }
    },
    computed: {
        utenzeAttive: function() {
            var alias = this;
            return this.utenze.filter(function(utenza) 
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
        },
        raise: function() {
            this.$emit('raise')
        }
    },
})