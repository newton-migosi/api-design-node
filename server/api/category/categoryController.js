var Category = require('./categoryModel');
var _ = require('lodash');

exports.params = function(req, res, next, id) {
  // use the id and attach the category to req
  Category.findById(id, function(err, category) {
    if (err) {
      next(err);
    } else {
      req.category = category;
      next();
    }
  })
};

exports.get = function(req, res, next) {
  Category.find({}, function(err, categories) {
    if (err) {
      next(err);
    } else {
      res.json(categories);
    }
  })
};

exports.getOne = function(req, res, next) {
  var category = req.category;
  res.json(category);
};

exports.put = function(req, res, next) {
  var category = req.category;

  var update = req.body;

  _.merge(category, update);

  category.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newcategory = req.body;

  Category.create(newcategory)
    .then(function(category) {
      res.json(category);
    }, function(err) {
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.category.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
