import Vue from 'vue'

Vue.component('cmpfirst',
{
    props:
    {
        msg: String
    },
    template:
    `
    <h2>
        sono il compfirst!
        {{ msg }}
    </h2>
    `
})