<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
let count = 1;
export default {
  name: "sliderItem",
  data() {
    return {
      id: count++
    };
  },
  mouted() {
    // this.$parent
  }
};
</script>
