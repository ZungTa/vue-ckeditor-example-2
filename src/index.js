console.log('index.js')
import Vue from 'vue';
import App from './App.vue';
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import CKEditor from 'ckeditor4-vue';

// console.log('CKEDITR', CKEditor);
// Vue.use(CKEditor);

const app = new Vue({
    el: '#app',
    render: h => h(App),
});