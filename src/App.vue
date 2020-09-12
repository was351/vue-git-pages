<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="blue Darken-3" clipped>
      <v-list >
        <v-list-item link v-for="menu in menus" :key="menu.name" :to="menu.url">
          <v-list-item-action>
            <v-icon>{{menu.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title class="text-uppercase" >{{menu.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-avatar>
            <v-chip v-if="menu.count > 0">{{menu.count}}</v-chip>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left
               color="blue darken-4"
               dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>Wasif Sarker</v-toolbar-title>
      <v-spacer></v-spacer>
      <a class="links" target="_blank" href="https://www.instagram.com/wsarker1/"><v-btn icon>
        <v-icon size="40" color="white">mdi-instagram</v-icon>
      </v-btn></a>
      <a class="links" target="_blank" href="mailto:wasif_farhan@hotmail.com"><v-btn icon>
          <v-icon size="40" color="white">mdi-email</v-icon>
      </v-btn></a>
      <a class="links" target="_blank" href="https://www.linkedin.com/in/wasif-sarker-869969183/"><v-btn icon>
        <v-icon size="40" color="white">mdi-linkedin</v-icon>
      </v-btn></a>
      <a class="links" target="_blank" href="https://github.com/was351"><v-btn icon>
        <v-icon size="40" color="white">mdi-github</v-icon>
      </v-btn></a>

      <v-btn
              icon
              large
      >
        <v-avatar
                size="40px"
                item
        >
          <v-img
                  src="@/assets/Profile.png"
                  alt="Vuetify"
          ></v-img></v-avatar>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <span>Wasif Sarker &copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
  .line-break {
    white-space: pre-wrap;
  }

  a:-webkit-any-link{
    text-decoration:none !important;
  }

</style>

<script>
  import Axios from "axios";

  export default {
    props: {
      source: String
    },
    data: () => ({
      drawer: null,
      menus: [
        {
          name: "cv",
          url: "/cv",
          icon: "mdi-file",
          count: 0
        },


        {
          name: "projects",
          url: "/projects",
          icon: "mdi-briefcase-outline",
          count: 0
        },
        {
          name: "Resume",
          url: "/resume",
          icon: "mdi-file-word",
          count: 0
        }
      ],
      cv: {}
    }),
    created() {
      this.$vuetify.theme.dark = true;
    },
    mounted: function() {
      this.getCount();
      this.getProjectCount();
    },
    methods: {
      getCount: function() {
        var _this = this;
        Axios.get("/data/cv.json").then(function(response) {
          _this.cv = response.data;
          _this.menus.forEach(function(menu) {
            if (_this.cv[menu.name] !== undefined) {
              menu.count = _this.cv[menu.name].length;
            }
          });
        });
      },
      getProjectCount: function() {
        var _this = this;
        Axios.get("/data/projects.json").then(function(response) {
          // /* eslint-disable no-console */
          // console.log(response.data.length);
          _this.menus.forEach(function(menu) {
            if (menu.name === "projects") {
              response.data.projects.forEach(function(item) {
                menu.count += item.repos.length;
              });
            }
          });
        });
      }
    }
  };
</script>

