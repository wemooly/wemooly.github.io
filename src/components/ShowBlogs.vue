<template>
    <div v-theme:columu="'narrow'" id="showBlogs">
        <h1>博客总浏</h1>
        <input type="text" v-model="search" placeholder="搜索">
        <div class="single-blog" v-for="(blog,index) in chooseBlog" :key="index">
            <router-link :to="'/singleblog/'+ blog.id ">
                 <h3 v-rainbow>{{blog.title | toUpperCase}}</h3>
            </router-link>
            <p>{{blog.body | lessContent}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"showBlogs",
    data(){
        return{
            blogs:[],
            search:"",
        }
    },
    created(){
        // 相对于app.vue来说的
        this.$http.get("../static/FeHelper-20190311172706.json")
        .then(data=>{
            this.blogs = data.body.slice(0,10);
        })
    },
    computed:{
        chooseBlog:function(){
            //es6 自带的过滤器功能 返回一个数组
            return this.blogs.filter(blog=>{
                // 这只是帅选条件return为boolean值  返回结果为 true 就返回当前被匹配的元素 为false 就不匹配返回
                return blog.title.match(this.search);
            })
        }
    },
    // 局部的过滤器
    filters:{
        toUpperCase(value){
            return value.toUpperCase();
        },
        lessContent:function(value){
            return value.slice(0,100)+"..."
        }
    },
    //局部自定义指令 
    directives:{
        "rainbow":{
            bind(el,binding,vnode){
                el.style.color ="#"+ Math.random().toString(16).slice(2,8);
            }
        },
        "theme":{
            bind(el,binding,vnode){
                if(binding.value == "wide"){
                    el.style.maxWidth = '1200px'
                }else if(binding.value == "narrow"){
                    el.style.maxWidth = "560px"
                }

                if(binding.arg == "columu"){
                    el.style.backgroundColor = "#67c";
                    el.style.padding = "20px"
                }
            }
        }
    }

}
</script>

<style lang="less" scoped>
    #showBlogs{
        max-width: 600px;
        margin: 20px auto;
        .single-blog{
            padding: 20px;
            margin:20px 0;
            box-sizing: border-box;
            background-color: #ccc;
            a{
                text-decoration: none;
            }
        }
        input{
            padding:8px;
            width: 100%;
            box-sizing:border-box;
        }
    }
</style>


