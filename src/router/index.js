import VueRouter from 'vue-router'
import Vue from 'vue'


import Cv from './components/Cv'
import Projects from './components/Projects'
import Resume from "./components/Resume";
Vue.use(VueRouter);

const routes = [


  {
    path:'/projects',
    component: Projects
  },
  {
    path: '/resume',
    component: Resume
  },
  {
    path: '/cv',
    component: Cv
  },
  {
    path: '/',
    component: Cv
  }
]

const router = new VueRouter({
  routes
});

export default router;
