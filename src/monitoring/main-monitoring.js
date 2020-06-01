import 'mdbootstrap/css/mdb.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/general.css'
import sidebarpage from '../js/comp/cmp-sidebarpage'
import cntalarms from '../js/comp/cmp-cnt-alarms'
import utenze from '../js/comp/utenze'
import cntphases from '../js/comp/cmp-cnt-phases'
import cnttabs from '../js/comp/cmp-tabs'
import consumptions from '../js/comp/consumptions'
import consumptionsItems from '../js/comp/consumptions-items'
import waterCons from '../js/comp/water-cons'
import waterLevel from '../js/comp/water-level'
import widgetActiveItems from '../js/comp/cmp-widget-active-items'
import widgetCons from '../js/comp/cmp-widget-cons'
import widgetWater from '../js/comp/cmp-widget-water'
import axios from 'axios'
import Vue from 'vue'
import $ from 'jquery'



var app = new Vue({
    components:
    {
        sidebarpage,
        cntalarms,
        utenze,
        cntphases,
        cnttabs,
        consumptions,
        consumptionsItems,
        waterCons,
        waterLevel,
        widgetActiveItems,
        widgetCons,
        widgetWater
    },
    el: '#app',
    data:
    {
        menu:
        [
            { name: "Utenze" },
            { name: "Allarmi" },
            { name: "Fasi" },
            { name: "Grafici" },
        ],
        regions: [ 
            {id: 'reg1', name: 'Consumo elettrico'},
            {id: 'reg2', name: 'Consumo elettrico / utenza'},
            {id: 'reg3', name: 'Consumo acqua'},
            {id: 'reg4', name: 'Livello acqua'}
        ],
        utenze: [],
        sections: [],
        units: [],
        consumptions: [],
        phases: [],
        water_cons: [],
        water_level: [],
    },
    watch:
    {
        utenze:
        {
            handler: function () {
                this.sendItems();
            },
            deep: true
        },
    },
    methods:
    {
        ////////////////////////////////////////
        ////////// data up/download ////////////
        ////////////////////////////////////////
        // Write item to db
        sendItems: function ()
        {
            axios
                .post("/php/update-mnt_items.php", this.utenze)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
        // Load items from db
        loadItems: function () 
        {
            axios
                .get('/php/mnt_items.php')
                .then(response => (this.utenze = response.data))
                .catch(error => console.log(error));
        },
        // load items section from db
        loadSections: function () 
        {
            axios
                .get('/php/mnt_sections.php')
                .then(response => (this.sections = response.data))
                .catch(error => console.log(error))
        },
        // load depuration phases from db
        loadPhases: function ()
        {
            axios
                .get('/php/load-phases.php')
                .then(response => (this.phases = response.data))
                .catch(error => console.log(error))
        },
        /**
         * Reload data from db
         */
        reloadData: function () 
        {
            this.loadItems();
            this.loadSections();
            this.loadPhases();
        },
    },
    created: async function() 
    {
        this.reloadData();
        
        axios
            .get('/php/units.php')
            .then(response => this.units = response.data)
            .catch(error => console.log(error))

        axios.get('/php/consumptions.php')
            .then(response => this.consumptions = response.data)
            .catch(error => console.log(error))

        axios.get('/php/water_cons.php')
            .then(response => this.water_cons = response.data)
            .catch(error => console.log(error))

        axios.get('/php/water_level.php')
            .then(response => this.water_level = response.data)
            .catch(error => console.log(error))
    }
})