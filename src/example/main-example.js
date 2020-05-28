import { functemp } from './example-module'
import './example.css'
import Vue from 'vue'
import cmpfirst from './cmpfirst.js'
import CmpSingleFile from './CmpSingleFile'
import axios from 'axios'

console.log(functemp("ciao"));


var app = new Vue({
    el: '#app',
    components: { CmpSingleFile },
    data:
    {
        msg: functemp("ciao!"),
        utenze: []
    },
    methods:
    {
        go: function () {
            axios
                .post('php/mnt_items.php')
                .then(response => this.utenze = response.data)
                .catch(error => console.log(error));
        },
        loadItems: function () 
        {            
            axios
                .get('php/mnt_items.php')
                .then(response => this.utenze = response.data)
                .catch(error => console.log(error));
        }
    },
    created: async function ()
    {
        this.loadItems()
    }
})
