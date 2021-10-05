const firebaseConfig = {
  apiKey: "AIzaSyAGPyf_yzRb6FIsNjPG8E6CCnLfGdiLm4s",
  authDomain: "skill-rating-app.firebaseapp.com",
  projectId: "skill-rating-app",
  storageBucket: "skill-rating-app.appspot.com",
  messagingSenderId: "330245032491",
  appId: "1:330245032491:web:06ef5c2fb359cdcd32386e",
  measurementId: "G-NQN26FRHQ0",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

userCheck();

function userCheck() {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // homeCards();
      window.location.href = "sign-in.html";
    }
    // else{
    // }
  });
}

function homeCards() {
  let arr = [];
  let result = [];
  let c = [];

  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arr.push(doc.data().name);
      });
      console.log(arr);
      array_elements = arr;
      array_elements.sort();

      var current = null;
      var count = 0;

      for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
          if (count > 0) {
            console.log(current + " => " + count + " times");
            c.push(count);
          }
          current = array_elements[i];
          result.push(current);
          count = 1;
        } else {
          count++;
        }
      }
      if (count > 0) {
        console.log(current + " comes => " + count + " times");
        c.push(count);
      }

      for (let j = 0; j < result.length; j++) {
        // console.log(result);
        let row = document.getElementById("row");

        let div = document.createElement("div");
        div.className = "col-md-4";

        let card = document.createElement("div");
        card.className = "card";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let cardTitle = document.createElement("h3");
        cardTitle.className = "card-title";

        let a = document.createElement("a");
        a.href = "service.html";
        a.value = result[j];
        a.innerHTML = result[j];
        a.addEventListener("click", function () {
          valueGet(a.value);
        });

        let cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = c[j];

        cardTitle.appendChild(a);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        div.appendChild(card);
        row.appendChild(div);
      }
    });
  console.log(c);

  // console.log(result);
}

function valueGet(id) {
  console.log(id);
  let ls = localStorage.setItem("serviceName", JSON.stringify(id));
}

// function cards(){
//   let row = document.getElementById("row");

//   let div = document.createElement("div");
//   div.className = "col-md-4"

//   let card = document.createElement('div');
//   card.className = "card"

//   let cardBody = document.createElement('div');
//   cardBody.className = "card-body"

//   let cardTitle = document.createElement('h3');
//   cardTitle.className = "card-title";

//   let a = document.createElement('a');
//   a.href = "#"
//   a.innerHTML = "SKILL NAME HERE"

//   let cardText = document.createElement('p');
//   cardText.className = "card-text";
//   cardText.innerHTML = "Number Of Users";

//   cardTitle.appendChild(a);
//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(cardText);
//     card.appendChild(cardBody);
//     div.appendChild(card)
//     row.appendChild(div);

//     // console.log(row)

// }
function add() {
  // var urlImage;
  let input = document.getElementById("skill").value;
  let fileUpload = document.getElementById("file").files[0];

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (input != "" && fileUpload) {
        // let path = storage.ref();
        let storageRef = firebase.storage().ref("images/" + fileUpload.name);

        // console.log(fileUpload)

        storageRef.put(fileUpload).then(function () {
          storageRef.getDownloadURL().then(function (url) {
            let urlImage = url;

            var id = user.uid;
            db.collection("services")
              .get()
              .then((querySnapshot) => {
                // querySnapshot.forEach((doc) => {
                // console.log(doc.data().userid);
                console.log(querySnapshot);
                let data = querySnapshot.docs;
                for (let i = 0; i < data.length; i++) {
                  console.log(data[i].data().name);
                  if (id == data[i].data().userid) {
                    // console.log(data.userid);
                    let name = data[i].data().name;

                    // console.log(name);
                    if (input == name) {
                      // alert(name + " already added !");
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Already Added!",
                      });
                      return false;
                    }
                    // return false;
                  }
                }

                db.collection("services").add({
                  name: input,
                  rating: [],
                  userid: id,
                  imageUrl: urlImage,
                });
                // alert("Added " + input);
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Your work has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(redirect, 4000);

                // console.log(data);
              });
          });
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Input must not be empty!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    } else {
      window.location.href = "sign-in.html";
    }
  });
  // console.log(input);
}

