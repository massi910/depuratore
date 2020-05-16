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
            <h1>{{ utenza.name }}</h1>
            Accesa: {{utenza.b_status}}
            <button v-if="utenza.b_status" class="btn btn-danger" v-on:click="updateStatus(utenza)">SPEGNI</button>
            <button v-else class="btn btn-success" v-on:click="updateStatus(utenza)">ACCENDI</button><br>
        </div>`,
    methods: {
        updateStatus: async function(utenza) {
            utenza.b_status = utenza.b_status ? false : true
            const data = await saveStatus()
        }
    }
})