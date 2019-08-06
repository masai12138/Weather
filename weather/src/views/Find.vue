<script>
import axios from 'axios'
export default {
    data : function(){
        return {
            city : null,
            cityWeather : null,
            input: '',
        }
    },
    methods : {
        getCityWeather : function(){
            let that = this
            axios.get('https://free-api.heweather.net/s6/weather/now?&key=96e8453513a5487c923a71d839a180ca&',{
                params:{
                    location : that.city
                }
            })
            .then(function(response){
                console.log(response)
                if(response.status !== 200){
                    console.log(response.statusText)
                    return;
                }
                let cityWeatherArray = response.data.HeWeather6
                if(!cityWeatherArray){
                    console.log('天气数据为空');
                    return;
                }
                that.cityWeather = cityWeatherArray[0]
            })
        },
        getIcon(){
            return require(`../assets/${this.cityWeather.now.cond_code}.png`)
        }
    }
}
</script>

<template>
    <div class="search-main">
        <el-input  placeholder="请输入想查询城市名称" v-model="city" class="search-text" ></el-input>
        <el-button id="search-sub" class="el-icon-right" @click="getCityWeather()"></el-button>
        <div v-if="cityWeather" class="middle-main">
            <img :src="getIcon()" class="search-icon"/>
            <span class="search-tmp">{{cityWeather.now.tmp + '°'}}</span>
            <span class="search-location">{{cityWeather.basic.location + ',' + cityWeather.basic.cnty}}</span>
        </div>
        <div class="big-main" v-if="cityWeather">
            <ul class="search-ul" >
                <li>{{'体感温度 :' + cityWeather.now.fl + '°'}}</li><li>{{'相对湿度 :' + cityWeather.now.hum}}</li>
                <li>{{'降水量 :' + cityWeather.now.pcpn}}</li><li>{{'能见度 :' + cityWeather.now.vis}}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.search-text{
    width: 300px;
}
#search-sub{
    margin-left: 30px;
}
.middle-main{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search-icon{
    width: 50px;
    height: 50px;
    margin: 10px 0 0 0;
   
}
.search-tmp{
    margin: 10px 0 0 0;
    font-size: 40px;
}
.search-location{
    font-size: 18px;
    margin: 10px 0 0 0;
    
}
.search-ul li{
    width: 150px;
    list-style: none;
    float: left;
    margin-top: 20px;
}
</style>

