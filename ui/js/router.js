'use strict';

define(["Backbone", "models/user"], (Backbone, User) => {
  return Backbone.Router.extend({

    model      : new User(),

    initialize : function(){
      this.model
        .fetch()
        .then( user => {
          if(user){
            require(["views/container/container", "views/sidebar/sidebar", "views/footer/footer"], ( container, sidebar, footer ) => { 
              this.container = new container({
                el     : "#container",
                logged : true
              });

              this.footer    = new footer({
                el : "#footer"
              });
    
              this.sidebar = new sidebar({
                el    : "#sidebar",
                model : user
              });

            });
          }
        })
        .fail( message => {     
            require(["../app/views/container/container", "../app/views/footer/footer"], ( container, footer ) => { 
              this.container = new container({
                el : "#container"
              });
              this.footer    = new footer({
                el : "#footer"
              });
            });
        });
    }

  });
});
