<template>
  <div>
    <header><h1>Jcheez's Zi Char</h1></header>
    <router-view></router-view>
  </div>
</template>

<script>



export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  components: {
    //'PageCon':PageContent
  }
}
</script>

<style>
header {
  background-color: rgb(98, 142, 223);
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
}
</style>
