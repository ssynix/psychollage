Template.modal.events({
  'click #modalButton': function() {
    Template.instance().data['action']();
    Modal.hide();
  }
});

