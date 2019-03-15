<template>
    <div id="add-blog">
        <h1>添加博客</h1>
        <form v-show="!submited">
            <label for="">博客标题</label>
            <input type="text" v-model.trim="blog.title">
            <label for="">博客内容</label>
            <textarea v-model.trim="blog.content"></textarea>
            <div class="checkboxs">
                <label for="">vue.js</label>
                <input type="checkbox" value="vue.js" v-model="blog.categorys">
                <label for="">React.js</label>
                <input type="checkbox" value="React.js" v-model="blog.categorys">
                <label for="">Node.js</label>
                <input type="checkbox" name="" value="Node.js" v-model="blog.categorys">
                <label for="">Agular4</label>
                <input type="checkbox" name="" value="Agular4" v-model="blog.categorys">
            </div>
            <label for="">作者</label>
            <select v-model="blog.author">
                <option v-for="(author,index) in authors" :key="index">
                    {{author}}
                </option>
            </select>
            <button @click.prevent="postInfo">添加博客</button>
        </form> 

        <div v-show="submited">
            添加博客成功了
        </div>

        <hr>
        <div class="preview">
            <h2>博客总览</h2>
             <p>博客标题:{{blog.title}}</p>
             <p>博客内容:</p>
             <p>{{blog.content}}</p>
             <p>博客分类</p>
             <ul>
                 <li v-for="(category,index) in blog.categorys" :key="index">
                     {{category}}
                 </li>
             </ul>
             <p>博客作者 {{blog.author}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"add-blog",
    data(){
        return{
            blog:{
                title:"",
                content:"",
                categorys:[],
                author:""
            },
            authors:["hamisa","horeey","beibo"],
            submited:false,
        }
    },
   
    methods:{
        postInfo(){
            if(!this.blog.title.length || !this.blog.content){
                return;
            }
            this.$http.post("http://jsonplaceholder.typicode.com/posts",{
                userId:1,
                title:this.blog.title,
                body:this.blog.content
            })
            .then((data)=>{
                console.log(data);
                this.submited = true;
            });
        }
    }
}
</script>

<style lang="less" scoped>
    #add-blog{
        max-width: 800px;
        margin:20px auto;
        .checkboxs{
            label{
                display: inline-block;
                margin: 0;
            }
        }
        label{
            display: block;
            margin:20px 0 10px 0 ;
        };
        input[type="text"],textarea,select{
            width: 100%;
        }
        textarea{
            height: 200px;
        }
        button{
            padding: 15px;
            box-sizing: border-box;
            background-color: pink;
            color: #fff;
            border: none;
            outline: none;
            margin: 15px 0;
        }
    }
   
</style>


