const searchInput = document.getElementById('searchBox');
const button = document.getElementById('button');
const image = document.getElementById('images');
const header = document.getElementsByTagName('header')[0];
const wrapper = document.getElementById('wrapper');
// const container = document.getElementById('container');


const key = "a74a814e-7117-4598-b279-49f6effda03e";



//Fetched list of catagories with id and name
const fetchCategory = () => {
   
} 



const displayImages = (e) => {
    if(e.keyCode === 13 || e.type === 'click') { //checks if enter if pressed or click happened
        image.innerHTML = ""; //Clears the image div.
        const fileType = document.getElementsByName('fileType'); //Grabs the check boxes

        let imageType = ""; //Stores check boxes checked values
        
        fileType.forEach((item) => { //loops through file types
            if (item.checked == true) {
                imageType += `,${item.value}`;
           }
        }) 
        
        fetch(`https://api.thecatapi.com/v1/categories`)
        .then(res => res.json())
        .then(data => {
            let searchValue = searchInput.value;
                let cat =  data.find((categories) => {
                   return categories.name === searchValue;
                })
                fetch(`https://api.thecatapi.com/v1/images/search?limit=6&page=2&order=Desc&mime_types=${imageType}&category_ids=${cat.id}`)
            .then(response => response.json())
            .then(data => {
                //Creates img tags and display images
                data.map((item) => {
                    let imageTag = document.createElement('img');
                    imageTag.src = `${item.url}`;
                    image.appendChild(imageTag);  //appends the imageTag to image div
                 })
             })
            })

       

        
    }
    
   
    wrapper.style.height = '430px';  //moves search bar to top on submit
    searchInput.style.width = '500px'; //Restrict the search width on click

   

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
button.addEventListener('click', fetchCategory);
searchInput.addEventListener('focus', increaseSearchBar);
searchInput.addEventListener('blur', decreaseSearchBar);
searchInput.addEventListener('keydown', displayImages);

