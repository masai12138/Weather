<script>
import axios from 'axios'
export default {
    data : function(){
        return {
            city : null,
            cityweather : null,
            input: '',
        }
    },
    methods : {
        getcity : function(){
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
                let cityweatherArray = response.data.HeWeather6
                if(!cityweatherArray){
                    console.log('天气数据为空');
                    return;
                }
                that.cityweather = cityweatherArray[0]
            })
        },
        getIcon(){
            return require(`../assets/${this.cityweather.now.cond_code}.png`)
        }
    }
}
</script>

<template>
    <div class="q-main">
        <el-input  placeholder="请输入想查询城市名称" v-model="city" class="q-text" ></el-input>
        <el-button id="q-sub" class="el-icon-right" @click="getcity()"></el-button>
        <div v-if="cityweather" class="middle-main">
            <img :src="getIcon()" class="q-icon"/>
            <span class="q-tmp">{{cityweather.now.tmp + '°'}}</span>
            <span class="q-location">{{cityweather.basic.location + ',' + cityweather.basic.cnty}}</span>
        </div>
        <div class="big-main" v-if="cityweather">
            <ul class="q-ul" >
                <li>{{'体感温度 :' + cityweather.now.fl + '°'}}</li><li>{{'相对湿度 :' + cityweather.now.hum}}</li>
                <li>{{'降水量 :' + cityweather.now.pcpn}}</li><li>{{'能见度 :' + cityweather.now.vis}}</li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.q-text{
    width: 300px;
}
#q-sub{
    margin-left: 30px;
}
.middle-main{
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.q-icon{
    width: 50px;
    height: 50px;
    margin: 10px 0 0 0;
   
}
.q-tmp{
    margin: 10px 0 0 0;
    font-size: 40px;
}
.q-location{
    font-size: 18px;
    margin: 10px 0 0 0;
    
}
.q-ul li{
    width: 150px;
    list-style: none;
    float: left;
    margin-top: 20px;
}
</style>

