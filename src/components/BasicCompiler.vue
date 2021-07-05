<template>
  <textarea v-model="code" cols="30" rows="10"></textarea>
  <code ><pre>{{ compiledCode }}</pre></code>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as Basic from "../scripts/compiler-basic";

@Options({
  components: {},
})
export default class BasicCompiler extends Vue {
  code = "point(67.78875, 76.8999);\nline(10, 10, 100, 100);";
  get compiledCode(): string {
      const compiledCode = Basic.compile(this.code);

      return compiledCode;
  }
}
</script>
<style scoped>
code {
    text-align: left;
}
</style>