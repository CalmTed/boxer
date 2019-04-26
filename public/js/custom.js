$(document).ready(function(){

	var userFeed = new Instafeed({
		get : 'user',
		userId : '12989127314',
		limit : 12,
		resolution : 'low_resolution',
		accessToken : '12989127314.1677ed0.d6e1495c6cb543f595f6380b94abbd6c',
		sortBy : 'most-recent',
		template : '<div class="col-lg-3 gallery instaimage"<a href="{{image}}" title ="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
	})
	
	userFeed.run();

	$('.instaGallery').magnificPopup({
	  type: 'image',
	  delegate: 'div',
	  gallery:{
	    enabled:true
	  }
	});
})