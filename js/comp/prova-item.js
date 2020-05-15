Vue.component('itemcard',
{
    props:
    {
        name: String,
    },
    template:
    `
    <div class="item-card border-left border-primary shadow p-2 my-4">
        <div class="container">
            <div class="row">
                <h2> {{ name }} </h2>
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
                    <input type="checkbox" class="custom-control-input" id="customSwitches">
                    <label class="custom-control-label" for="customSwitches">
                        Attivazione
                    </label>
                    </div>
            </div>
        </div>
    </div>
    `
})