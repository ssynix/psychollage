'use strict';


Router.configure({
  // We use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('images'),
      Meteor.subscribe('results')
    ];
  }
});

Router.route('/', function () {
  this.render('appContent');
});

Router.route('hello');

Router.route('collage', {
  data: function() { 
    return { reset: 'reset' in this.params.query };
  }
});

Router.route('newTest', {
  path: '/new',

  action: function() {
    Router.go('collage', {}, { query: 'reset' });
  }
});
