const searchInput = document.getElementById('searchBox');
const button = document.getElementById('button');
const image = document.getElementById('images');
const header = document.getElementsByTagName('header')[0];
const wrapper = document.getElementById('wrapper');
const errorMessage = document.getElementById('errorMessage');
const tip = document.getElementById('tip');
// const container = document.getElementById('container');


const key = "a74a814e-7117-4598-b279-49f6effda03e";



const displayImages = (e) => {
    if(e.keyCode === 13 || e.type === 'click') { //checks if enter is pressed or click event happened
        image.innerHTML = ""; //Clears the image div before displaying new images on search.
        tip.style.display = 'none';
        errorMessage.style.display = 'none';

        const fileType = document.getElementsByName('fileType'); //Grabs the check boxes
        let imageType = ""; //Stores check boxes checked values
        
        fileType.forEach((item) => { //loops through file types i.e png,gif,jpeg
            if (item.checked == true) {
                imageType += `,${item.value}`;
           }
        }) 
        
        if (searchInput.value !== null && searchInput.value !== '') { //not blank
           
            fetch(`https://api.thecatapi.com/v1/categories`)
            .then(res => res.json())
            .then(data => {
                let defaultSearchValue = searchInput.value;
                let searchValue = defaultSearchValue.toLowerCase(); //Converts search input to lower case

                    let cat =  data.find((categories) => {
                       return categories.name === searchValue;
                    })

              
                    if (cat === undefined) { //Checks if valid search term is typed
                        errorMessage.style.display = 'block';
                    } else {
                        errorMessage.style.display = 'none';
                        fetch(`https://api.thecatapi.com/v1/images/search?limit=9&page=2&order=Desc&mime_types=${imageType}&category_ids=${cat.id}`)
                        .then(response => response.json())
                        .then(data => {
                            //Creates img tags and display images
                            data.map((item) => {
                                let imageTag = document.createElement('img');
                                imageTag.src = `${item.url}`;
                                image.appendChild(imageTag);  //appends the imageTag to image div
                                 })
                            })
                    }

                })
        } else {
            fetch(`https://api.thecatapi.com/v1/images/search?limit=9&page=2&order=Desc&mime_types=${imageType}`)
                .then(response => response.json())
                .then(data => {
                    //Creates img tags and display images
                    data.map((item) => {
                        let imageTag = document.createElement('img');
                        imageTag.src = `${item.url}`;
                        image.appendChild(imageTag);  //appends the imageTag to image div
                     })
                 })
        }
       
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
searchInput.addEventListener('focus', increaseSearchBar);
searchInput.addEventListener('blur', decreaseSearchBar);
searchInput.addEventListener('keydown', displayImages);

