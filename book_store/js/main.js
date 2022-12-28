const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'eedf40bf42mshf6bede1b85e680ap1a2949jsn03f06b2faefc',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=game%20of%20thr', options)
	.then(response => response.json())
	.then(data => {
		const list = data.d;

		list.map((item) => {
			const name = item.l;
			const poster = item.i.imageUrl;
			const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
			document.querySelector('.movies').innerHTML += movie;
			// console.log(item)
		})
	})
	.catch(err => { console.error(err);
	});