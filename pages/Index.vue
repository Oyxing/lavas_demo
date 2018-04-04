<template>
        <div id="card">  
            <section>
                <header>
                    <h2>影院热映</h2>
                    <a href="javascript:void(0);"  @click="handleClick('/more/hotshowing')">更多</a>
                </header>
                <div class="section-content">
                    <ul class="row items">
                        <li class="item item_movie" v-for="(moviedata,index) in moviedatas" :key="index">
                            <a href="#">
                                <div class="item-poster" v-bind:style="{backgroundImage:'url('+moviedata.images.large+')'}"></div>
                                <span class="item-title">{{moviedata.title}}</span>
                                <div class="item-rating">
                                    <div class="rank">
                                        <span class="rating-stars"></span>
                                        <span v-if="moviedata.rating.average > 0">{{moviedata.rating.average}}</span>
                                        <span v-else style="color: #ccc;">暂无评分</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
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
                color:'#2384E8',
                text: '电影',
                route: '/pagetable/movie'
            },
            {
                color:'#9F7860',
                text: '图书',
                route: '/pagetable/books'
            },
            {   
                color:'#E4A813',
                text: '广播',
                route: '/pagetable/broadcast'
            },
            {
                color:'#2AB8CC',
                text: '小组',
                route: '/pagetable/squad'
            },
            {
                color:'',
                icon: 'search',
                route: '/search'
            },
        ]
    });
}
var newdata = {}
export default {
    data(){
        return{
            moviedatas:[],
            dataa:[
                {status: "Y", explanation: ""},
                {status: "Y", explanation: ""},
                {status: "Y", explanation: ""},
                {status: "Y", explanation: ""},
                {status: "Y", explanation: ""}
                ]
        }
    },
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
        handleClick(route) {
            // 如果传递了路由对象，进入路由
            this.$router.push(route);
        },
        getmoive(){
            // newdata = [] fetch
            // for(var i = 0; i < this.dataa.length;i++){
            //     console.log(this.dataa[i].status)
            //     console.log(this.dataa[i].explanation)
            //     newdata.push({"\"status\"":this.dataa[i].status,"\"explanation\"":this.dataa[i].explanation})
            // }
            // console.log('newdata')
            // console.log(newdata)
            this.$jsonp('https://api.douban.com/v2/movie/in_theaters')
            .then((res)=> {
                console.log(res)
                this.moviedatas = res.subjects.slice(0,8)
                console.log(res.subjects.slice(0,8))
            })
            .catch((error)=> {
                
            });
        }
    }
};
</script>

<style lang="stylus" scoped>

section:first-child
    padding-top 10px
section
    text-align initial
    margin 0
    overflow hidden
    background-color #fff
section h2 
    display inline-block
    min-width 4em
    margin-bottom 0
    font-size 1.06rem
    color #111
    padding-left 10px
    padding-bottom 0   

section header a
    float right 
    color #42bd56
    font-size 0.9rem
    line-height 1.5rem

section .section-content
    margin-bottom -1.12rem
.row 
    border-bottom 1px solid #f2f2f2

.items
    font-size 0
    white-space nowrap
    overflow-x auto
.item:first-child
    margin-left 1.12rem
.item:last-child
    margin-right 1.12rem
.item
    margin-left 0.48rem
.item a 
    color #111
.item 
    display inline-block
    vertical-align top
    width 100px
    text-align center
.item >* 
    font-size 0.94rem
    white-space normal
.item-poster
    width 100%
    overflow hidden
    background-size cover
    background-position center
.item-title
    display block
    line-height 0.94rem
.item_movie .item-title
    margin-top: 10px;
    max-width 100%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    word-wrap normal

</style>
