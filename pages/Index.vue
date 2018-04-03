<template>
    <div>
        <div class="content">
            <div>
                <h2>LAVAS</h2>
                <h4>[ˈlɑ:vəz]</h4>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        show: true,
        title: '豆瓣',
        showMenu: true,
        showBack: false,
        showLogo: false,
        actions: [
            {
                text: '电影',
                icon: 'movie',
                route: '/pagetable/movie'
            },
            {
                text: '图书',
                icon: 'books',
                route: '/pagetable/books'
            },
            {
                text: '广播',
                icon: 'message',
                route: '/pagetable/broadcast'
            },
            {
                text: '小组',
                icon: 'group',
                route: '/pagetable/squad'
            },
            {
                icon: 'search',
                route: '/search'
            },
        ]
    });
}

export default {
    name: 'index',
    metaInfo: {
        title: '豆瓣',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    },
    created(){
        this.getmoive()
    },
    methods:{
        getmoive(){
            this.$jsonp('https://api.douban.com/v2/movie/in_theaters')
            .then((res)=> {
                console.log('response')
                console.log(res.subjects)
                console.log(res.title)
            })
            .catch((error)=> {
                console.log('response')
                console.log(error)
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.content
    display flex
    align-items center
    justify-content center
    height 100%
    flex-wrap wrap
    h2
        font-size 46px
        font-weight 500
</style>
