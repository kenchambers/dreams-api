var express = require('express');
var router = express.Router();
const crypto = require('crypto');

var Users = require('./collections/users');
var User = require('./models/user');
const Twit = require('twit');
var randomWords = require('random-words');
const fs = require('fs');

const T = new Twit({
  consumer_key: 'tfIQ9lDL6hELoSYPg8R6DuGLy',
  consumer_secret: 'H99GF6ULuW5qmgEZBSl9IxhsT6r8j1f5SBZHbIPNLHV1Y3tmE4',
  access_token: '703516489073106944-j7s3lx1722aDiEK9GgKoaKYDyfUKfbT',
  access_token_secret: 'H7y9DjPaA5yYoNhsQ64aTpVWGzjwHkmBGc2EVZl51CaeY',
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
});

//****************************************
// Hit twitter API
//****************************************

// NOTE: PYTHON REMOVE @symbols and #tags
// ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)"," ",x).split())

function getTweets(opts) {
  return new Promise((resolve, reject) => {
    T.get('search/tweets', opts, function(err, data, response) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getTweetResponse(id) {
  return new Promise(function(resolve, reject) {
    T.get('statuses/show/:id', { id: id, tweet_mode: 'extended' }, function(
      err,
      data,
      response
    ) {
      if (err) {
        return reject(err);
      } else {
        return resolve(data.full_text);
      }
    });
  });
}

function getInitalMessages(responseTweetMap) {
  let arrayOfRequests = [];
  for (var id in responseTweetMap) {
    arrayOfRequests.push(getTweetResponse(id));
  }

  return new Promise(function(resolve, reject) {
    Promise.all(arrayOfRequests).then(function(data) {
      if (!data) {
        return reject();
      } else {
        // NOTE: responseTweetMap : these are the responses to the tweets
        // NOTE: data : these are the initial tweets
        let dictionary = Object.keys(responseTweetMap).map((key, i) => {
          return { [data[i]]: responseTweetMap[key] };
        });

        const response = dictionary.reduce((a, b) => Object.assign({}, a, b));

        Object.entries(response).map((key, value) => {
          console.log('+++++++++++++++++++++++++');
          // console.log(data.full_text);
          console.log(typeof key);

          // key.replace(/\n/g, '');

          return key, value;
          // data.full_text.replace(/\n/g, '')
          console.log('+++++++++++++++++++++++++');
        });

        return resolve(response);
      }
    });
  });
}

var errHandler = function(err) {
  console.log(err);
};

function getTweetResponseData(req, res) {
  console.log('++++++++++++++++++++++++');
  console.log('--- RANDOM');
  let balls = randomWords();
  console.log(balls);
  console.log('++++++++++++++++++++++++');

  const opts = {
    q: `${balls} since:2014-07-11`,
    count: 100,
    lang: 'en',
    result_type: 'recent',
    tweet_mode: 'extended'
  };
  var dataPromise = getTweets(opts);

  dataPromise
    .then(function(result) {
      let responseTweetMap = {};
      let tweets = result.statuses;
      for (var i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        let answer_id = null;
        if (!!tweet.in_reply_to_status_id_str) {
          responseTweetMap[tweet.in_reply_to_status_id_str] = tweet.full_text;
        }
      }
      // Do one more async operation here
      var anotherPromise = getInitalMessages(responseTweetMap);

      return anotherPromise;
    }, errHandler)
    .then(function(data) {
      // console.log(data);
      // NOTE: Handle the returning the data from TWITTER API here

      const json = JSON.stringify(data);

      fs.writeFile('./conversationData.json', json, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      });

      res.json(data);
      // return data;
    }, errHandler)
    .catch(error => {
      console.log(error);
    });
}

//****************************************

router.route('/twit').post((req, res) => {
  getTweetResponseData(req, res);
});

//****************************************
//****************************************

function saltHashPassword(password) {
  const salt = randomString();
  const hash = crypto.createHmac('sha512', salt).update(password);
  return {
    salt,
    hash: hash.digest('hex')
  };
}
function randomString() {
  return crypto.randomBytes(4).toString('hex');
}

router
  .route('/users')
  // fetch all users
  .get(function(req, res) {
    Users.forge()
      .fetch()
      .then(function(collection) {
        res.json({ error: false, data: collection.toJSON() });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // create a user
  .post(function(req, res) {
    const { salt, hash } = saltHashPassword(req.body.password);

    User.forge({
      salt,
      email: req.body.email,
      encrypted_password: hash
    })
      .save()
      .then(function(user) {
        res.json({ error: false, user: user.toJSON() });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  });
router
  .route('/users/:id')
  // fetch user
  .get(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch()
      .then(function(user) {
        if (!user) {
          res.status(404).json({ error: true, data: {} });
        } else {
          res.json({ error: false, data: user.toJSON() });
        }
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // update user details
  .put(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch({ require: true })
      .then(function(user) {
        user
          .save({
            name: req.body.name || user.get('name'),
            email: req.body.email || user.get('email')
          })
          .then(function() {
            res.json({
              error: false,
              data: { message: 'User details updated' }
            });
          })
          .catch(function(err) {
            res
              .status(500)
              .json({ error: true, data: { message: err.message } });
          });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  })
  // delete a user
  .delete(function(req, res) {
    User.forge({ id: req.params.id })
      .fetch({ require: true })
      .then(function(user) {
        user
          .destroy()
          .then(function() {
            res.json({
              error: true,
              data: { message: 'User successfully deleted' }
            });
          })
          .catch(function(err) {
            res
              .status(500)
              .json({ error: true, data: { message: err.message } });
          });
      })
      .catch(function(err) {
        res.status(500).json({ error: true, data: { message: err.message } });
      });
  });

module.exports = router;
