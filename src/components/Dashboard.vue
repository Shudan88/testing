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
    <h1>Bar Chart</h1>
    <BarChart></BarChart>
    <LineChart></LineChart>
  </div>
</template>

<script>
import BarChart from './charts/BarChart'  
import LineChart from "./CallAPI.vue";


export default {
  name: 'Dashboard',
  data(){
    return{
      
    }
  },
  components: {
    'BarChart':BarChart,  
    'LineChart': LineChart
  }
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

h1 {
  background-color: rgb(98, 142, 223);
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
}
</style>
