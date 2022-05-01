const url ="http://127.0.0.1:8080/users";

function fetchData(){

fetch(url)
 .then(response => {
  if(!response.ok) {

    throw Error("error")
  }
  return response.json();

 })
.then(data => {
const html=data
.map(user => {
    return `
    <table style="padding:10px;">
      <thead>
        <tr>
        <th>firstName</th>
        <th>lastName</th>
        <th>Email</th> 
        </tr>
      </thead>
      <tbody>
       <tr id="content">
        <td> ${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
       </tr>
      </tbody>
      </table>
    
    `;


})
.join("");
document.querySelector("#table").insertAdjacentHTML("afterbegin",html);
})

.catch(error => {
console.log(error);
});

}



fetchData();


fetch(url).then(response=>response.json())
.then(data => console.log(data))
.catch(err=>console.error(err));






  



