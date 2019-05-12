<template>
  <div id="app">
    <slider>
      <sliderItem>slider1</sliderItem>
      <sliderItem>slider2</sliderItem>
      <sliderItem>slider3</sliderItem>
    </slider>
  </div>
</template>

<script>
import Slider from "./slider/slider.vue";
import SliderItem from "./slider/sliderItem.vue";
export default {
  name: "App",
  components: {
    Slider,
    SliderItem
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
