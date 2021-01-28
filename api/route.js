const express = require('express'),
      router  = express.Router(),
      {myProfile, validateRule} = require('./controller');


router.get('/', myProfile);
router.post('/validate-rule', validateRule);

module.exports = router;