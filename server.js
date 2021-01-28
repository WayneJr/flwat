const express = require('express'),
      app     = express(),
      port    = process.env.PORT || 3000,
      routes  = require('./api/route');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(routes);


app.listen(port, () => console.log(`listening on port: ${port}`));
