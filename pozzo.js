async function saveStatus() {
    const response = await fetch("/pozzo.php", {
        method: 'POST',
        body: JSON.stringify(app.utenze)
    })
    const data = response.json()
    return data
}

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

Vue.component('utenza', {
    props: ['utenza'],
    template: `
        <div class="card col">
            <h1>{{ utenza.nome }}</h1>
            Accesa: {{utenza.on}}
            <button v-if="utenza.on" class="btn btn-danger" v-on:click="updateStatus(utenza)">SPEGNI</button>
            <button v-else class="btn btn-success" v-on:click="updateStatus(utenza)">ACCENDI</button><br>
        </div>`,
    methods: {
        updateStatus: async function(utenza) {
            utenza.on = utenza.on ? false : true
            const data = await saveStatus()
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        utenze: []
    },
    created: async function() {
        const response = await fetch('/status.json')
        const data = await response.json()
        this.utenze = data
    }
})
