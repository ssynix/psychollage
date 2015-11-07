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
    var imageID = $(this).data('id');
    var personalityVector = Images.findOne(imageID).personalityVector;

    var results = Session.get('results');
    results.push(personalityVector);
    Session.set('results', results);
  });

  if(Session.get('results').length > 5)
    Router.go('results');
  return true;
};

var imagesTransitionOut = function() {
  var $images = $('#images');
  // Move the entire #images div to the left, then put it all the way to the right
  // so the next set of images can swoop in from the right
  $images.animate({ left: '-150%' }, 800, function() {
    $images.css('left', '150%');
  });
};

var imagesTransitionIn = function() {
  var $images = $('#images');
  // Wait till animations are finished
  $images.promise().done(function() {
    // Also wait till all background images are loaded FIXME: actually doesn't wait for that...
    $images.imagesLoaded({ background: '.image' }, function() {
      $images.animate({ left: '0' }, 800);
    });
  });
};

var nextCollage = function() {
  var images = Session.get('images');
  if(images === undefined || images.length == 0) {
    Router.go('newTest');
    return
  }
  imagesTransitionOut();

  var count = randInt(4, 6);
  var collage = _.take(images, count);
  var reducedImages = _.rest(images, count);

  Session.set('images', reducedImages);

  // We don't wanna trigger the reactive loading of images when the animation is in progress
  $('#images').promise().done(function() {
    Session.set('collage', collage);
    imagesTransitionIn();
  });
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
  var collage = Session.get('collage');
  if(collage && collage.length) return;
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
