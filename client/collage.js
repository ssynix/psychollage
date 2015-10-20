'use strict';


// Credit: stackoverflow answer by Ionuț G. Stan
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchImages() {
  var images = [];
  var count = randInt(4, 7);
  for (var i = 0; i < count; i++) {
    images.push({
      address: "http://lorempixel.com/" + randInt(100, 280) + "/" + randInt(100, 280)
    });
  }

  return images;
};

Template.collage.helpers({
  images: fetchImages(),
});

Template.imagePiece.events({
  'click img': function() {
    document.location.reload(true);
  }
});

