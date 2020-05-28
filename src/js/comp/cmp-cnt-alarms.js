Vue.component('cntalarms',
{
    props:
    {
        utenze: Array
    },
    template:
    `
    <div class="card-deck p-3 align-items-center">
        <cardalarm 
            v-for="utenza in utenze"
            :key="utenza.id"
            v-bind:utenza="utenza"
        ></cardalarm>
    </div>
    `
})