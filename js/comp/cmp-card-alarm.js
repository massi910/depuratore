Vue.component('cardalarm',
{
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
    watch:
    {
        utenza:
        {
            immediate: true,
            deep: true,
            handler: function(newVal, oldVal)
            {
                if (newVal.b_alarm != "0")
                {
                    // change card style
                    // send signal to app for alarm menu highlight
                }
            }
        } 
    },
    methods:
    {

    },
    template:
    `
    <div class="card border-secondary mb-3 card-alarm mx-auto" style="max-width: 32rem;">
        <div class="card-header"> {{ utenza.name }} </div>
        <div class="card-body">
            <h5 class="card-title"> {{ utenza.name }} </h5>
            <p class="card-text"> {{ utenza.description }} </p>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" :id="utenza.id.concat('-customSwitches')">
                <label class="custom-control-label" :for="utenza.id.concat('-customSwitches')">
                    Disattiva
                </label>
            </div>
        </div>
    </div>
    `
})