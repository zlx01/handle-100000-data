<template>
  <div id="container" @scroll="handleScroll" ref="container">
    <div class="img-box" v-for="item in showList" :key="item.tid">
      <img class="dummy-image" :src="item.src" alt="" />
      <span>{{ item.alt }}</span>
    </div>
    <div ref="blank"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const container = ref<HTMLElement>();
const blank = ref<HTMLElement>();

interface ImgInfo {
  src: string;
  alt: string;
  tid: number;
}

const getList = async () => {
  const res = await fetch("http://127.0.0.1:8000");
  return await res.json();
};
const list = ref<Array<ImgInfo>>([]);
const page = ref(1);
const limit = 20;
const total = computed(() => Math.ceil(list.value.length / limit));
const showList = computed(() => list.value.slice(0, page.value * limit));

const handleScroll = () => {
  if (page.value > total.value) return;
  const offsetHeight = container.value?.offsetHeight as number;
  const clientHeight = container.value?.clientHeight as number;
  const scrollTop = container.value?.scrollTop as number;
  const blankTop = blank.value?.getBoundingClientRect().top as number;
  if (Math.abs(clientHeight - blankTop) < 20) {
    page.value++;
  }
};

onMounted(() => {
  getList().then((res) => {
    list.value = res;
  });
});
</script>

<style>
#container {
  height: 100vh;
  overflow: auto;
}

.img-box {
  display: flex;
  padding: 10px;
}

.dummy-image {
  width: 150px;
  height: 150px;
}
</style>
