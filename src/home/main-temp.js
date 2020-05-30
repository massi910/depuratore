import 'mdbootstrap/css/mdb.min.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import '../style/general.css'
import Vue from 'vue'
import sidebarpage from '../js/comp/cmp-sidebarpage'

var app = new Vue({
    components:
    {
        sidebarpage
    },
    el: '#app',
    data:
    {
        menus:
        [
            { name: "menu1" },
            { name: "menu2" },
            { name: "menu3" },
            { name: "menu4" },
            { name: "menu5" },
        ]
    }
})