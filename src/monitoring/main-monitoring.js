import 'mdbootstrap/css/mdb.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/general.css'
import sidebar from '../js/comp/cmp-sidebar'
import cntalarms from '../js/comp/cmp-cnt-alarms'
import menusection from '../js/comp/cmp-menusection'
import utenze from '../js/comp/utenze'
import cntphases from '../js/comp/cmp-cnt-phases'
import cnttabs from '../js/comp/cmp-tabs'
import consumptions from '../js/comp/consumptions'
import consumptionsItems from '../js/comp/consumptions-items'
import waterCons from '../js/comp/water-cons'
import waterLevel from '../js/comp/water-level'
import axios from 'axios'
import Vue from 'vue'
import $ from 'jquery'




var app = new Vue({
    el: '#app',
    components:
    {
        sidebar,
        cntalarms,
        menusection,
        utenze,
        cntphases,
        cnttabs,
        consumptions,
        consumptionsItems,
        waterCons,
        waterLevel
    },
    data: 
    {
        interval: Object,
        activeMenu: "Allarmi",
        menus:
        {
            'Utenze': { name: "Utenze", description: "Utenze monitorabili", counter: 0, position: 0 },
            'Allarmi': { name: "Allarmi", description: "Controllo allarmi", counter: 0, position: 0  },
            'Fasi': { name: "Fasi", description: "Fasi di depurazione", counter: 0, position: 0 },
            'Grafici': { name: "Grafici", description: "Grafici dei consumi", counter: 0, position: 0 }
        },
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
        /** handler for activation menu change */
        setActiveMenu: function (name) 
        {
            this.activeMenu = name; // set active menu
            this.setScrollPosition(name);   // set scrolling position
        },
        /**
         * Set the scroll position according to
         * the given menu
         * @param {String} menu 
         */
        setScrollPosition: function (menu) {
            $('html, body').animate({
                scrollTop: this.menus[menu].position
            }, 700);
        },
        moveToWarnings: function() {            
            this.activeMenu = this.menus.Allarmi.name;
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
    mounted()
    {
        /** get saved active menu */
        if (localStorage.activeMenu)
            this.activeMenu = localStorage.activeMenu;
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
        // whenever activeAlarmCounter changes, this function will run
        activeAlarmCounter: function () 
        {
            this.menus.Allarmi.counter = this.activeAlarmCounter;
        },
        /** store last active menu to the client machine */
        activeMenu(newValue)
        {
            localStorage.activeMenu = newValue;
        }
    },
    computed:
    {
        isActive: function ()
        {
            return (name) => {   return this.activeMenu == name; }
        },
        /** active alarms counter */
        activeAlarmCounter: function ()
        {
            var count = 0;
            this.utenze.forEach(utenza => {
                if (utenza.b_alarm == true)
                    count++;
            });
            return count;
        },
    },
    created: async function() 
    {
        this.loadItems();
        this.loadSections();
        this.loadPhases();
        
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
});