<template>
  <div>
    <div v-show="false">
      <slot></slot>
    </div>
    <div class="slider" ref="slider">
      <div
        v-for="item in pages"
        :key="item.id"
        v-html="item.content"
        :class="{active: activeIndex==item.id, slide: true}"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slider {
  position: relative;
  width: 600px;
  height: 300px;
  overflow: hidden;
}

.slide {
  position: absolute;
  width: 600px;
  height: 300px;
  /* Add transition */
  transition: 0.6s ease;

  /* Move slides off to the left by default */
  transform: translate(-100%, 0);
}

/* Set active slide to be in the viewport */
.slide.active {
  transform: translate(0, 0);
}

/* Use sibling selector to position all slides after the active slide to the right */
.slide.active ~ .slide {
  transform: translate(100%, 0);
}
</style>

<script>
import { request } from "http";
export default {
  name: "slider",
  computed: {
    // a computed getter
    total: function() {
      // `this` points to the vm instance
      return this.pages.length;
    },
    notEmpty() {
      return this.pages.length > 0;
    }
  },
  data() {
    return {
      activeIndex: 1,
      pages: []
    };
  },
  methods: {
    next() {
      // 把第一个移动到最后
      let first = this.pages[0];
      this.pages.shift();
      this.pages.push(first);
      // 把下一个高亮
      this.activeIndex++;
      if (this.activeIndex > this.total) {
        this.activeIndex = 1;
      }
    },
    animate(fn, interval) {
      let req, start;
      let repeat = function(timestamp) {
        if (!start) start = timestamp;
        let process = timestamp - start;
        //  每2s执行动画
        if (process > interval) {
          fn();
          // 重置开始时间
          start = timestamp;
        }
        if (req) {
          req = window.requestAnimationFrame(repeat);
        }
      };
      req = window.requestAnimationFrame(repeat);
    }
  },
  mounted() {
    this.pages = this.$children.map((item, index) => {
      var tmp = document.createElement("div");
      tmp.appendChild(item.$el);
      return {
        content: tmp.innerHTML,
        id: index + 1
      };
    });
    let last = this.pages[this.pages.length - 1];

    this.pages.pop();
    this.pages.unshift(last);
    this.$forceUpdate();
    this.$data.pages = this.pages;
    this.animate(this.next, 2000);
  }
};
</script>
