// const id = new URLSearchParams(window.location.search).get("id");
const id = 1;
console.log(id);
const profile = document.querySelector(".profile");

const blogcontainer = document.querySelector(".blogs");

// const deleteBtn = document.querySelector(".dBtn");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/users/" + id);

  const user = await res.json();

  console.log(user);

  const template = `
    <h2>${user.username}</h2>
    <p>${user.useremail}</p>
    `;

  profile.innerHTML = template;

  const res2 = await fetch(
    "http://localhost:3000/blogs?username=" + user.username
  );

  const blog11 = await res2.json();

  console.log(blog11);
  var template2="";
  blog11.forEach((element) => {
    template2 += `
    <h2>${element.blogtitle}</h2>
    <img src="${element.blogimg}">
 
    <p>${element.blogcontents}</p>
    <p>${element.blogcategory}</p>
    <button onclick=deleteblog(${element.id})>delete</button>
    `;
  });

  blogcontainer.innerHTML = template2;
};

async function deleteblog(id){
  const res = await fetch("http://localhost:3000/blogs/" + id, {
        method: "DELETE",
      });
}

// deleteBtn.addEventListener("click", async (e) => {
//   const res = await fetch("http://localhost:3000/blogs/" + blogs.id, {
//     method: "DELETE",
//   });
//   //   window.location.replace("/index.html");
// });

window.addEventListener("DOMContentLoaded", () => renderDetails());
