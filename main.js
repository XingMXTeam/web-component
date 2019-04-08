import Vue from 'vue'
import Pager from './pager/pager.vue'

new Vue({
  el: '#app',
  template: '<Pager :index=1 :total=10 />',
  components: { Pager }
})
