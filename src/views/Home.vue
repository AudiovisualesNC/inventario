<template>
  <div class="main-home">
    <div class="dashboard">
      <img src="../assets/BBVA_WHITE.png" width="100%"/>
      <hr class="line-dash"/>
      <div class="navigation-buttons">
        <router-link class="link" to="/roomlist">
          <img class="icon-route" src=@/assets/list-view.png>
          Room List
        </router-link>
        <router-link class="link" to="/table">
          <img class="icon-route" src=@/assets/tiled-view.png>
          Room Table
        </router-link>
      </div>

    </div>
    <div class="main-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
}
</script>

<style scoped>
 /* Contendor principal (ocupa toda la página). Se organiza en columnas (una para el dashboard y otra para el contenido*/
  .main-home{
    display: flex;
    flex-direction: row;
    height: 100vh;
    max-width: 100vw;
  }
 /* Barra de navegación lateral */
  .dashboard{
    flex-shrink: 0;
    width: 10rem;
    background: #072146;
    -webkit-box-shadow: 11px 20px 36px -18px #000000;
    box-shadow: 11px 20px 36px -18px #000000;
  }
  .line-dash {
    margin-bottom: 2rem;
  }
 /* Todo el espacio a la derecha del dashboard */
  .main-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    overflow-y: auto;

  }
  .navigation-buttons{
    display: flex;
    flex-direction: column;
    color: white;
  }
  .link{
    color: white;
    font-family: Benton-BBVA,serif;
    text-decoration: none;
    margin-bottom: 1rem;

  }
 .icon-route{
   width: 15px;
   margin-bottom: -2px;
   margin-left: 0.5rem;
 }
</style>