// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Model
var Category = require('../models/categoryModel');

// 1. POST
router.post('/', function (req, res, next) {
  var category = new Category({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.slug
  });
  category.save(function (err, data) {
    if (err) {
      return res.status(500).json({
        title: 'Greška! Kategorija nije snimljena u bazu',
        error: err
      });
    }
    res.status(201).json({
      title: 'Bravo! Kategorija je uspešno snimljena u bazu',
      data: data
    });
  });
});

// 2.GET BY SLUG
router.get("/:slug", function(req, res, next) {
  /* Find products in DB */
  Category.findOne({ slug: req.params.slug })
    .exec(function(err, data) {
      if (err) {
        return res.status(500).json({
          title: "Greška! Niste dobili listu proizvoda iz baze",
          error: err
        });
      }
      res.status(200).json({
        message: "Bravo! Proizvod je uspešno učitan",
        object: data
      });
    });
});

// 2.GET ALL
router.get('/', function (req, res, next) {
  /* Find categories in DB */
  Category.find()
    .exec(function (err, data) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Niste dobili kategoriju iz baze',
          error: err
        });
      }
      res.status(200).json({
        message: 'Bravo! Kategorija je uspešno učitana',
        object: data
      });
    });
});

/* 3. UPDATE */
router.put('/:id', function (req, res, next) {
  /* find document by ID */
  Category.findOneAndUpdate(
    /* ID match */
    {
      '_id': req.params.id
    },
    /* update Category */
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description
      }
    },
    /* callback */
    function (err, success) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Kategorija nije snimljena u bazu',
          success: 0,
          error: err
        });
      }
      res.status(201).json({
        title: 'Bravo! Kategorija je uspešno snimljena u bazu',
        success: 1
      });
    }
  );
});

/* 4. DELETE */
router.delete('/:id', function (req, res, next) {
  Category.findOneAndRemove(
    /* slug match */
    {
      '_id': req.params.id
    },
    /* callback */
    function (err, success) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Kategorija nije izbrisana iz baze',
          success: 0,
          error: err
        });
      }
      res.status(201).json({
        title: 'Upravo ste izbrisali kategoriju iz baze',
        success: 1
      });
    });
});


module.exports = router;
