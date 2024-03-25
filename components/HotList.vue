<script lang="ts" setup>
import { fetchWeiBoHotList } from '@/axios/hotlist'
const getWeiBoHotList = () => {
  fetchWeiBoHotList().then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div w-full h-screen flex-center>
    <button @click="getWeiBoHotList">Get WeiBo HotList</button>
  </div>
</template>
