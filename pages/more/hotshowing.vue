<template>
    <div id="appp">
        <h1>影院热映</h1>
        <section id="list" class="grid">
            <a href="javascript:void(0)" class="item" v-for="(moviedata,index) in moviedatas" :key="index">
                <div class="cover">
                    <div class="wp ratio3_4">
                        <img :src="moviedata.images.large" :alt="moviedata.alt" class="img-show" style="width:100%;">
                    </div>
                </div>
                <div class="infoo">
                    <h4></h4>
                    <h3>{{moviedata.title}} </h3>
                    <p class="rank">
                        <span class="rating-stars">

                        </span>
                        <span v-if="moviedata.rating.average > 0">{{moviedata.rating.average}}</span>
                        <span v-else style="color: #ccc;">暂无评分</span>
                    </p>
                    <p class="meta">
                            {{moviedata.pname}}
                    </p>
                    <cite></cite>
                </div>
            </a>
        </section>
    </div>
</template>

<script>
let state = {
    appHeaderState: {
        show: true,
        title: '影院热映',
        showMenu: false,
        showBack: true,
        showLogo: false,
        actions: [
            {
                icon: 'home',
                route: {
                    name: 'index'
                }
            }
        ]
    }
};
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
}
export default {
    data(){
        return{
            moviedatas:[]
        }
    },
    name: 'hotshowing',
    metaInfo: {
        title: 'Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ],
        bodyAttrs: {
            'empty-appshell': undefined
        }
    },
     async asyncData({store, route}) {
        setState(store);
        await new Promise((resolve, reject) => {
            setTimeout(resolve, 500);
        });
    },
    activated() {
        setState(this.$store);
    },
    created(){
            this.getmoive()
    },
    methods:{
        getmoive(){
            var genres = ''
            var casts = ''
            var directors = ''
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
                this.moviedatas = res.subjects.slice(0,15)
                for(var i = 0; i < this.moviedatas.length;i++){
                    genres = ''
                    casts = ''
                    directors = ''
                    if(this.moviedatas[i].genres){
                        for(var j = 0; j < this.moviedatas[i].genres.length;j++){
                            genres += this.moviedatas[i].genres[j] + ' '
                        }
                    }
                    if(this.moviedatas[i].casts){
                        for(var q = 0; q < this.moviedatas[i].casts.length;q++){
                            casts += this.moviedatas[i].casts[q].name + ' '
                        }
                    }
                    if(this.moviedatas[i].directors){
                        for(var f = 0; f < this.moviedatas[i].directors.length;f++){
                            directors += this.moviedatas[i].directors[f].name + ' '
                        }
                    }
                    this.moviedatas[i]['pname'] = "\ "+ genres +"\/ "+ directors + "\/ " + casts + "\ "
                }
                console.log(this.moviedatas)
            })
            .catch((error)=> {
                
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
#appp
    padding-left 2%
    padding-right 2%
    max-width 650px
    margin 0 auto 
    overflow-x hidden
#appp h1
    position absolute
    font-size 24px
    font-weight normal 
    box-sizing border-box
    max-width 660px
    margin-left auto 
    margin-right auto 
    margin-bottom 6px
    padding-left 4%
.grid
    max-width 660px
    padding 74px 0 0 0
    margin-left auto 
    margin-right auto 
    overflow hidden 
    box-sizing border-box
#list .item
    text-decoration none 
    color #9b9b9b
.grid .item
    float left 
    box-sizing border-box
    width 33.33333%
    padding-left 4%
    padding-right 4%
    margin-bottom 20px
    overflow hidden
    margin-right 0
.grid .item .cover 
    min-height 87px
    overflow hidden
    position relative
#list .item .img-show
    opacity 1
.grid .item h3 
    font-size 1em
    font-weight normal
    padding 5px 0 0
    color #494949
    text-align center
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 1
    -webkit-box-orient vertical

.grid .item img 
    display block 
    left -100%
    right -100%
    top -100%
    bottom -100%
    margin auto
    min-height 100%
    min-width 100%
.grid .item .infoo
    height 45px
    overflow hidden 
.grid .item .rank
    height 16px
    font-size 12px
    padding-top 3px
    text-align center
.grid .item h4, .grid .item cite, .grid .item .meta
    display none
#list .item cite
    font-style normal
.grid .ratio1_1, .grid .ratio3_4
    position relative
    height: 140px;
</style>

