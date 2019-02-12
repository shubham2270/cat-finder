const searchInput = document.getElementById('searchBox');
const button = document.getElementById('button');
const image = document.getElementById('images');
const header = document.getElementsByTagName('header')[0];
const wrapper = document.getElementById('wrapper');
const errorMessage = document.getElementById('errorMessage');
const tip = document.getElementById('tip');
const select = document.getElementById('select');
// const container = document.getElementById('container');

const key = "a74a814e-7117-4598-b279-49f6effda03e";

//Screen for mobile devises
let mobile = window.matchMedia("(max-width: 600px)")

//Populate SELECT drop down with fetched data
fetch(`https://api.thecatapi.com/v1/breeds`)
    .then(res => res.json())
    .then((data) => {
        data.forEach((item) => {
            let option = document.createElement('option');
            let breed = document.createTextNode(item.name);
            option.appendChild(breed);
            option.setAttribute('value', item.name);
            select.insertBefore(option, select.lastChild);
        })
    })


//Displays pics on enter or click
const displayImages = (e) => {
    if(e.keyCode === 13 || e.type === 'click') { //checks if enter is pressed or click event happened

        image.innerHTML = ""; //Clears the image div before displaying new images on search.
        tip.style.display = 'none'; //Hide text message
        errorMessage.style.display = 'none'; //Hide error text message

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
        } else { //if search field is left blank and search is clicked then display random images
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
    
    if (mobile.matches) {
        searchInput.style.width = '200px'; //Restrict the search width on click
        wrapper.style.height = '500px';  //moves search bar to top on submit
    } else {
        searchInput.style.width = '500px';
        wrapper.style.height = '430px'; 
    }
}



//Increase the size of search bar on focus
const increaseSearchBar = () => {
    if (mobile.matches) {
        searchInput.style.width = '230px'; 
    } else {
        searchInput.style.width = '500px'; 
    }
        
}
//Decrease the size of search bar on blur
const decreaseSearchBar = () => {
    if (mobile.matches) {
        searchInput.style.width = '200px'; 
    } else {
        searchInput.style.width = '300px'; 
    }
}



button.addEventListener('click', displayImages);
searchInput.addEventListener('focus', increaseSearchBar);
searchInput.addEventListener('blur', decreaseSearchBar);
searchInput.addEventListener('keydown', displayImages);

