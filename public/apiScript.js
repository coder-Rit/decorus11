 

let flag_getImage = false;
let flag_getCrousalInfo = false;
let flag_getAboutInfo = false;
let flag_getServiceInfo = false;
let flag_getWorkInfo = false;
let flag_getReviewsInfo = false;
let flag_getBrandInfo = false;



async function getCrousalInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getCarousel"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      console.log("no api data");
      return;
    }
    flag_getCrousalInfo = true;

    for (let i = 0; i < 3; i++) {
      const info = data.data[0].data[i];
      document.getElementById(`crousal_img_${i + 1}`).src = info.coursalUrl;
      document.getElementById(`crousal_title_${i + 1}`).innerText = info.title;
      document.getElementById(`crousal_dicript_${i + 1}`).innerText =
        info.discript;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getCrousalInfo();

async function getAboutInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getAboutSection"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data.data) {
      console.log("no api data");
      return;
    }
    flag_getAboutInfo = true;

    document.getElementById("about_img").src = data.data[0].aboutUrl;
    document.getElementById("about_title").innerText = data.data[0].title;
    document.getElementById("discript_title").innerText = data.data[0].discript;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getAboutInfo();

async function getServiceInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getOurService"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      console.log("no api data");
      return;
    }
    flag_getServiceInfo = true;

    for (let i = 0; i < 7; i++) {
      const info = data.data[0].data[i];
      document.getElementById(`service_img_${i + 1}`).src = info.serviceUrl;
      document.getElementById(`serviceName_${i + 1}`).innerText = info.title;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getServiceInfo();

async function getWorkInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getOurWork"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      console.log("no api data");
      return;
    }
    flag_getWorkInfo = true;

    const info = data.data[0];
    document.getElementById(`work_title`).innerText = info.workTitle;

    let htmlelems = "";

    console.log();

    for (let i = 0; i < data.data[0].imageUrls.length; i++) {
      const info = data.data[0].imageUrls[i];
      htmlelems += `
        <div class="imageslide1">
        <img
          src=${info.workUrl}
          alt="">
      </div>
        `;
    }
    document.getElementById(`flotingImage`).innerHTML = htmlelems;
    document.getElementById(`wrap2`).innerHTML = htmlelems;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getWorkInfo();

async function getReviewsInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getReviews"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      console.log("no api data");
      return;
    }

    flag_getReviewsInfo = true;
console.log(data.data);
    document.getElementById(`reviews_title`).innerText = data.data[0].title;
    document.getElementById(`reviews_discript`).innerText = data.data[0].discript;

    for (let i = 0; i < data.data[0].data.length; i++) {
      const info = data.data[0].data[i];
      document.getElementById(`reviews_profile_img_${i + 1}`).src =
        info.profileImage;
      document.getElementById(`reviews_profile_name_${i + 1}`).innerText =
        info.title;
      document.getElementById(`reviews_profile_thought_${i + 1}`).innerText =
        info.discript;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getReviewsInfo();

async function getBrandInfo() {
  try {
    const response = await fetch(
      "https://decours-dashboard-server.onrender.com/api/v1/getBrands"
    ); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data) {
      console.log("no api data");
      return;
    }
    flag_getBrandInfo = true;

    for (let i = 0; i < 6; i++) {
      const info = data.data[0].brandUrls[i];
      document.getElementById(`brand_img_${i + 1}`).src = info.brandUrl;
    }
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
}

getBrandInfo();


 
