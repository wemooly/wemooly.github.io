import Vue from 'vue'
import Router from 'vue-router'
import AddBlog from "../components/AddBlog"
import ShowBlogs from "../components/ShowBlogs2"
import SingleBlog from "../components/SingleBlog"

Vue.use(Router)

export default new Router({
  routes: [
      {path:"/addblog",name:"addblogLink",component:AddBlog},
      {path:"/showblogs",name:"showblogsLink",component:ShowBlogs},
      {path:"/singleblog/:id",name:"singleblogLink",component:SingleBlog},
      {path:"/",component:ShowBlogs},
      {path:"*",redirect:"/"}
  ],
  mode:"history"
})
