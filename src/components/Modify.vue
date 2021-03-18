<template>
  <div>
    <ul>
        <li id = "name" v-for="(val,key,id) in datapacket" v-bind:key="id">  
            {{key}}: {{val}} <br><br>
            <input v-bind:id = id placeholder = 0 type = "number"  min="0"><br><br>
        </li>
        <button v-on:click="updateOrder" id = "update">Update Order</button>
    </ul>
  </div>
</template>

<script>
import db from "../firebase.js"

export default {
  props: ["id"],
  data(){
    return{
      datapacket:{}
    }
  },
  methods:{
    fetchItems:function(){
      db.collection('orders').get().then(snapshot => {
        let order = {}
        snapshot.forEach(doc => {
            if(doc.id == this.id){
                order = doc.data();
                this.datapacket = order;
            }
        });
      });
    },
    updateOrder: function(){
        var copy = this.datapacket;
        for(var i = 0; i < 6; i++){
            copy[Object.keys(this.datapacket)[i]] = document.getElementById(i).value;
        }
        db.collection('orders').doc(this.id).update(copy).then(
            () => this.$router.push({path: '/orders'})
        )
    }
  },
  created(){this.fetchItems()},  

}
</script>

<style scoped>
#name {
    list-style-type: none;

}
#update {
  background-color: pink;
  font-size: 25px;
  border: 1px solid black;
  border-radius: 5px;
  height: 50px;
  width: 200px;
}

</style>
