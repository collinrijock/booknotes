<template>
  <div id="app" class="flex flex-row">
    <nav class="flex flex-col w-64 h-100">
      <h1>Content</h1>
      <a
        class="truncate cursor-pointer hover:bg-gray-200"
        @click.prevent="goToContent(content.id)"
        v-for="content in data"
        :key="content.contentUrl"
        >{{ content.contentTitle }}</a
      >
      <a
        class="truncate cursor-pointer hover:bg-gray-200"
        @click.prevent="newContent"
        >Add new</a
      >
    </nav>
    <router-view />
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
// import { useToast } from "vue-toastification";
import { ref, watch, onMounted } from "vue";
export default {
  components: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const data = ref([]);
    watch(data, (val) => {
      store.dispatch("saveLocalStorageData", val);
    });
    onMounted(async () => {
      data.value = await store.dispatch("getLocalStorageData");
    });
    return {
      data,
      router,
      route,
      newContent() {
        router.push({ name: "content", params: { id: "new" } });
      },
      goToContent(id) {
        router.push({ name: "content", params: { id } });
      },
    };
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
