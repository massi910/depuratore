Vue.component('utenze', {
    template: `
    <div>
        <div class="btn-group"><button v-for="sezione in sezioni" @click="setSezioneCorrente(sezione)" class="btn btn-primary">{{sezione}}</button></div>
        <utenza v-for="utenza in utenzeAttive" v-bind:utenza="utenza" v-bind:key="utenza.id"></utenza>
    </div>`,
    props: ['utenze'],
    data: function() {
        return {
            sezioneCorrente: '',
            sezioni: { pozzo: 'pozzo', ossigenazione: 'ossigenazione', lavaggio: 'lavaggio', pescante: 'pescante' }
        }
    },
    computed: {
        utenzeAttive: function() {
            var alias = this
            return this.utenze.filter(function(utenza) { return utenza.sezione == alias.sezioneCorrente }) }
    },
    methods: {
        setSezioneCorrente: function(sezione) {
            this.sezioneCorrente = sezione
        }
    },
    created: function() {
        this.sezioneCorrente = this.sezioni.pozzo
    }
})