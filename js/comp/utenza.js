async function saveStatus() {
    const response = await fetch("/pozzo.php", {
        method: 'POST',
        body: JSON.stringify(app.utenze)
    })
    const data = response.json()
    return data
}


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