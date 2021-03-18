import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Total dish ordered",
                backgroundColor: ['aqua','lightgreen','red','orange','grey','purple'],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            scales:{
              yAxes:[{
                ticks:{min: 0}
              }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      
      database.collection("orders").get().then(querySnapShot => {
        var order = {}
        var first = true
        var singleOrder = {}
        querySnapShot.forEach(doc => {
          singleOrder = doc.data();
          if(first){
            order = singleOrder;
            first = false;
          } else {
            for(var dishName in singleOrder){
              order[dishName] += singleOrder[dishName];  
            }      
          }
        })
        this.datacollection.labels = Object.keys(order);
        this.datacollection.datasets[0].data = Object.values(order);
        
        this.renderChart(this.datacollection, this.options)
        
      })
    }
  },
  created () {
    this.fetchItems()
  }
}