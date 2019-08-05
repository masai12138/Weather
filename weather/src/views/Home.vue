<script>
import axios from 'axios'
import { constants } from 'crypto';
export default {
  data: function(){
    return {
      weather: null,
      weatherrailer: null,
      forecasttoday:null,
      forecasttomorrow: null,
      forecastafter: null
    }
  },
  methods:{
    getCondImage: function(){
      // return require('../assets/' + this.weather.now.cond_code + '.png')
      return require(`../assets/${this.weather.now.cond_code}.png`)
    },
    q :function(){
      this.$router.push('/find')
    }
  },
  created: function(){
    console.log("create")

    let that = this
    axios.get('https://free-api.heweather.net/s6/weather/now?location=hangzhou&key=96e8453513a5487c923a71d839a180ca')
    .then(function(response){
      console.log("请求结果",response)
      if(response.status !== 200){
        console.log(response.statusText)
        return;
      }
      let weatherArray = response.data.HeWeather6
      if(!weatherArray || weatherArray.length <= 0){
        console.log('天气数据为空');
        return;
      }
      that.weather = weatherArray[0]
    })
    .catch(function(e){
      console.log("请求失败", e)
    })
    
    axios.get('https://free-api.heweather.net/s6/weather/forecast?location=hangzhou&key=96e8453513a5487c923a71d839a180ca')
    .then(function(response1){
      console.log("预告请求结果",response1)
       if(response1.status !== 200){
        console.log(response1.statusText)
        return;
      }
      let weatherrailerArray = response1.data.HeWeather6
      that.weatherrailer = weatherrailerArray[0]
      let forecastArray = that.weatherrailer.daily_forecast
      that.forecasttoday = forecastArray[0]
      that.forecasttomorrow = forecastArray[1]
      that.forecastafter = forecastArray[2]
      console.log(that.forecasttoday)
      console.log(that.forecasttomorrow)
      console.log(that.forecastafter)
      
    })
    .catch(function(e1){
      console.log("请求失败", e1)
    })
  }
}

</script>

<template>
  <div id="app">
    <div class="q-d">
      <img class="q" src="../assets/q.png" v-on:click="q()"/>
    </div>
    <div class="top" v-if="weather">
      <img class="top-condition-icon" :src="getCondImage()" alt=""/>
      <div><span class="top-temperature">{{weather.now.tmp + '°'}}</span></div>
      <span class="top-location">{{weather.basic.location + ',' + weather.basic.cnty}}</span>
    </div>
    <div class="middle" >
      <div class="today" >
        <span class="date">{{forecasttoday.date}}</span>
        <img class="middle-icon" alt="" :src="require(`../assets/${forecasttoday.cond_code_d}.png`)"/>
        <span class="temperature">{{forecasttoday.tmp_min + '°' +'~'+forecasttoday.tmp_max + '°'}}</span>
      </div>
      <div class="tomorrow">
        <span class="date">{{forecasttomorrow.date}}</span>
        <img class="middle-icon" alt="" :src="require(`../assets/${forecasttomorrow.cond_code_d}.png`)"/>
        <span class="temperature">{{forecasttomorrow.tmp_min + '°' +'~'+forecasttomorrow.tmp_max + '°'}}</span>
      </div>
      <div class="after-tomorrow">
        <span class="date">{{forecastafter.date}}</span>
        <img class="middle-icon" alt="" :src="require(`../assets/${forecastafter.cond_code_d}.png`)"/>
        <span class="temperature">{{forecastafter.tmp_min + '°' +'~'+forecastafter.tmp_max + '°'}}</span>
      </div>
    </div>
    <div class="end">
      <span class="end-title"><b>详细内容</b></span>
      <ul class="q-ul" >
          <li>{{'体感温度 :' + weather.now.fl + '°'}}</li><li>{{'相对湿度 :' + weather.now.hum}}</li>
          <li>{{'降水量 :' + weather.now.pcpn}}</li><li>{{'能见度 :' + weather.now.vis}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.body{
  margin: 0;
  padding: 0;
}
#app{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.q-d{
  width: 100%;
}
.top{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    
}
.q{
  margin-top: 10px;
  float: right;
}
.top-condition-icon{
  width: 50px;
  height: 50px;
  margin: 50px 0 0 0;
}
.top-temperature{
  font-size: 40px;
  line-height: 1;
  text-align: center;
  width: auto;
  margin: 15px 0 0 0;
  float: left;
}
.top-location{
  line-height: 1;
  font-size: 15px;
  margin-top: 10px;
  color: #999;
}
.middle{
  width: 90%;
  height: 230px;
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 0;
}
.middle div{
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin: 10px 5px 5px 0;
}
.today{
  width: 33.33%;
  background: #1ABC9C;
  
}
.after-tomorrow{
  width: 33.33%;
  background: #3498DB;
}
.tomorrow{
  width: 33.33%;
  background: #9B59B6;
}
.date{
  font-size: 15px;
  margin: 15px;
  color: aliceblue;
}
.temperature{
  margin: 20px;
  font-size: 15px;
  color: aliceblue;
}
.middle-icon{
  margin: 20px;
  width: 50px;
  height: 50px;
  
}
.end{
  margin: 20px;
  width: 100%;
}
.end-title{
  margin-left: 25px;
  font-size: 20px;
}
.q-ul li{
    width: 170px;
    list-style: none;
    float: left;
    margin-bottom: 40px;
    margin-top: 10px;
}


</style>



