
Vue.use(VueTables.ClientTable);

new Vue({
    el: "#app",
    data: {
        selectedTable: [],
        tables: [
            // available tables
            { name: "mnt_items", loadPath: "/php/mnt_items.php", sendPath: "/php/update-mnt_items.php" },
            { name: "mnt_sections", loadPath: "/php/mnt_sections.php", sendPath: "/php/update-mnt_sections.php" },
            { name: "bdg_items", loadPath: "/php/items.php", sendPath: "/php/update-bdg_items.php" },
            { name: "bdg_sections", loadPath: "/php/sections.php", sendPath: "/php/update-bdg_sections.php" },
            { name: "phases", loadPath: "/php/load-phases.php", sendPath: "/php/update-phases.php" },
            { name: "consumptions", loadPath: "/php/consumptions.php", sendPath: "/php/update-consumptions.php" }
        ],
        columns: [],
        tableData: [],
        options: {
            // see the options API
            editableColumns: []
        }
    },
    methods:
    {
        setTable: function (table) 
        {
            this.selectedTable = table;
        },
        /** send data */
        send: function () 
        {   
            axios
                .post(this.selectedTable.sendPath, this.tableData)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
        /** load data function */
        load: function () {
            console.log("loading");
            
            axios
            .get(this.selectedTable.loadPath)
            .then(response => {                
                this.tableData = response.data
                this.columns = Object.keys(response.data[0])
                this.options.editableColumns = Object.keys(response.data[0])
            })
            .catch(error => console.log(error));
        },

        updateSingleTuple: function(tuple) {
            axios
                .post(this.selectedTable.sendPath, [tuple])
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }
    },
    watch:
    {
        selectedTable:
        {
            handler: function () {
                this.load();
            },
            deep: true
        },
/*      tableData: 
        {
            handler: function (newVal, oldVal)
            {               
                this.send();
            },
            deep: true
        }    */
    },
});