function rating() {
  let card = document.getElementById("cards");

  let star1 = document.createElement("button");
  star1.innerHTML = "1";
  star1.value = "1";
  star1.onclick = this;

  let star2 = document.createElement("button");
  star2.innerHTML = "2";
  star2.value = "2";

  let star3 = document.createElement("button");
  star3.innerHTML = "3";
  star3.value = "3";

  let star4 = document.createElement("button");
  star4.innerHTML = "4";
  star4.value = "4";

  let star5 = document.createElement("button");
  star5.innerHTML = "5";
  star5.value = "5";

  card.appendChild(star1);
  card.appendChild(star2);
  card.appendChild(star3);
  card.appendChild(star4);
  card.appendChild(star5);
  console.log(star1.value);
  console.log(star2.value);
  console.log(star3.value);
  console.log(star4.value);
  console.log(star5.value);
}

function service() {
  // let col = document.getElementById("cards");
  var user_name;
  // let userNameCard;
  let ls = JSON.parse(localStorage.getItem("serviceName"));

  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user.uid);
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((res) => {
        user_name = res.data().username;
      });
  });

  db.collection("services")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (ls == doc.data().name) {
          console.log(doc.data().userid)

          db.collection("users")
          .doc(doc.data().userid)
          .get()
          .then((res) => {
           let userNameCard = res.data().username;
            // console.log(res.data())
         
    

          let col = document.createElement("div");
          col.className = "col-md-3";

          let row = document.getElementById("row");
          console.log(doc.data().imageUrl);

          let cards = document.createElement("card");
          let imgCard = document.createElement("img");
          let card_body = document.createElement("card-body");
          let card_title = document.createElement("card-title");
          let a = document.createElement("a");
          a.href = "user-rating.html";
          a.value = doc.id;
          a.addEventListener("click", function () {
            localStorage.setItem("serviceId", JSON.stringify(a.value));
          });

          // firebase.database().ref('images/').on('value',function(querySnapshot){
          //   // imgCard.src = querySnapshot.val().Link;
          // })
          imgCard.src = doc.data().imageUrl;
          let card_text = document.createElement("p");
          imgCard.className = "card-img-top";
          cards.className = "card";
          card_text.className = "card-text";
          card_title.className = "card-title";
          card_body.className = "card-body";

          let input = document.createElement("input");
          let btn = document.createElement("button");

          btn.innerHTML = "RATE";
          btn.className = "btn-rate";

          input.type = "number";
          input.className = "input-rate";
          input.id = "inputRate";
          input.min = "1";
          input.max = "5";

          a.innerHTML = doc.data().name;
          card_text.innerHTML = userNameCard;
          firebase.auth().onAuthStateChanged((user) => {
            if (user.uid == doc.data().userid) {
              console.log(doc.data().userid);
              btn.style.display = "none";
              input.type = "text";
              input.value = "Your Skill";
              input.disabled = true;
            }
          });

          card_title.appendChild(a);
          card_body.appendChild(card_text);
          card_body.appendChild(card_title);
          card_body.appendChild(input);
          card_body.appendChild(btn);

          let arr = [];

          btn.addEventListener("click", function () {
            let rate = input.value;
            console.log(rate);

            console.log(doc.id);

            if (rate && rate <= 5) {
              console.log("added");

              let id = doc.id;

              let stars = rate;
              let name = user_name;
              let rates = doc.data().rating;
              let obj = {
                stars,
                name,
              };

              arr.push(obj);

              if (!doc.data().rating.length) {
                db.collection("services").doc(id).update({
                  rating: arr,
                });
              } else {
                let conc = rates.concat(arr);
                db.collection("services").doc(id).update({
                  rating: conc,
                });
                console.log(conc);
              }
              // console.log(doc.data());
            } else {
              alert("Please add rating and equals to 5");
              return false;
            }
          });

          cards.appendChild(imgCard);
          cards.appendChild(card_body);
          col.appendChild(cards);
          row.appendChild(col);
        });
        }
      });
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "sign-in.html";
    })
    .catch((error) => {
      console.log("Error");
    });
}

function userRating() {
  let get = JSON.parse(localStorage.getItem("serviceId"));
  let row = document.getElementById("row");
  if (get) {
    db.collection("services")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let ratingData = doc.data().rating;

          if (doc.id == get) {
            for (let i = 0; i < ratingData.length; i++) {
              let col = document.createElement("div");
              col.className = "col-md-6";

              let p = document.createElement("p");
              p.innerHTML =
                ratingData[i].name +
                " rated : " +
                ratingData[i].stars +
                "  Stars";

              // p.innerHTML = ratingData[i];
              // col.appendChild(p);

              console.log(ratingData[i]);
              col.appendChild(p);
              row.appendChild(col);
            }

            // col.appendChild(row);

            // console.log(doc.data().rating);
          }
        });
      });
  }
}

function redirect() {
  window.location.href = "home.html";
}

// service();
