let webSite = "http://127.0.0.1:5500";

// Generic POST operation implementation:
export async function postData(url = ``, data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response;
}

// example how to use postData
/*
postData("/customers/12", {customerId:12, customerName:'John Johnson'})
  .then((response) => {
    console.log(`status: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  });
*/

// Generic GET method implementation:
export async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// example how to use postData
/*
getData("/customers/12")
  .then((response) => {
    console.log(`status: ${response.status}`);
  })
  .catch((error) => {
    console.log(error);
  });
*/
