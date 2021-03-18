<template>
  <div>
    <p>Menu:</p>
    <ul>
        <li v-for="item in selectData" v-bind:key="item.name">  
            {{item[0]}} X {{item[1]}}
        </li>
    </ul>
    <button id = "calculate" v-on:click="findTotal(); sendOrder()" >Add Order</button>
    <p v-show = "payment">Subtotal: ${{sub_total}}</p>
    <p v-show = "payment">Grand Total: ${{updateFinal}}</p>
  </div>
</template>

<script>
import db from '../firebase.js'

export default {
    name: 'Basket',
    data(){
      return{
        payment:false,
        sub_total:0,
        grand_total:0
      }
    },
    props: {
        selectData: {type: Array}
    },
    methods:{
        findTotal: function () {
          for (let i = 0; i < this.selectData.length; i++) {
            const curr_item = this.selectData[i];
            this.sub_total += curr_item[1] * curr_item[2];
          }
          this.payment = true;
        },
        sendOrder: function() {
          var order = { //create java object with key value pairs
            "Prawn omelette": 0,
            "Dry Beef Hor Fun": 0,
            "Sambal KangKung":0,
            "Pork Fried Rice": 0,
            "Mapo Tofu": 0,
            "Cereal Prawn": 0,            
          }
          for (let i = 0; i < this.selectData.length; i++) { // or for(var item of this.selectData){order[item[0]] = item[1]}
            order[this.selectData[i][0]] = this.selectData[i][1] // replace the count value with updated one/lastest state of list
            
          }
          db.collection('orders').add(order).then(() => location.reload()) //RMB () => function call, automatically reloads page after add to db
          
        },
    },
    computed:{
      updateFinal: function(){
        return (this.sub_total * 1.07).toFixed(2);
        //return this.grand_total;
        
      }
    } 

}
</script>

<style>
#calculate {
  background-color: pink;
  font-size: 25px;
  border: 1px solid black;
  border-radius: 5px;
  height: 50px;
  width: 200px;

}
</style>
