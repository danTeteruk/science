var express = require('express');
var router = express.Router();
var Article = require('../models/article');





router.get('/', function(req, res, next) {
  Article.find(function(err, article) {
    if (err)
      res.send(err);

    res.render("index", {
      title: "Головна",
      "article": article
    })

  });
});


router.get('/new', function(req, res, next) {
  Article.find(function(err) {
    if (err)
      res.send(err);

    res.render( "new.ejs");

  });
});

router.post("/new", function(req, res, next) {
  var article = new Article();

  article.name = req.body.name;
  article.text = req.body.text;
  article.category = req.body.category;
  article.image = req.body.image;
  article.date = Date.now();

  article.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'All be fine', data: article });
  });
});

router.get('/cosmos', function(req, res, next) {
  Article.find({ 'category': "cosmos" }, function(err, article) {
    if (err)
      res.send(err);

    res.render("category", {
      "article": article
    });

  });
});

router.get('/science', function(req, res, next) {
  Article.find({ 'category': "science" }, function(err, article) {
    if (err)
      res.send(err);

    res.render("category", {
      "article": article,
    });

  });
});

router.get('/medicine', function(req, res, next) {
  Article.find({ 'category': "medicine" }, function(err, article) {
    if (err)
      res.send(err);

    res.render("category", {
      "article": article
    });

  });
});


router.get("/:article_id", function(req, res) {
  Article.findById(req.params.article_id, function(err, article) {
    if (err) 
      res.send(err);

    res.render("article", {
      "article": article
    });
  });
});



router.get("/:article_id/edit", function(req, res){ 
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);
    res.render("edit", {
      "article": article
    })
  })
})






router.put("/:article_id/edit", function(req, res) {
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);

    article.name = req.body.name;
    article.text = req.body.text;
    article.category = req.body.category;
    article.image = req.body.image;

    article.save(function(err) { 

      if (err) 
        res.send(err);

      res.redirect("/");
    });
  });
});

router.delete("/:article_id/delete", function(req, res) {
  Article.findByIdAndRemove(req.params.article_id, function (err) {
    if (err)
      res.send(err);

    res.json({ message: "Article removed" });
  });
});

router.get("/favicon.ico", function(req, res) { 
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;

})

module.exports = router;



