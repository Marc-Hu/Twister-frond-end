
function connection(username, password){
    // console.log(username, password)
    //Call API
    localStorage.setItem("user-key", "1111"); //Si l'utilisateur existe on ajoute la clé dans le localStorage
    return true;
}

function removeUserKey(){
    localStorage.removeItem("user-key");
}

function createUser(name, surname, login, email, password, repeat){
    console.log(name, surname, login, email, password, repeat);
    localStorage.setItem("user-key", "1111");
    return true; //Retournera le message renvoyé par le server et non un boolean!
}