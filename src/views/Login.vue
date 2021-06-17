<template>
 <div class="main">
   <img  class="main-logo" src="../assets/logo.png">
   <div class="form-square">
     <label class="sign-label">Sign In</label>
     <form class="form" name="form" @submit.prevent="handleLogin">
       <div class="form-group">
         <input
             v-model="username"
             type="text"
             class="form-control"
             name="username"
             placeholder="Username"
         />
       </div>
       <div class="form-group">
         <input
             v-model="password"
             type="password"
             class="form-control"
             name="password"
             placeholder="Password"
         />
       </div>
       <div class="form-group">
         <button class="submit-button" :disabled="loading">
           <span v-show="loading" class="lds-dual-ring"></span>
           <span v-show="!loading">Sign In</span>
         </button>
       </div>
       <div class="form-group">
         <div v-if="message" class="error-message" role="alert">{{message}}</div>
       </div>
     </form>
   </div>
 </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
     // this.$router.push('/home');
    }
  },
  methods: {
    handleLogin() {
      const formData = new FormData()
      this.loading = true
      this.message = ''
      if(this.username !== '' && this.password !== ''){
        formData.append('username', this.username)
        formData.append('password', this.password)
        this.$store.dispatch('auth/login', formData).then(() => {
          this.loading = false
          this.$router.push('/home');
        }).catch( err => {
          this.loading = false
          if(err.status === 401){
            this.message = "Invalid username or password"
          } else {
            this.message = "There is some error"
          }
        })

      } else {
        this.loading = false
        this.message = "User and password required!"
      }

    }
  }
};
</script>

<style scoped>
  .main{
    display: flex;
    flex-direction: column;
    background: #072146;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
  .main-logo{
    height: 15%;
    min-height: 5rem;
    margin-bottom: 2rem;
  }
  .form-square{
    background: #004481;
    width: 20%;
    height: 40%;
    min-height: 22rem;
    min-width: 20rem;
    border-radius: 1rem;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.8);
  }
  .sign-label {
    font-family: Benton-BBVA;
    color: white;
    font-size: 3em;
  }
  .form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .form-group {
    display: flex;
    margin-bottom: 2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input{
    width: 50%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  textarea:focus, input:focus{
    outline: none;
    -webkit-box-shadow: 0px 0px 13px 0px #028484;
    box-shadow: 0px 0px 13px 0px #028484;
  }
  .submit-button{
    background: #028484;
    color: white;
    width: 50%;
    font-family: Benton-BBVA;
    font-size: 1em;
    padding: 1rem;
    border-radius: 4px;
    border: none;
  }
  .submit-button:hover{
    background: #02A5A5;
  }
  .lds-dual-ring {
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
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
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

  .error-message {
    color: #DA3851;
  }


</style>