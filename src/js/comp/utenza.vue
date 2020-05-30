<template>
    <div class="item-card border-left border-primary shadow p-2 my-4">
        <div class="container">
            <div class="row">
                <h2> {{ utenza.name }} </h2>
            </div>
            <div class="row py-2">
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <label class="btn btn-light" :class="{ active : !utenza.b_manual }" @click="utenza.b_manual = false">
                        <input type="radio" name="options" id="option1" autocomplete="off" :checked="!utenza.b_manual">Automatico
                    </label>
                    <label class="btn btn-light" :class="{ active : utenza.b_manual }" @click="utenza.b_manual = '1'">
                        <input type="radio" name="options" id="option2" autocomplete="off" :checked="utenza.b_manual">Manuale
                    </label>
                </div>
            </div>
            <div v-if="utenza.b_manual" class="row py-2">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" :id="utenza.id" :name="utenza.name" :checked="utenza.b_status" @click="updateStatus">
                    <label class="custom-control-label" :for="utenza.id">Attivazione</label>
                </div>
            </div>
            <div v-if="utenza.b_alarm" class="row py-2">
                <button class="btn btn-warning" @click="alarm">Allarme</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        utenza:
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