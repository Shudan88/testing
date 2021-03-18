<template>
  <div class="chart">
    <Chart></Chart>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#chart {
  background-color: rgb(98, 142, 223);
  padding: 30px;
  text-align: center;
  font-size: 35px;
  color: white;
}
</style>