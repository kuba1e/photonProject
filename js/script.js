const auth = '563492ad6f91700001000001410fe8c8392e4b698cbfbc493777ceb7';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

const updateInput = (e)=>{
    searchValue = e.target.value;
}

const generatePictures = (data)=>{
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `<img src=${photo.src.large}>
        <div class="info-container">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original} download >Download</a>
        </div>
        `;
        gallery.appendChild(galleryImg);
        console.log(photo.src.original);
    });
}

async function curatedPhotos(){
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data)
}

async function searchPhotos(search){
    clear()
    fetchLink=`https://api.pexels.com/v1/search?query=${search}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    generatePictures(data)
}


async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    })

    const data = await dataFetch.json();
    return data;

}

const clear= ()=>{
    gallery.innerHTML='';
    searchInput.value='';
}

async function openMore(){
    page++;
    if(currentSearch){
        fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
    } else{
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data)
}

//adding event listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})



more.addEventListener('click', openMore)




curatedPhotos()