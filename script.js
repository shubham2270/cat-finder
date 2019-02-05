const searchInput = document.getElementById('searchBox');
const button = document.getElementById('button');
const image = document.getElementById('images');
const header = document.getElementsByTagName('header')[0];
const wrapper = document.getElementById('wrapper');
// const container = document.getElementById('container');


const key = "a74a814e-7117-4598-b279-49f6effda03e";




const displayImages = (e) => {
    if(e.keyCode === 13) { //checks whether the pressed key is "Enter"

    let searchTerm = searchInput.value;

    fetch(`https://api.thecatapi.com/v1/images/search?limit=3&page=2&order=Desc&mime_types=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            //Creates img tags and display images
            data.map((item) => {
                let imageTag = document.createElement('img');
                imageTag.src = `${item.url}`;
                image.appendChild(imageTag); 
            })
        })
    }
    

    //moves search bar to top on submit
    // container.style.alignContent = 'flex-start';
    wrapper.style.top = '0px';

}

//Increase the size of search bar on focus
const increaseSearchBar = () => {
        searchInput.style.width = '500px'; 
}
//Decrease the size of search bar on blur
const decreaseSearchBar = () => {
    searchInput.style.width = '300px';
}



button.addEventListener('click', displayImages);
searchInput.addEventListener('focus', increaseSearchBar);
searchInput.addEventListener('blur', decreaseSearchBar);
searchInput.addEventListener('keydown', displayImages);