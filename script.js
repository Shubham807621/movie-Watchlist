// Keys = ca16ebe
// https://www.omdbapi.com/?i=tt3896198&apikey=ca16ebe
// https://www.omdbapi.com/?s=spiderman&apikey=ca16ebe

const movieInput = document.getElementById("movieInput");
const btn = document.getElementById("btn1");


function movies(){

    const url = `https://www.omdbapi.com/?s=${movieInput.value}&apikey=ca16ebe`;

    fetch(`${url}`)
    .then(respone => respone.json())
    .then((data)=> {
        // console.log(data);
        const display = document.getElementById("display")
        display.innerHTML='';
       
        
        if(data.Search){

            data.Search.forEach((movie) => {
                
                    const id =movie.imdbID;
                    // console.log(id);
                    const movieUrl = `https://www.omdbapi.com/?i=${id}&apikey=ca16ebe`
                    fetch(`${movieUrl}`)
                    .then(res => res.json())
                    .then((data1)=>{
                        // console.log(data1.Search);
                        // displayMovies(data1)
                        // console.log(data1);
                        
                        const movieList= document.createElement("li")
                        movieList.classList.add("movielist");
                    
                        const poster = document.createElement("img");
                        poster.src = data1.Poster;
                        poster.classList.add("movie-poster")
                        movieList.appendChild(poster)
                    
                        const movieDetails = document.createElement("div")
                        movieDetails.classList.add("movieDeatils")
                        movieDetails.innerHTML = `
                            <h3>${data1.Title}</h3>
                            <p>Released Year: ${data1.Released}</p>
                            <p>Director: ${data1.Director}</p>
                            <p>Actors: ${data1.Actor}</p>
                            <p>Plot: ${data1.Plot}</p>
                            <p>Language: ${data1.Language}</p>
                        `;
                        movieList.appendChild(movieDetails)
                    
                        const addWatchList = document.createElement("button")
                        addWatchList.classList.add("add-watchlist")
                        addWatchList.innerHTML= `<p >Add to Watchlist<span><i class="fa-regular fa-star"></i></span></p>`
                    
                        addWatchList.onclick=()=> add(data1.imdbID);

                        movieList.appendChild(addWatchList)
                        
                        display.appendChild(movieList)
                    })  
                    .catch(err=>alert(`there is an error`,err))    
            });
        }
    })
    .catch(err=>alert(`there is an error`,err))
   
}


// function addToWatchList(imdbID){

//     fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=ca16ebe`)
//     .then(res1 => res1.json())
//     .then((data3)=>{
//         console.log(data3);
//         watchlistMovies.push(data3);

        
//     })   
//     .catch(err=>alert(`here is error`,err)) 
// }

const watchlistMovies  = [];

function add(a){
        const add = document.querySelector(".add-watchlist")
        add.innerHTML=`<p>Add to Watchlist<span><i class="fa-solid fa-star"></i></span></p>`  

        watchlistMovies.push(a);

        console.log(watchlistMovies);
        add.onclick=()=> remove()
}

function remove(){

    const remove = document.querySelector(".add-watchlist")
    remove.innerHTML=`<p>Add to Watchlist<span><i class="fa-regular fa-star"></i></span></p>`   
    remove.onclick=()=> add()
}


const arr = ["tt4154796", "tt4154756", "tt1216475"];
// console.log(arr.length);

const topMovieList = document.getElementById("topMvoieList")

function topMovies(){

    for (let i = 0; i<arr.length; i++){
        const url1 = `https://www.omdbapi.com/?i=${arr[i]}&apikey=ca16ebe`;
        fetch(`${url1}`)
        .then(res1 => res1.json())
        .then((data2)=>{ 
            const topMovies1 = data2
            // console.log(topMovies1);


            const bestMovies= document.createElement("li")
            bestMovies.classList.add("bestMovies");

            
            const topMoviePoster = document.createElement("img");
            topMoviePoster.src = topMovies1.Poster;
            topMoviePoster.classList.add("top-movie-poster");
            bestMovies.appendChild(topMoviePoster);

            const topMovieDetails = document.createElement("div")
            topMovieDetails.classList.add("topMovieDeatils")
            topMovieDetails.innerHTML = `
            <h3>${topMovies1.Title}</h3>
            <p>Year: ${topMovies1.Released}</p>
            `;
            bestMovies.appendChild(topMovieDetails);
            
            topMovieList.appendChild(bestMovies);
        }) 
    .catch(err=>alert(`there is an error`,err)) 

    }
   
}

topMovies();

