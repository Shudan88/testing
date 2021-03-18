<template>
  <div class="chart">
    <h1>Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
h1 {
  background-color: rgb(98, 142, 223);
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
}
</style>