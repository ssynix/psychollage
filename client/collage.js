'use strict';


// Tracker.autorun(function(){
//    Meteor.subscribe("images", function(){
//       console.log(Images, Images.find(), Images.find().fetch());
//    });
// });


Template.collage.helpers({
  images: function() {

    // Inefficiently getting everything and then randomly picking however many we want
    // A probable solution is using mongoDB's geospatial indices if we actually see a
    // noticable performance hit considering the small number of images we have.
    // FIXME if bottleneck
    var images = _.shuffle(Images.find().fetch());

    var count = randInt(4, 7);
    // return _.take(images, count);
    images = _.rest(images, count);
    return Session.get('collage');
  }
});


Template.collage.events({
  'click .next-button': function() {
    document.location.reload(true);
  }
});

Template.imagePiece.events({
  'click img': function() {
    document.location.reload(true);
  }
});

  Meteor.subscribe('images');
  var images = Images.find().fetch();
  console.log("Subscribed to " + images.length + " images...");