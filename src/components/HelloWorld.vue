<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
export default defineComponent({
  setup() {
    const msg = ref('');
    const count = ref(0);
    const setCount = (value: number) => {
      count.value = value;
    };
    return {
      msg,
      count,
      setCount,
      RouterLink,
    };
  },
});
</script>
<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <p>
    <button type="button" @click="setCount(count + 1)">
      count is: {{ count }}
    </button>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <router-link to="/about">关于</router-link>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
