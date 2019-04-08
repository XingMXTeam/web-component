<template>
  <div class="ux-pager">
    <ul>
      <li @click="prev">上一页</li>
      <li @click="go(1)" :class="{'active': index==1}">1</li>
      <li v-if="hasLeftSep">...</li>
      <li v-for="n in midNums" v-bind:key="n" @click="go(n)" :class="{'active': index==n}">{{n}}</li>
      <li v-if="hasRightSep">...</li>
      <li @click="go(total)" :class="{'active': index==total}">{{total}}</li>
      <li @click="next">下一页</li>
    </ul>
  </div>
</template>
<script>
const PAGE_START = 1;
export default {
  props: {
    index: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    },
    // 中间页码数量
    count: {
      type: Number,
      default: 5
    }
  },
  computed: {
    midNums() {
      if (this.from < this.to && this.from > 0) {
        let arr = [];
        for (let i = this.from; i <= this.to; i++) {
          arr.push(i);
        }
        return arr;
      }
      return [];
    },
    from() {
      let left = Math.floor(this.count / 2);
      let newFrom = Math.min(this.index - left, this.total - this.count);
      return Math.max(PAGE_START + 1, newFrom);
    },
    to() {
      return Math.min(this.total - 1, this.from + this.count - 1);
    },
    hasNext() {
      return this.index < this.total;
    },
    hasPrev() {
      return this.index > PAGE_START;
    },
    hasLeftSep() {
      return this.from > 0 && this.from > PAGE_START + 1;
    },
    hasRightSep() {
      return this.to > 0 && this.to < this.total - 1;
    }
  },
  methods: {
    go(index) {
      if (!index || index < PAGE_START || index > this.total) return;
      this.index = index;
    },
    prev() {
      if (this.index <= 1) return;
      this.go(this.index - 1);
    },
    next() {
      if (this.index >= this.total) return;
      this.go(this.index + 1);
    }
  }
};
</script>
<style scoped lang="scss">
ul > li {
  float: left;
  text-decoration: none;
  list-style: none;
  padding: 20px;
  color: #fff;
  background: gray;
  cursor: pointer;
}
.active {
  color: red;
  background: yellow;
}
</style>


