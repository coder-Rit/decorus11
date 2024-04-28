const API_URI = "https://blog-dashbord-0777.onrender.com";

function renderFirst10Words(str, stock) {
  // Split the string into an array of words
  const words = str.split(/\s+/); // This regex splits by any whitespace characters

  // Take the first 10 words and join them back into a string
  const first10Words = words.slice(0, stock).join(" ") + "...";

  return first10Words;
}

async function getBestStories() {
  const BestStories = document.getElementById("BestStories");

  let temp = "";

  try {
    let response = await fetch(`${API_URI}/api/v1/getRocomandBlogs`, {
      method: "GET",
    });

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      let cateEle = "";

      for (let j = 0; j < element.category.length; j++) {
        const cate = element.category[j];
        cateEle += `
            <li>
            <a href="#" class="card-tag">${cate}</a>
          </li>
            `;
      }

      temp += `


      <li class="scrollbar-item">
      <div class="blog-card">

        <figure class="card-banner img-holder" style="--width: 500; --height: 600;">
          <img src="${element.imgUrl}" width="500" height="600" loading="lazy"
            alt="New technology is not good or evil in and of itself" class="img-cover">

          
        </figure>

        <div class="card-content">

          <ul class="card-meta-list">
          ${cateEle}
            
          </ul>

          <h3 class="h4">
            <a href="#" class="card-title hover:underline">
            ${renderFirst10Words(element.Title, 10)}
            </a>
          </h3>

          <p class="card-text">
          ${renderFirst10Words(element.paragraph, 20)}
          </p>

        </div>

      </div>
    </li> 



    
        
            `;
    }

    BestStories.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}

getBestStories();

async function getAllBlogs() {
  const AllBlogs = document.getElementById("AllBlogs");

  let temp = "";

  try {
    let response = await fetch(`${API_URI}/api/v1/getBlogs`, {
      method: "GET",
    });

    if (response.ok === false) {
      console.log("error");
      return;
    }

    const data = await response.json();

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i];
      let cateEle = "";

      for (let j = 0; j < element.category.length; j++) {
        const cate = element.category[j];
        cateEle += `
            <li>
            <a href="#" class="card-tag">${cate}</a>
          </li>
            `;
      }

      temp += `
        <li>
        <div class="blog-card">

          <figure class="card-banner img-holder" style="--width: 550; --height: 660;">
            <img src="${element.imgUrl}" width="550" height="660" loading="lazy"
              alt="Creating is a privilege but it’s also a gift" class="img-cover">

            
          </figure>

          <div class="card-content">

            <ul class="card-meta-list">

               
        ${cateEle}
             

            </ul>

            <h3 class="h4">
              <a href="#" class="card-title hover:underline">
                ${renderFirst10Words(element.Title, 10)}
              </a>
            </h3>

            <p class="card-text">
               ${renderFirst10Words(element.paragraph, 20)}
            </p>

          </div>

        </div>
      </li>
            `;
    }

    AllBlogs.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}

getAllBlogs();


async function getRecommoned() {
    const Recommended = document.getElementById("Recommended");
  
    let temp = "";
  
    try {
      let response = await fetch(`${API_URI}/api/v1/getRocomandBlogs`, {
        method: "GET",
      });
  
      if (response.ok === false) {
        console.log("error");
        return;
      }
  
      const data = await response.json();
  
      for (let i = 0; i < data.data.length; i++) {
        const element = data.data[i]; 
  
        temp += `
        <li>
        <div class="blog-card">

          <figure class="card-banner img-holder" style="--width: 300; --height: 360;">
            <img src="${element.imgUrl}" width="300" height="360" loading="lazy"
              alt=" ${renderFirst10Words(element.Title, 10)}" class="img-cover"> 
            
          </figure>

          <div class="card-content">

            <h3 class="h5">
              <a href="#" class="card-title hover:underline">
              ${renderFirst10Words(element.Title, 10)}
              </a>
            </h3>

          </div>

        </div>
      </li>
          
              `;
      }
  
      Recommended.innerHTML = temp;
    } catch (error) {
      console.log(error);
    }
  }
  
  getRecommoned();



  async function getImageUrl() {
    try {
      const response = await fetch(
        "https://decours-dashboard-server-sf8t.onrender.com/api/v1/getLogo"
      ); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.data) {
        console.log("no api data");
        return;
      }
      flag_getImage = true;
       if (!data.data) {
        console.log("no api data");
        return;
      }
  
      document.getElementById("logoimage").src = data.data[0].logoUrl;
      //   const imageUrl = data.url; // Assuming the API response has a 'url' field with the image URL
      //   return imageUrl;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  }
  
  getImageUrl();