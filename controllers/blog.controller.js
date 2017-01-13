//--------------------------- DEPENDENCYS -------------------------------------------------------/
//----------------------------------------------------------------------------------------------/

//--------------------------- ENTITIES ---------------------------------------------------------/
var post = require("./../models/post");
//----------------------------------------------------------------------------------------------/


module.exports = function(app){
	'use strict';
	
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
						console.log(results, "results");
					});
					res.render('blog/article', {
						'article' : result 
					});
					result.vue += 1;
					console.log(result, "vue++");
					result.save();
				}
			});
		}
		else
		{
			res.status(404).redirect('/');
		}
	}
	
	return {
		f404 : f404,
		create : create,
		postCreate : postCreate,
		article : article
	}
}