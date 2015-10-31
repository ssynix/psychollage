

Template.results.helpers({
  result: function() {
    var results = Session.get('results');
    var vectorSum = _.reduce(results, function(sum, vector) {
      return {
        I: sum['I'] + vector['I'],
        N: sum['N'] + vector['N'],
        T: sum['T'] + vector['T'],
        P: sum['P'] + vector['P']
      };
    }, { I: 0, N: 0, T: 0, P: 0 });

    // return {
    //       I: '30%',
    //       N: '30%',
    //       T: '30%',
    //       P: '30%',
    //     };
    return {
      I: (vectorSum['I'] / results.length) + '%',
      N: (vectorSum['N'] / results.length) + '%',
      T: (vectorSum['T'] / results.length) + '%',
      P: (vectorSum['P'] / results.length) + '%',
    };
  },

});
    // return JSON.stringify(Session.get('results'), null, 4);