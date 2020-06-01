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
        utenze_app: [],
        utenze_db: [],
        sections: [],
        units: [],
        consumptions: [],
        phases: [],
        water_cons: [],
        water_level: [],
        extUpdate: false
    },
    methods:
    {
        ////////////////////////////////////////
        ////////// data up/download ////////////
        ////////////////////////////////////////
        // Write item to db
        sendItems: async function ()
        {
            axios
                .post("/php/update-mnt_items.php", this.utenze_app)
                .then(() => this.loadItems())
                .catch(error => console.log(error));
        },
        /**
         * Load utenze in utenze_db
         */
        loadItems: async function ()
        {   
            axios
                .get('/php/mnt_items.php')
                .then(response => 
                    {
                        this.utenze_db = response.data
                        if (this.utenze_app.length == 0)
                            this.utenze_app = JSON.parse(JSON.stringify(this.utenze_db))

                        // check if the utenze just loaded are equal to the utenze in the app
                        let equal = this.utenzeEquals(this.utenze_db, this.utenze_app);
                        if (!equal)
                            this.utenze_app = JSON.parse(JSON.stringify(this.utenze_db));
                    })
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
        loadData: function () 
        {            
            this.loadItems();
            this.loadSections();
            this.loadPhases();
        },
        /**
         * Return true if the given
         * arrays are equals.
         * 
         * @param {Array} ut_db utenze_db
         * @param {Array} ut_app utenze_app
         */
        utenzeEquals: function (ut_db, ut_app) 
        {
            for (let i = 0; i < ut_db.length; i++)
            {
                let el_db = ut_db[i]
                let el_app = ut_app[i]
                let props_db = Object.keys(el_db)
                let props_app = Object.keys(el_app)
                for (let iProp = 0; iProp < props_db.length; iProp++)
                {   
                    if (el_db[props_db[iProp]] != el_app[props_app[iProp]])
                        return false;
                }
            }
            return true;
        }
    },
    created: async function() 
    {
        this.loadData()
        
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