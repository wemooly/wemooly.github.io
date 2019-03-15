<template>
    <div id="showBlogs" v-theme:columu="'narrow'">
        <h1>博客总览 </h1>
        <input type="text" v-model="search" placeholder="搜索">
        <div class="singleBlog" v-for="(blog,index) in searchBlog" :key="index">
            <router-link :to="'/singleblog/'+blog.id">
                <h3 v-rianbow>{{blog.title | toUpperCase}}</h3>
            </router-link>
             <article>{{blog.body | lessText}}</article>
        </div>
    </div>
</template>

<script>
    export default {
        name:"showBlogs",
        data(){
            return{
                search:"",
                blogs:[],
            }
        },
        // 生命周期钩子函数
        created(){
            this.$http.get("http://jsonplaceholder.typicode.com/posts")
            .then(data=>{
                this.blogs = data.body.slice(0,10);
            })
        },
        // 自定义指令
        directives:{
            "theme":{
                bind(el,binding,vnode){
                    if(binding.value == "narrow"){
                        el.style.maxWidth = "560px";
                    }else if(binding.value == "wide"){
                        el.style.maxWidth ="1200px";
                    }
                    if(binding.agr == "columu"){
                        el.style.padding = "20px";
                        el.style.backgroundColor ="#c67"
                    }
                }
            },
            "rianbow":{
                bind(el,binding,vnode){
                   el.style.color = "#"+Math.random().toString(16).slice(2,8);
                }
            }

        },
        filters:{
            toUpperCase(value){
                return value.toUpperCase();
            },
            lessText(value){
                return value.slice(0,100)+"...";
            }
        },
        computed:{
            searchBlog(){
                // 外面返回的是一个符合条件的数组
                return this.blogs.filter(blog=>{
                    // 开面的返回值是一个boolean值
                    return blog.title.match(this.search);
                })
            }
        }

    }
</script>

<style lang="less" scoped>
    #showBlogs{
        max-width: 800px;
        margin:0  auto;
        input{
            padding:8px;
            box-sizing:border-box;
            width: 100%;
        }
        .singleBlog{
            padding:20px;
            margin:20px 0;
            background: #ccc;
            a{
                text-decoration: none;
            }
        }
    }
</style>

