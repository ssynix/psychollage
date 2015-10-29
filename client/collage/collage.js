'use strict';


// Tracker.autorun(function(){
//    Meteor.subscribe("images", function(){
//       console.log(Images, Images.find(), Images.find().fetch());
//    });
// });


var reset = function() {
  // Inefficiently getting everything and then randomly picking however many we want
  // A probable solution is using mongoDB's geospatial indices if we actually see a
  // noticable performance hit considering the small number of images we have.
  // FIXME if bottleneck
  var images = _.shuffle(Images.find().fetch());

  Session.set('images', images);
  Session.set('results', []);
  Router.go('collage'); // to clear out the reset parameter
};

var collectResults = function() {
  var $selectedImages = $('.image.selected');
  if($selectedImages.length == 0) {
    Modal.show('modal', {
      title: "  ",
      body: "You haven't selected any images! Are you sure you wanna skip this collage?",
      buttonText: 'Yep!',
      action: function() {
        nextCollage();
      }
    });
    return false;
  }

  $selectedImages.each(function() {
    var imageID = $(this).find('img').data('id');
    var personalityVector = Images.findOne(imageID).personalityVector;

    var results = Session.get('results');
    results.push(personalityVector);
    Session.set('results', results);
  });

  if(Session.get('results').length > 5)
    Router.go('results');
  return true;
};

var nextCollage = function() {
  var images = Session.get('images');
  var count = randInt(4, 7);
  var collage = _.take(images, count);
  var reducedImages = _.rest(images, count);

  Session.set('images', reducedImages);
  Session.set('collage', collage);

  // TODO running out of images
};

Template.collage.helpers({
  images: function() {
    if(this.reset) reset();
    return Session.get('collage');
  },

  results: function() {
    return Session.get('results');
  },
});

Template.collage.rendered = function() {
  nextCollage();
};

Template.collage.events({
  'click .next-collage': function() {
    var success = collectResults();
    if(success) nextCollage();
  },

  'click .image': function(event) {
    $(event.target).toggleClass('selected');
  },
});
