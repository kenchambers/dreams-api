const uuid = require('uuid');

module.exports = class Controller {
  /**
   * @param {Model} model The default model object
   * for the controller. Will be required to create
   * an instance of the controller
   */
  constructor(props) {
    this.model = props.model;
    // this.collection = props.collection;
  }

  create(params) {
    const model = this.model;
    const { user } = params.socket;

    model
      .forge(params.attributes)
      .save()
      .then(function(data) {
        return params.io.sockets.emit(params.event, {
          id: data.id,
          createdAt: Date.now(),
          user,
          data
        });
      })
      .catch(function(err) {
        console.log('----- err ------');
        console.log(err.message);
        console.log('----- err ------');

        // res.status(500).json({ error: true, data: { message: err.message } });
      });
  }
};
