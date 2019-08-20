const btn1 = "Book a table";
const btn2 = "View Bookings"

let htmlString ="";

htmlString += `<button type="button" class="btn btn-primary" id="btn1">${btn1}</button>`

htmlString += `<button type="button" class="btn btn-success" id="btn2">${btn2}</button>`

document.getElementById("root").innerHTML += htmlString;



document.addEventListener("click", function(e){
    if(e.target && e.target.id == "btn2"){
        axios.all([
            axios.get('/book'),
            axios.get('/available')
        ])
        .then(axios.spread((bookRes, availableRes) => {
            console.log(bookRes);
            console.log(availableRes);
            let lNames= bookRes.data
            console.log(lNames)
            for(let i=0; i<lNames.length; i++){
             document.getElementById("root").innerHTML += `
             <div class="card" style="width: 18rem;">
             <div class="card-body">
               <h5 class="card-title">Last Name: ${lNames[i].lastName}</h5>
               <p class="card-text">Number of Guests in Party: ${lNames[i].numInParty}</p>
             </div>
           </div>`
            }
            let available = availableRes.data;
            const count = available.filter(function(e)
            {return e.available;}).length
            console.log(count);
            document.getElementById("root").innerHTML += `
            <div class="alert alert-success" role="alert">
             Tables available: ${count}</div>`
        }));
    }       
})
document.addEventListener("click", function(e){
    if(e.target && e.target.id == "btn1"){
    document.getElementById('root').innerHTML += ` 
    <div id="reservation" class="table">
    <h1>Table Reservation</h1>
    <form>
        
        First Name <br>
        <input type="text" name="first name" id="firstname"><br><br>
        Last Name<br>
        <input type="text" name="last name" id="lastname"><br><br>
        Number in Party<br>
        <input type="text" name="number in party" id="number"><br><br>
        <button type="submit" value="Submit" id="button">Submit</button><br><br>
    </form>
</div>`
    }else if(e.target && e.target.id == "button"){

    const headers = {
	    headers: {
	        "Content-Type": "application/json"
	    }
    }
 
  let firstName = document.getElementById('firstname').value;
  let lastName = document.getElementById('lastname').value;
  let numInParty = document.getElementById('number').value;

  let guest = {
     
    firstName: firstName,
    lastName: lastName,
    numInParty: numInParty
  }

  axios.post('/book', JSON.stringify(guest), headers)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)

  });
    
}
}); 

