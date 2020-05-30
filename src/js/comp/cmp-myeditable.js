
Vue.use(VueTables.ClientTable);

Vue.component('myeditable',
{
    data: function() { return {
        columns: [],
        tableData: [],
        options:
        {
            options: {
                // see the options API
                editableColumns: []
            }
        }
    }},
    props:
    {
        table_name: String,
        loadPhpPath: String,
        sendPhpPath: String
    },
    methods:
    {
        /** send data */
        send: function () 
        {   
            axios
                .post("/php/vue-table.php", this.tableData)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        },
        /** load data function */
        load: function () {
            console.log("loading");
            
            axios
            .get('/php/mnt_items.php')
            .then(response => {                
                this.tableData = response.data
                this.columns = Object.keys(response.data[0])
                this.options.editableColumns = Object.keys(response.data[0])
            })
            .catch(error => console.log(error));
        }
    },
    watch:
    {
        tableData: 
        {
            handler: function (newVal, oldVal) 
            {               
                this.send();
            },
            deep: true
        }   
    },
    created: async function() 
    {
        this.load();
    },
    template:
    `
    <div class="container-fluid">
        <button class="btn btn-primary" v-on:click="load"> aggiorna </button>
        <hr>
        <v-client-table :columns="columns" :options="options" v-model="tableData">
            <!-- 
                for each slot set up these func:
                update text on submit + toggle editable state + revert to original value on cancel 
            -->
            <template v-for="col in columns" :slot="col" slot-scope="{row, update, setEditing, isEditing, revertValue}">
                <div :key="col">
                    <span @click="setEditing(true)" v-if="!isEditing">
                        {{row[col]}}
                    </span>
                    <span v-else>
                    <input type="text" v-model="row[col]">
                    <button type="button" @click="update(row[col]); setEditing(false)">Submit</button>
                    <button type="button" @click="revertValue(); setEditing(false)">Cancel</button>        
                    </span>
                </div>
            </template>
            

        </v-client-table>

    </div>
    `
})