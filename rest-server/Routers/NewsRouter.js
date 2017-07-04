const express = require('express'),
      router = express.Router(),
      NewsManager = require('../Managers/NewsManager'),
      logger = require('../../Winston/WinstonSession');

router.get('/sources', (req, res, next) => {
  logger.info("News sources requested");
  NewsManager.getNewsSources()
    .then(data => {
      res.json({sources: data});
    })
    .catch(err => {
      logger.error("NewsManager hit an error", err);
    });
})

router.get('/:source', (req, res, next) => {
  const source = req.params.source;
  logger.info(`News from ${source} requested`);
  NewsManager.getNews(source, result => {
    res.json(result);
  }, err => {
    logger.error(err);
    res.json({error: "No such news source stored."});
  });
})

router.post('/sources', (req, res, next) => {
  const source = req.body.source;
  logger.info(`Request to add ${source} into DB.`);
  if (source) {
    NewsManager.addNewsSource(req.body.source, (err, result) => {
      if (err) {
        logger.error("error persisting", err);
        res.json({status: "error persisting"});
      } else {
        res.json({status: "success"});
      }
    });
  } else {
    res.json({status: "error, empty post"});
  }
});

module.exports = router;
