// Dependencies
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Model
var Group = require('../models/groupModel');

// 1. POST
router.post('/', function (req, res, next) {
  /* create */
  var group = new Group({
    name: req.body.name,
    description: req.body.description,
    slug: req.body.slug,
    category: req.body.category
  });
  /* save */
  group.save(function (err, data) {
    if (err) {
      return res.status(500).json({
        title: 'Greška! Grupa nije snimljena u bazu',
        error: err
      });
    }
    res.status(201).json({
      title: 'Bravo! Grupa je uspešno snimljena u bazu',
      data: data
    });
  });
});

// 2.GET
router.get('/', function (req, res, next) {
  /* Find groups in DB */
  Group.find()
  .populate('category', 'name')
    .exec(function (err, data) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Niste dobili listu grupa iz baze',
          error: err
        });
      }
      res.status(200).json({
        message: 'Bravo! Grupe su uspešno učitane',
        object: data
      });
    });
});

/* 3. UPDATE */
router.put('/:id', function (req, res, next) {
  /* find document by ID */
  Group.findOneAndUpdate(
    /* ID match */
    {
      '_id': req.params.id
    },
    /* update group */
    {
      $set: {
        name: req.body.name,
        slug: req.body.slug,
        category: req.body.category,
        description: req.body.description
      }
    },
    /* callback */
    function (err, success) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Grupa nije snimljena u bazu',
          error: err
        });
      }
      res.status(201).json({
        title: 'Bravo! Grupa je uspešno snimljena u bazu',
        success: 1
      });
    }
  );
});

/* 4. DELETE */
router.delete('/:id', function (req, res, next) {
  Group.findOneAndRemove(
    /* slug match */
    {
      '_id': req.params.id
    },
    /* callback */
    function (err, success) {
      if (err) {
        return res.status(500).json({
          title: 'Greška! Grupa nije izbrisana iz baze',
          success: 0,
          error: err
        });
      }
      res.status(201).json({
        title: 'Upravo ste izbrisali grupu iz baze',
        success: 1
      });
    });
});


module.exports = router;
