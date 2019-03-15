<template>
    <div id="singleBlog">
        <h1>博客详情</h1>
        <div class="single-blog">
            <h3>{{blog.title}}</h3>
            <p>{{blog.body}}</p>
        </div>
    </div>
</template>


<script>
    export default {
        name:"single-blog",
        data(){
            return{
                blog:{},
                // id: this.$route.param.id,
                id:this.$route.params.id
            }
        },
        created(){
            console.log(this.id);
            this.$http.get("http://jsonplaceholder.typicode.com/posts/"+this.id)
            .then(res=>{
                // console.log(res);
                this.blog = res.body;
            })
        }
        
    }
</script>

<style lang="less" scoped>
    #singleBlog{
        max-width: 600px;
        margin: 20px auto;
        .single-blog{
            padding: 20px;
            margin:20px 0;
            box-sizing: border-box;
            background-color: #ccc;
        }
        
    }
</style>


