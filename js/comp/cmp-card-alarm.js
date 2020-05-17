/**
 * Alarm card component
 */
Vue.component('cardalarm',
{
    data: function()
    { return {
        
    }},
    props:
    {
        utenza:
        {
            id: String,
            name: String,
            description: String,
            b_status: String,
            b_alarm: String,
            b_manual: String,
            section_id: String
        }
    },
    methods:
    {
        deActiveAlarm: function(event)
        {
            this.utenza.b_alarm = false;
        }
    },
    template:
    `
    <div class="card mb-3 card-alarm mx-auto animated" 
        v-bind:class="{ 'border-secondary' : !utenza.b_alarm,
        'bounce' : utenza.b_alarm, 'infinite' : utenza.b_alarm }"
        style="max-width: 32rem;">
        <div>
            <div class="card-header"> {{ utenza.name }} </div>
            <!-- to support the mask effect -->
            <div class="view">
                <div class="card-body"
                    :style="utenza.b_alarm ? { opacity : 0.2 } : { opacity : 1 }"
                    >
                    <h5 class="card-title"> {{ utenza.name }} </h5>
                    <p class="card-text"> {{ utenza.description }} </p>
                </div>
                <!-- active alarm mask -->
                <a class="mask flex-center rgba-red-strong p-0"
                    v-if="utenza.b_alarm"
                    v-on:click="deActiveAlarm">
                    <h4 class="black-text">
                        Disattiva allarme
                    </h4>
                </a>
            </div>
        </div>
    </div>
    `
})