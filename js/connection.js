/**
 * Fonction qui va appeler l'API pour se connecter
 * @param username
 * @param password
 * @returns Object JSON
 */
function connection(username, password){
    // console.log(username, password)
    //Call API
    localStorage.setItem("user-key", "1111"); //Si l'utilisateur existe on ajoute la clé dans le localStorage
    return true; //Retournera l'object JSON renvoyé par le serveur et non un boolean
}

/**
 * Fonction qui va enlever la clé de l'utilisateur dans le localstorage
 */
function removeUserKey(){
    localStorage.removeItem("user-key");
}

/**
 * Fonction qui va appeler l'API pour créer un nouvel utilisateur
 * @param name
 * @param surname
 * @param login
 * @param email
 * @param password
 * @param repeat
 * @returns object JSON
 */
function createUser(name, surname, login, email, password, repeat){
    console.log(name, surname, login, email, password, repeat);
    localStorage.setItem("user-key", "1111");
    return true; //Retournera l'object JSON renvoyé par le serveur et non un boolean!
}

function passwordLost(email){
    console.log(email);
    //Appel à l'API pour retrouver le mdp
    return true;
}