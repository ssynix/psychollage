'use strict';


Router.configure({
  // We use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody'
});

Router.route('/', function () {
  this.render("appContent");
});

Router.route("hello");
Router.route("collage");
