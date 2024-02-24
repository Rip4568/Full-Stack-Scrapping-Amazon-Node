const mockData = [
  {
    title: "Price and other details may vary based on product size and color.",
    rating: "",
    numReviews: "",
  },
  {
    title:
      "RC Cars, Rose Remote Control Car for Girls, 2.4 GHZ Double Sided RC Stunt Car 360° Rotating Remote Control Crawler with Headlights Car Toys for 6 7 8 9 10 11 12 Girls Birthday RC Cars, Rose Remote Control Car for Girls, 2.4 GHZ Double Sided RC Stunt Car 360° Rotating Remote Control Crawler with Headlights Car Toys for 6 7 8 9 10 11 12 Girls Birthday$26.99$26.99 Typical: $29.99$29.99",
    rating: "4.3 out of 5 stars",
    numReviews: "402",
    imageURL: "https://m.media-amazon.com/images/I/812FunKVkgL._AC_UL320_.jpg",
  },
  {
    title:
      "MIEBELY Maserati Remote Control Car, Openable Door 1:12 Scale Rc Toy Car 7.4V 900mAh Licensed 12Km/h Fast Rc Cars with Led Light 2.4Ghz Model Car for Adults Boys Girls Birthday Ideas Gift (White) MIEBELY Maserati Remote Control Car, Openable Door 1:12 Scale Rc Toy Car 7.4V 900mAh Licensed 12Km/h Fast Rc Cars with Led Light 2.4Ghz Model Car for Adults Boys Girls Birthday Ideas Gift (White)$58.99$58.99",
    rating: "4.7 out of 5 stars",
    numReviews: "46",
    imageURL: "https://m.media-amazon.com/images/I/71K0pvXErqL._AC_UL320_.jpg",
  },
  {
    title: "Car Parking Multiplayer Car Parking MultiplayerNov 18, 2023",
    rating: "4.7 out of 5 stars",
    numReviews: "5",
    imageURL: "https://m.media-amazon.com/images/I/81SYuUNjwsL._AC_UL320_.png",
  },
  {
    title:
      "Happyworker Car Seat Gap Filler Universal Fit Organizer Stop Things from Dropping Under Pack of 2 (Fabric Black) Happyworker Car Seat Gap Filler Universal Fit Organizer Stop Things from Dropping Under Pack of 2 (Fabric Black)$12.99$12.99 ($6.50$6.50/Count) List: $18.99$18.99",
    rating: "4.4 out of 5 stars",
    numReviews: "971",
    imageURL: "https://m.media-amazon.com/images/I/81mOpDbMABL._AC_UL320_.jpg",
  },
];
async function fetchData(keyword) {
  try {
    const url =
      "http://localhost:3000/api/scrape?keyword=" + encodeURIComponent(keyword);
    const response = await fetch(url);
    const data = await response.json();

    var tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    data.forEach((product) => {
      var row = `<tr>
                  <td>${product.title}</td>
                  <td>${product.rating}</td>
                  <td>${product.numReviews}</td>
                  <td><img src="${product.imageURL}" alt="${product.title}" style="max-width: 100px;"></td>
                </tr>`;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    var tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";
    mockData.forEach((product) => {
      var row = `<tr>
                  <td>${product.title}</td>
                  <td>${product.rating}</td>
                  <td>${product.numReviews}</td>
                  <td><img src="${product.imageURL}" alt="${product.title}" style="max-width: 100px;"></td>
                </tr>`;
      tableBody.innerHTML += row;
    });//SE POR ACASO DER ERRO, FAÇA UM EXEMPLO QUALQUER DO ARRAY MOCKDATA
  }//o motivo do mock foi que em alguns casos ele não carregava mesmo o backend tendo
  //levantado, gerava erro do fetch e não sei o porque
}

//decide colocar esssa função pois estou acostumado a semprre criar
//uma função para o listner e depois o executador da tarfa que fara depois que foi observada
function listnerButtonFormClick() {
  const button = window.document.querySelector(".button-filter");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const keyword = window.document.querySelector("#keyword");
    fetchData(keyword.value);
  });
}

listnerButtonFormClick();