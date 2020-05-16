async function saveStatus() {
    const response = await fetch("/pozzo.php", {
        method: 'POST',
        body: JSON.stringify(app.utenze)
    })
    const data = response.json()
    return data
}

{/* <div class="card col">
<h1>{{ utenza.name }}</h1>
Accesa: {{utenza.b_status}}
<button v-if="utenza.b_status" class="btn btn-danger" v-on:click="updateStatus(utenza)">SPEGNI</button>
<button v-else class="btn btn-success" v-on:click="updateStatus(utenza)">ACCENDI</button><br>
<button v-if="utenza.b_alarm" v-on:click="alarm" class="btn btn-primary">ALLARME</button>
</div> */}

Vue.component('utenza', {
    props: ['utenza'],
    template: `
    <div class="item-card border-left border-primary shadow p-2 my-4">
        <div class="container">
            <div class="row">
                <h2> {{ utenza.name }} </h2>
            </div>
            <div class="row py-2">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-secondary active">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked>
                        Automatico
                    </label>
                    <label class="btn btn-secondary">
                        <input type="radio" name="options" id="option2" autocomplete="off">
                        Manuale
                    </label>
                </div>
            </div>
            <div class="row py-2">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="utenza.id" :name="utenza.name" :checked="utenza.b_status == 1">
                    <label class="custom-control-label" :for="utenza.id">Attivazione</label>
                </div>
            </div>
            <div v-if="utenza.b_alarm == 1">
                <button class="btn btn-warning" @click="alarm">Allarme</button>
            </div>
        </div>
    </div>`,
    methods: {
        updateStatus: async function(utenza) {
            utenza.b_status = utenza.b_status ? false : true
            const data = await saveStatus()
        },
        alarm: function() {
            this.$emit('alarm')
        }
    }
})

