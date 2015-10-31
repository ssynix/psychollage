Meteor.publish('images', function() {
  // console.log("Publishing " + Images.find().count() + " images...");
  return Images.find();
});

Meteor.publish('results', function() {
  return Results.find();
});


Meteor.startup(function () {
  if(Images.find().count() === 0) {
    console.log("Seeding images...");
    
    for(var i = 0; i < 100; i++) {
      Images.insert({
        personalityVector: {
          I: randInt(0, 100),
          N: randInt(0, 100),
          T: randInt(0, 100),
          P: randInt(0, 100)
        },
        address: "http://lorempixel.com/" + randInt(300, 380) + "/" + randInt(300, 380)
      });
    }
  }
});