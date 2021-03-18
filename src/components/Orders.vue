<template>

  <div>
    <div>
        <nav>
            <ul>
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
        </nav>
    </div>

    <div>
        <ul>
            <li v-for= "(order, id) in orders" v-bind:key= "id">  
                <div v-for = "(count, name) in order[1]" v-bind:key = "name"> 
                    {{name}}: {{count}} 
                </div> 
                
                <button v-bind:id="order[0]" v-on:click="deleteItem($event)">Delete</button> 
                <button v-bind:id="order[0]" v-on:click="route($event)">Modify</button>
                    
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import db from "../firebase.js"


export default {
  name: 'Orders',
  data(){
    return{
      orders:[]
    }
  },
  methods:{
    fetchItems:function(){
        db.collection('orders').get().then(snapshot => {
            let order = {}
            snapshot.docs.forEach(doc => {
                order = doc.data();
                this.orders.push([doc.id, order])
            });
        });
    },
    deleteItem:function(event){
        let doc_id = event.target.getAttribute("id");
        db.collection('orders').doc(doc_id).delete().then(() => location.reload());
    },
    route:function(event){
        let doc_id = event.target.getAttribute("id");
        this.$router.push({name: 'modify', params: {id: doc_id}});
    }
  },
  created(){this.fetchItems()},
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 100px;
  height: 50px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  font-size: 20px;
  margin: 10px;
}

</style>
