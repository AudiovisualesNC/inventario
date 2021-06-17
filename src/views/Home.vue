<template>
  <div class="main-home">
    <div class="dashboard">
      <img src="../assets/BBVA_WHITE.png" width="100%"/>
      <div class="navigation-buttons">

      </div>

    </div>
    <div class="main-content">
      <div class="tools">
        <div class="tools-search">
          <input class="search-input" type="search" id="site-search" name="q"
               aria-label="Search through site content" placeholder="Filter rooms">
          <button class="search-button" type="button">Search</button>
        </div>
        <button class="delete-button" type="button">Delete</button>
      </div>
      <span v-show="loading" class="lds-dual-ring"></span>
      <p class="total-label" v-show="loaded">Total: {{rooms.length}}</p>
      <div class="room-table">
        <table v-show="loaded" class="table">
          <tr class="column-name">
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>IP</th>
            <th>Hostname</th>
            <th>RS232 Port</th>
            <th>Status Port</th>
            <th>Script Version</th>
            <th>Keypad</th>
            <th>Windows</th>
            <th>Hardware Model</th>
            <th>Camera</th>
            <th>Last Modification</th>
          </tr>
          <tr v-for="room in rooms" :key="room.id">
            <td><input type="checkbox" name="name2" /></td>
            <td>{{room.room_id}}</td>
            <td>{{room.room_name}}</td>
            <td>{{room.ip}}</td>
            <td>{{room.hostname}}</td>
            <td>{{room.port_name}}</td>
            <td>{{room.open_port}}</td>
            <td>{{room.script_version}}</td>
            <td>{{room.with_button}}</td>
            <td>{{room.operating_system}}</td>
            <td>{{room.device}}</td>
            <td>{{room.cam}}</td>
            <td>{{room._time}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import RoomService from '../services/room.service'
export default {
  name: "Home",
  data() {
    return {
      rooms: [],
      loading: true,
      loaded: false
    };
  },
  created() {
    RoomService.getAll().then(response => {
      this.loading = false
      this.loaded = true
      this.rooms = response.data
    }).catch(err => {
      this.loading = false
      this.loaded= false
      console.log(err)
    })
  }
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
 /* Todo el espacio a la derecha del dashboard */
  .main-content{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
  }

  /* Herramientas de búsqueda y manejo de las salas sobre la tablas */
   .tools{
     margin-top: 2rem;
     display: flex;
     flex-direction: row;
     justify-content: center;
   }
   button{
     color: white;
     width: 6rem;
     height: 2rem;
     border-radius: 5px;
   }
   .search-button{
     background: #004481;
     margin-left: 1rem;
     border: none;
   }
   .delete-button{
     background: #DA3851;
     margin-left: 1rem;
     border: none;
   }
   .search-input{
     display: inline-block;
     border: 1px solid #ccc;
     border-radius: 4px;
     box-sizing: border-box;
     height: 2rem;
   }
   textarea:focus, input:focus{
     outline: none;
     -webkit-box-shadow: 0px 0px 13px 0px #028484;
     box-shadow: 0px 0px 13px 0px #028484;
   }

   /* Diseño de la tabla */
  .room-table{
    overflow-x: scroll;
    overflow-y: scroll;
  }
  table{
    border-collapse: collapse;
    white-space: nowrap;
    margin-left: 2rem;

  }
  th, td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: center;

  }
  td{
    color: black;

  }
  th {
    background: #072146;
  }
  tr:hover {background-color: #f5f5f5;}
  tr:nth-child(even) {background-color: #f2f2f2;}

 .lds-dual-ring {
   align-self: center;
   margin-top: 2rem;
   display: inline-block;
   width: 80px;
   height: 80px;
 }
 .lds-dual-ring:after {
   content: " ";
   display: block;
   width: 64px;
   height: 64px;
   margin: 8px;
   border-radius: 50%;
   border: 6px solid #072146;
   border-color: #072146 transparent #072146 transparent;
   animation: lds-dual-ring 1.2s linear infinite;
 }
 @keyframes lds-dual-ring {
   0% {
     transform: rotate(0deg);
   }
   100% {
     transform: rotate(360deg);
   }
 }

 .total-label{
   color: #072146;
   align-self: flex-start;
   margin-left: 2rem;
 }
</style>