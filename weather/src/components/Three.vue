<script>
export default {
    name : 'Three',
    data: function () {
        return {
        }
    },
    methods :{
        getAir : function(){
        this.$alert('天气预报啊', '标题名称', {
            confirmButtonText: '确定'
        });
        }
    }
}
</script>


<template>
    <div class="nev">
        <ul class="nev-ul">
            <li v-on:click="getAir()">天气预报</li>
            <li v-on:click="getAir()">天气预报</li>
            <li v-on:click="getAir()">天气预报</li>
            <li v-on:click="getAir()">天气预报</li>
        </ul>
    </div>
</template>

<style scoped>
.nev-ul li{
    list-style: none;
    margin: 20px;
    margin-left: -20px;
}
.nev-ul li:hover{
    color: brown;
    cursor: pointer;
}

</style>

