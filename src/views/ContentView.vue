<!-- eslint-disable vue/no-duplicate-attributes -->
<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div id="contentView">
    <div id="newContent" v-if="route.params.id == 'new'">
      <div class="content__title">
        <h2>Title</h2>
        <input type="text" v-model="contentData.title" />
      </div>
      <div class="content__url">
        <h2>Url</h2>
        <input type="text" v-model="contentData.url" />
        <YouTube v-if="contentData.url" :src="contentData.url" />
      </div>
    </div>
    <div class="content__actions">
      <button @click="save">Save</button>
      <button @click="deleteContent">Delete</button>
    </div>
    <h1>Content View</h1>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, watch, onMounted } from "vue";
import YouTube from "vue3-youtube";
export default {
  components: { YouTube },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const contentData = ref([{}]);
    const videoProperties = ref({
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
    });
    watch(contentData, (val) => {
      console.log("notes changed", val);
    });
    onMounted(async () => {
      if (route.params.id == "new") {
        contentData.value = {
          title: "",
          url: "",
        };
      } else {
        contentData.value = await store.dispatch(
          "getLocalStorageData",
          route.params.id
        );
      }
    });
    return {
      contentData,
      router,
      route,
      videoProperties,
      onReady() {
        console.log(contentData.value.url);
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
