const blog_container = document.querySelector(".blogarea");
const comment_container = document.querySelector(".commentarea");
const like_container = document.querySelector(".likearea");
const ac = document.querySelector(".addcomment");

var blog;
var comment;
var like;
var flag = 0;

const renderDetails = async () => {
 
  var id = 2;
  const res = await fetch("http://localhost:3000/blogs/" + id);

  blog = await res.json();

  console.log(blog);

  const template = `
  <div class="d_blog">
  <div>Blog Author:${blog.username}</div>
  <div>Blog Title:${blog.blogtitle}</div>
  <div>Blog Category:${blog.blogcategory}</div>
  <div><img src="${blog.blogimg}"></div>
  <div>${blog.blogcontents}</div>
  </div>
   
    `;

  blog_container.innerHTML = template;


  if (sessionStorage.getItem(`blog-${blog.id}`) == 1) {
    likeBtn.style.visibility = "hidden";
  }

  const res2 = await fetch(`http://localhost:3000/comments?blogid=${blog.id}`);
  comment = await res2.json();

  var template1 = "";
  comment.forEach((element) => {
    template1 += `
   
       <div class="d_comment">
        <div>Commented by:${element.commentby}</div>
        <div>Comment:${element.commentcontent}</div>
        </div>
         
          `;
  });

  var d = document.createElement("div");
  d.innerHTML = template1;
  comment_container.append(d);

  const res3 = await fetch(`http://localhost:3000/likes?blogid=${blog.id}`);
  like = await res3.json();
  // debugger
  console.log(like);

  var inc = 0;
  var template2 = "";
  like.forEach((element) => {
    element.likedby.forEach((likeby) => {
      template2 += `
       <li>${likeby}</li> 
         `;
      inc++;
    });
  });

  let template3 = `<div class="d_like">
  <div class="like_count">likes:${inc}</div>

  <div class="like_by">likeby:${template2}</div>

  
  </div>`;

  var d2 = document.createElement("div");
  d2.innerHTML = template3;
  like_container.append(d2);
};

const addlike = async (e) => {
  e.preventDefault();

  flag = 1;

  sessionStorage.setItem(`blog-${blog.id}`, flag);

  var myLike = [];

  like.forEach((element) => {
    element.likedby.forEach((likeby) => {
      myLike.push(likeby);
    });
  });

  myLike.push("user5");

  console.log(myLike);
  console.log("ac:" + like);

  const doc3 = {
    blogid: blog.id,
    likedby: myLike,
  };

  console.log(doc3);
  await fetch("http://localhost:3000/likes/" + like[0].id, {
    method: "DELETE",
  });
  // debugger;
  await fetch(`http://localhost:3000/likes`, {
    method: "POST",
    body: JSON.stringify(doc3),
    headers: { "Content-Type": "application/json" },
  });

  //

  // await fetch(`http://localhost:3000/likes`, {

  // });
};

const addcomment = async (e) => {
  e.preventDefault();

  const doc = {
    blogid: blog.id,
    commentby: "user111111",
    commentcontent: document.querySelector("textarea").value,
  };

  await fetch("http://localhost:3000/comments", {
    method: "POST",
    body: JSON.stringify(doc),
    headers: { "Content-Type": "application/json" },
  });
};

window.addEventListener("DOMContentLoaded", () => renderDetails());
var adtodbBtn = document.querySelector("#addc");
adtodbBtn.addEventListener("click", addcomment);

var likeBtn = document.querySelector("#likeme");
likeBtn.addEventListener("click", addlike);
