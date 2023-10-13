

let places;

    if(localStorage.getItem("places")===null)
    {
        localStorage.setItem("places","[]");
    }
    else
    {
    places = JSON.parse(localStorage.getItem("places"));

    }


    // CREATE CARDS


document.getElementById("create").addEventListener("click",()=>{

    let title = document.getElementById("title").value;
   
   let activities =  document.getElementById("activities").value;
 
   let imageURL=  document.getElementById("imageURL").value;


     if(validateform(title,activities,imageURL)===true)
     {
 
 
         let place = {
             title : title,
             activities : activities,
             imageURL : imageURL
           }
           places.push(place);  
 
           localStorage.setItem("places",JSON.stringify(places));
           
         displayFrames()


     }
            
 
     document.getElementById("title").value="";
     document.getElementById("activities").value="";
     document.getElementById("imageURL").value="";
    
         
         })


                 
        function checkHttpUrl(string) {
            let givenURL;
            try {
                givenURL = new URL(string);
            } catch (error) {
               
              return false;  
            }
            return givenURL.protocol === "http:" || givenURL.protocol === "https:";
          }


    function validateform(title,activities,imageURL) 

    {
        let errors = [];
    
    if(title.length===0)
    {
        errors.push("Can't Be Empty");
        document.getElementById("title_err").innerText="Can't Be Empty";
    }
    else{
        document.getElementById("title_err").innerText="";
    }
    if(activities.length===0)
    {
        errors.push("Can't Be Empty");
        document.getElementById("activities_err").innerText="Can't Be Empty";
    }
    else{
        document.getElementById("activities_err").innerText="";
    }
    if(imageURL.length!==0)
    {
        if(checkHttpUrl(imageURL)===false)
        {
            errors.push("Not A Valid URL")
            document.getElementById("url_err").innerText="Not a Valid URL";
        }
        else{
            document.getElementById("url_err").innerText="";
        }
    }
    else
    {
        errors.push("Can't Be Empty");
        document.getElementById("url_err").innerText="Can't Be Empty";
    
    }
    
    if(errors.length===0)
    {
        return true;
    }
    
        return false;
    
     }



     // SEE CARDS

function displayFrames()
{

    if(places.length!==0)
    {

        document.getElementsByClassName('main')[0].innerHTML = "";

        places.forEach((place,index)=>{
      
            generateFrame(place,index);
        
        })

    }
    else{
        document.getElementsByClassName('main')[0].innerHTML = "NO DATA AVAILABLE";
    }
  

}


  


let updateindex =null;

function update()
{
 
    let title = document.getElementById("title_up").value;
    let activities =  document.getElementById("activities_up").value;
    let imageURL=  document.getElementById("imageURL_up").value;

   if (validateform(title,activities,imageURL)===true)

    {
    let updatedplace = {
        title : title,
        activities : activities,
        imageURL : imageURL
      }

      places[updateindex] = updatedplace;

      localStorage.setItem("places",JSON.stringify(places));

      document.getElementById("update_form").style.display="none";
      
    displayFrames()
}
}

document.getElementById("Update").addEventListener("click",update);
     




   // CLOSING LOGIC
   document.getElementById("close").onclick=function(){
    document.getElementById("update_form").style.display="none";

}

 document.getElementById("eye_close").onclick=function(){
    document.getElementById("eye_overlay").style.display="none";

 }



// displayFrames();

function generateFrame(place,index){

let card = document.createElement('div');
card.classList.add('card');

let cardImg = document.createElement('div');
cardImg.classList.add('card-img');

let image = document.createElement('img');
image.src= place.imageURL;

cardImg.appendChild(image);
card.appendChild(cardImg);

let cardDetails = document.createElement('div');
cardDetails.classList.add('card-details');

let actions = document.createElement('div');
actions.classList.add('actions');

let title = document.createElement('h1');
title.innerText = place.title;

let activities = document.createElement('p');
activities.innerText = place.activities;

let explore = document.createElement('i');
explore.classList.add("fa-solid");
explore.classList.add("fa-eye");
explore.classList.add("ex");
explore.addEventListener ("click",()=>{

    document.getElementById("eye_overlay").style.display="flex";
   
    document.getElementById("eye_title").innerText=place.title;

    document.getElementById("eye_act").innerText=place.activities;
    
    document.getElementById("eye_img").src=place.imageURL;
    

});

let editB = document.createElement("i");
editB.classList.add("fa-solid");
editB.classList.add("fa-pen-to-square");
editB.classList.add("ed");

editB.addEventListener("click",()=>{

   document.getElementById("update_form").style.display="flex";
   document.getElementById("title_up").value = place.title;
   document.getElementById("activities_up").value = place.activities;
   document.getElementById("imageURL_up").value = place.imageURL;
  

        updateindex=index;

});

let deleteB = document.createElement("i");
deleteB.classList.add("fa-regular");
deleteB.classList.add("fa-trash-can");
deleteB.classList.add("db");

deleteB.addEventListener("click",()=>{

    places.splice(index, 1);

    localStorage.setItem("places",JSON.stringify(places));



    displayFrames();

})




actions.append(explore,editB,deleteB);
cardDetails.appendChild(title);
cardDetails.appendChild(activities);
cardDetails.appendChild(actions);
card.appendChild(cardDetails);



document.getElementsByClassName('main')[0].appendChild(card)

}

// Initail Call
displayFrames();