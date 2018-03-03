var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');



router.get('/', function(req, res, next) {

  googleTrends.interestByRegion({keyword: 'Women\'s march'})
    .then(function(results){
      res.send(results)
      console.log('These results are awesome', results);
    })
    .catch(function(err){
      console.error('Oh no there was an error', err);
    });

});
router.post('/', function(req, res, next) {
  googleTrends.interestByRegion({
    keyword: req.body.keyword,
     startTime: new Date('2012-01-01'),
      endTime: new Date('2017-12-25'),
       resolution: 'CITY'})
  .then((results) => {
    res.send(results)
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  })

  //
  //
  // googleTrends.interestOverTime({
  //   geo: 'US',
  //   keyword: req.body.keyword,
  //   granularTimeResolution: true,
  // })
  //   .then(function(results){
  //     res.send(results)
  //     // console.log('These results are awesome', results);
  //   })
  //   .catch(function(err){
  //     // console.error('Oh no there was an error', err);
  //   });


});

module.exports = router;
