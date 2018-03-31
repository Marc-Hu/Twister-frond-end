/**
 * Fonction qui va appeler l'API pour se connecter
 * @param username
 * @param password
 * @returns Object JSON
 */
function connection(username, password){
    // console.log(username, password)
    var url = "http://localhost:8080/Twister/user/login?username="+username+"&password="+password;
    var response = createRequest(url);
    if (response.hasOwnProperty('key')){
        // console.log(response);
        localStorage.setItem("user-key", response.key); //Si l'utilisateur existe on ajoute la clé dans le localStorage
        localStorage.setItem("user-username", username);
        return true; //Retournera l'object JSON renvoyé par le serveur et non un boolean
    }else{
        alert(response.message);
        return false;
    }
}

/**
 * Fonction qui va enlever la clé de l'utilisateur dans le localstorage
 */
function removeUserKey(){
    localStorage.removeItem("user-key");
    localStorage.removeItem("user-username");
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
    // console.log(name, surname, login, email, password, repeat);
    var url = "http://localhost:8080/Twister/user/create?f_name="+name+"&l_name="+surname+"&username="+login+"&password="+password;
    return createRequest(url);
}

function createRequest(url){
    var req = new XMLHttpRequest();
    var response = null;
    req.open('GET', url, false);
    req.send(null);
    if (req.status === 200) {
        // console.log("Réponse reçue:", JSON.parse(req.responseText));
        response=JSON.parse(req.responseText);
    } else {
        // console.log("Status de la réponse: %d (%s)", req.status, req.statusText, req.responseText);
        response=JSON.parse(req.statusText);
    }
    // console.log(response)
    return response;
}

function passwordLost(email){
    console.log(email);
    //Appel à l'API pour retrouver le mdp
    return true;
}

function logout(){
    var key = localStorage.getItem("user-key");
    var url = "http://localhost:8080/Twister/user/logout?key="+key;
    return createRequest(url);
}

function getProfile(){
    var username = localStorage.getItem("user-username");
    var url = "http://localhost:8080/Twister/user/profile?username="+username;
    // console.log(url);
    return createRequest(url);
}

function isLogged(){
    // console.log(!!localStorage.getItem("user-key"))
    return !!localStorage.getItem("user-key")
}