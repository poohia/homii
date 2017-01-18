//--------------------------- DEPENDENCYS -------------------------------------------------------/
var async = require('async');
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var post = require("./../models/post");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
	function index(req, res)
	{
		async.parallel([
			function(callback)
			{
				post.find({}, function(err, result){
					var data = new Object();
					data.recentPost = result;
					callback(err, data);
				});
			},
			function(callback)
			{
				post.find({}).sort('vues').exec(function(err, result){
					var data = new Object();
					data.vuePost = result ;
					callback(err, data);
				})
			}
			], 
		
		function (err, result)
		{
			res.render("blog/index", {
			 'recentPosts' :	result[0].recentPost,
			 'vuePosts'    : result[1].vuePost
			});
		});
		
	}
	
	function f404(req, res)
	{
        res.status(404).render('404', {'url' : req.url});
	}
	
	function create(req, res)
	{
	    res.render("blog/create");
	}
	function postCreate(req, res)
	{
		var name_file = req.files.post_image.name; 
		var newPost = new post({
		    titre_1 : req.body.title_1,
		    titre_2 : req.body.title_2,
		    keywords : req.body.keywords,
		    contenu : req.body.content,
		    preview : req.body.preview,
		    author   : req.body.author,
		    image : '/images/posts/' + name_file,
		    vues : 0 
		});
		req.files.post_image.mv('views/images/posts/' + name_file, function(err){
		 });
		 newPost.save();
		 res.redirect('/admin');
	}
	
	function article(req, res)
	{
		if(req.params.slug)
		{
			post.findOne({'slug' : req.params.slug}, function(err, result){
				if(result === null)
				{
					res.status(404).redirect('/');
				}
				else
				{
					post.find({ $not: { _id : result._id }}, '_id titre_1 image  preview').limit(4).exec( function(err , results){
						res.render('blog/article', {
							'article' : result,
							'other_articles' : results
						});
					});
					result.vues += 1;
					result.save();
				}
			});
		}
		else
		{
			res.status(404).redirect('/');
		}
	}
	
	function articles(req, res)
	{
		post.find({}, function(err, results){
			res.render('admin/articles', {
				'articles' : results	
			});
		})
	}
	
	function removeArticle(req, res)
	{
		post.findById(req.params.id, function(err, result){
			result.remove();
			res.redirect('/admin/articles');
		});
	}
	
	function editArticle(req, res)
	{
		post.findById(req.params.id, function(err, result){
			res.render('blog/edit',
			{
				'article' : result	
			});
		});
	}
	function postEditArticle(req, res)
	{
		post.findById(req.params.id, function(err, result)
		{
				var name_file = req.files.post_image.name;
				result.author = req.body.author;
				result.titre_1 = req.body.title_1;
				result.titre_2 = req.body.title_2;
				result.keywords = req.body.keywords;
				result.preview  = req.body.preview;
				result.contenu   = req.body.content;
				if( name_file !== '')
				{
					result.image = "/images/posts/" + name_file ;
					req.files.post_image.mv('views/images/posts/' + name_file, function(err){
					 });
				}
				result.save();
				res.redirect('/admin/articles');
		});
	}
	return {
		f404 : f404,
		create : create,
		postCreate : postCreate,
		article : article,
		articles : articles,
		removeArticle : removeArticle,
		editArticle : editArticle,
		postEditArticle : postEditArticle,
		index : index
	}
}