<template>
  <div class="il">
    <div class="il textA">
      <textarea v-model="code" cols="30" rows="10"></textarea>
    </div>
    <div class="il pss">
      <code>
        <pre>{{ compiledCode }}</pre>
      </code>
    </div>
    <div class="il preview">
      <canvas id="c" width="230" height="400"></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import * as Basic from "../scripts/compiler-basic";
import * as PSS from "../scripts/pss";

@Options({
  components: {},
})
export default class BasicCompiler extends Vue {
  code = "point(67.78875, 76.8999);\nline(10, 10, 100, 100);";
  canvas!: CanvasRenderingContext2D;
  get compiledCode(): string {
    const compiledCode = Basic.compile(this.code);
    if (this.canvas) {
      PSS.draw(this.canvas, compiledCode);
    }
    console.log(
      JSON.stringify({
        data: compiledCode,
      })
    );
    fetch("http://localhost:9753/compile/", {
      method: "POST",
      body: JSON.stringify({
        data: compiledCode,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return compiledCode;
  }
  mounted(): void {
    let c = document.getElementById("c");
    this.canvas = <CanvasRenderingContext2D>(
      (<HTMLCanvasElement>c).getContext("2d")
    );
  }
}
</script>
<style scoped>
code {
  text-align: left;
}
.il {
  display: inline-block;
}
.preview {
  border: 2px solid magenta;
  width: 230px;
  margin: 20px;
}
.pss {
  border: 2px solid red;
  width: 500px;
  margin: 20px;
}
.textA {
  border: 2px solid green;
  width: 300px;
  margin: 20px;
}
</style>