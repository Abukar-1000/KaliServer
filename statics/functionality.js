
let targetMacAddresses = [];
$(async ()=> {
    // grabs users from the backend & creates a button for each target
    const users = await grabUsrs(); 
    let allUsers = document.querySelectorAll(".user");
 
    /* 
        adds an event listener for when a button is clicked
        adds the associated mac address to a list 
        removes the associted mac address if its already in the list
    */
    for (let index = 0; index < allUsers.length; ++index){
        let currentButton = allUsers[index];
        currentButton.addEventListener("click", ev => {
            let macAddress = currentButton.childNodes[1].textContent;
            let macAddressAlreadySelected = targetMacAddresses.includes(macAddress);
            if (macAddressAlreadySelected) {
                let newTargetMacAddresses = []
                for (let index = 0; index < targetMacAddresses.length; ++index){
                    if (targetMacAddresses[index] !== macAddress){
                        newTargetMacAddresses.push(targetMacAddresses[index]);
                    }
                }
                targetMacAddresses = newTargetMacAddresses;
                // removes a button style and replaces it with the opposite
                // also removes the mac address associated withe the button
                currentButton.classList.remove("btn-warning");
                currentButton.classList.add("btn-dark");
                console.log(targetMacAddresses);
            } else {
                targetMacAddresses.push(macAddress);
                currentButton.classList.remove("btn-dark")
                currentButton.classList.add("btn-warning");
                console.log(targetMacAddresses);
            }
        });
    }

    // listener for when target mac addresses are submitted
    let disconnectBtn = document.querySelector(".disconnectBtn");
    disconnectBtn.addEventListener("click", async (e) => {
        // const targets = {
        //     targetMacAddresses
        // };
        const path = "http://localhost:3000/sentTargets";
        const package = await fetch(path,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            users: targetMacAddresses,
        })
        });
    });
});

// grabs all users from db and creates buttons for each user
async function grabUsrs() {
    
    try {        
        const path = "http://localhost:3000/query";
        const result = await fetch(path,{
            method: "GET"
        });
        const parsedResult = await result.json();
        // for (rows of result.allU)

        // let targetSection = $(".targets");
        // console.log(targetSection.text());

        // create inner html content
        let targetSection = $(".targets");

        // construct the user cards
        const amtOfUsers = parsedResult.allUsers.length;
        let innerContent = "";

        for (let index = 0; index < amtOfUsers; ++index) {
            let user = parsedResult.allUsers[index];
            if (index < amtOfUsers - 1) {
                let name = user.name;
                let macAddress = user.mac;
                let button = "<button class = 'btn btn-dark btn-lg user'><span class = 'name'>" + name + "</span>" +"<span class = 'hidden macAddress'>" + macAddress + "</span>" + "</button><br>";
                innerContent += button;
            } else {
                let name = user.name;
                let macAddress = user.mac;
                let button = "<button class = 'btn btn-dark btn-lg user'><span class = 'name'>" + name + "</span>" +"<span class = 'hidden macAddress'>" + macAddress + "</span>" + "</button>";
                innerContent += button;
            }
        }
        targetSection.html(innerContent);

        // returns an array of objects representing a user
        return parsedResult.allUsers;

    } catch (err) {
        console.log(err);
    }
    
}
