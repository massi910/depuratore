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
    <div class="item-card border-left border-primary shadow p-2 my-4">
        <div class="container">
            <div class="row">
                <h2> {{ utenza.name }} </h2>
            </div>
            <div class="row py-2">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light active" @click="utenza.b_manual = '0'">
                        <input type="radio" name="options" id="option1" autocomplete="off" checked>Automatico
                    </label>
                    <label class="btn btn-light" @click="utenza.b_manual = '1'">
                        <input type="radio" name="options" id="option2" autocomplete="off">Manuale
                    </label>
                </div>
            </div>
            <div v-if="utenza.b_manual == '1'" class="row py-2">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="utenza.id" :name="utenza.name" :checked="utenza.b_status == 1" @click="updateStatus">
                    <label class="custom-control-label" :for="utenza.id">Attivazione</label>
                </div>
            </div>
            <div v-if="utenza.b_alarm == 1" class="row py-2">
                <button class="btn btn-warning" @click="alarm">Allarme</button>
            </div>
        </div>
    </div>`,
    methods: {
        updateStatus: function() {
            this.utenza.b_status = this.utenza.b_status == '1' ? '0' : '1'
        },
        alarm: function() {
            this.$emit('alarm')
        }
    }
})

