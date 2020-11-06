<template>
  <v-app id="app">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link class="nav-link" exact to="/home">Home</router-link>
        <router-link class="nav-link" exact to="/panel"
          >Control Panel</router-link
        >
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/jef/nvidia-snatcher" target="_blank" text>
        <span class="mr-2">navidia-snatcher</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <transition name="fade" appear>
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    //
  }),

  async mounted() {
    const resp = await fetch('/api/config');
    const configResp = await resp.json();
    this.$store.commit('setConfig', configResp);
  },
};
</script>

<style lang="scss" scoped>
#app {
  background-color: #edf2fc;
}
.nav-link {
  color: #fff;
  padding: 10px;
}
</style>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in-out, transform 0.7s ease;
}

.fade-enter-active {
  transition-delay: 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.router-link-exact-active {
  color: #000;
}
</style>