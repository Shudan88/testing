import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"grey",
                    borderColor:"grey",
                },
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"red",
                    borderColor:"red",
                },
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"blue",
                    borderColor:"blue",
                },
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"green",
                    borderColor:"green",
                },
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"purple",
                    borderColor:"purple",
                },
                { 
                    data: [],
                    label:"",
                    fill: false,
                    backgroundColor:"orange",
                    borderColor:"orange",
                },
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            var regionName = response.data.region_metadata
            for(var i = 0; i < regionName.length; i++){
                this.datacollection.datasets[i].label =regionName[i].name;
            }
            var data = response.data.items
            for(var element of data){
                this.datacollection.labels.push(element.timestamp)
                var psi_reading = element.readings.psi_twenty_four_hourly
                for(var k = 0; k < this.datacollection.datasets.length; k++){
                    var readings = Object.values(psi_reading)
                    this.datacollection.datasets[k].data.push(readings[k])
                }
            }

            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}