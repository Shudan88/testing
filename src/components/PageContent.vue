<template>
  <div>
    <div>
        <nav>
            <ul id="itemsList">
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/orders" exact>Orders</router-link></li>
                <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
            </ul>
        </nav>
    </div>
    <div>
      <ul id="itemsList">
        <li v-for="item in items" v-bind:key="item.name">
    
          <h2 id="itemName">{{item.name}}</h2>
          <img v-bind:src="item.imageURL" />  
          <h3 id="price">${{item.price}}</h3>
          <QuanCount v-bind:item = "item" v-on:counter="onCounter"></QuanCount>
        </li>
      </ul>
      <Basket id = "shoppingBasket" v-bind:selectData = "itemsSelected"></Basket>
    </div>
  </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'  
import Basket from './Basket.vue'  
import db from '../firebase.js'

export default {
  name: 'PageContent',
  data(){
    return{
      itemsSelected:[],
      items:[]
    }
  },
  methods:{
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        for (let i = 0; i < this.itemsSelected.length; i++) { 
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          if(item_name == item.name && count > 0){ // remove current and add in updated element.
            //this.itemsSelected.splice(i,1); // delete one item from i.
            this.itemsSelected.splice(i,1,[item.name, count, item.price]); // delete 0 item.
            break;
          } else if(item_name == item.name && count == 0){ //remove current.
            this.itemsSelected.splice(i,1);
            break;
          } else if(item_name != item.name && i == this.itemsSelected.length - 1){
            this.itemsSelected.push([item.name, count, item.price]); //append new element.
          }
        }
      }
    },
    fetchItems:function(){
      db.collection('menu').get().then(snapshot => {
        let item = {}
        snapshot.docs.forEach(doc => {
          item = doc.data();
          item.show = false
          this.items.push(item)
        });
      });
    }
  },
  created(){this.fetchItems()},
  components: {
    'QuanCount':QuantityCounter,  
    'Basket':Basket 
  }

}

</script>

<style scoped>


#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}

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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>