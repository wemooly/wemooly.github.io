<template>
  <div id="app">
      <!-- <AddBlog></AddBlog> -->
      <!-- <ShowBlogs></ShowBlogs> -->
      <ul class="nav">
        <li>
          <router-link :to="{name:'addblogLink'}">写博客</router-link>
        </li>
        <li>
          <router-link :to="{name:'showblogsLink'}">博客</router-link>
        </li>
      </ul>
      <router-view></router-view>
  </div>
</template>

<script>
// import AddBlog from "./components/AddBlog"
// import ShowBlogs from "./components/ShowBlogs"


export default {
  name: 'App',
  // components:{
  //   AddBlog,ShowBlogs
  // }
}
</script>

<style lang="less" scoped>
    #app{
      .nav{
        padding: 0;
        margin: 0;
        list-style: none;
        width: 100%;
        height: 40px;
        line-height: 40px;;
        text-align: center;
        background-color: pink;
        overflow: hidden;
        li{
          display: inline-block;
          a{
            padding: 20px;
            color: #ffffff;
            text-decoration: none;
          }
        }
      }
    }
</style>
