<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

@font-face {
  font-family: "Benton-BBVA";
  src: local("Benton-BBVA"),
  url(./fonts/BentonSansBBVA-Medium.ttf) format("truetype");
}
#app {
  font-family: Benton-BBVA;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>
