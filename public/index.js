var app = new Vue({
    el: '#app',
    data () {
        return {
          info: null
        }
    },
    
    methods:{
        getUsers: function(){
            this.$http.get('/getattendance').then(function(response){
                this.info = response;
            }, function(error){
                console.log(error.statusText);
            });
        }
    },
    mounted: function () {
        this.getUsers();
    }
    
  });

