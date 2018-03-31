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
    localStorage.removeItem("user_id");
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

/**
 * Fonction qui va faire l'appel à l'API
 * @param url Url ou on veut faire l'appel
 * @returns {any}
 */
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

/**
 * Fonction va va déconnecter l'utilisateur en appelant l'API concerné
 * @returns {any}
 */
function logout(){
    var key = localStorage.getItem("user-key");
    var url = "http://localhost:8080/Twister/user/logout?key="+key;
    return createRequest(url);
}

/**
 * Fonction qui va récupérer les données du profil de l'utilisateur connecté
 * @returns {any}
 */
function getProfile(){
    var username = localStorage.getItem("user-username");
    var url = "http://localhost:8080/Twister/user/profile?username="+username;
    console.log(url);
    return createRequest(url);
}

/**
 * Fonction qui va récupérer un profil selon son username
 * @param username
 * @returns {any}
 */
function getProfileByUsername(username){
    var url = "http://localhost:8080/Twister/user/profile?username="+username;
    return createRequest(url);
}

/**
 * Fonction qui va renvoyer si il y a une personne qui est actuellement connecté ou non
 * @returns {boolean}
 */
function isLogged(){
    console.log(localStorage.getItem("user-key"))
    return !!localStorage.getItem("user-key")
}

/**
 * Fonction qui va récupérer la liste des users selon un nom précis
 * @param username
 * @returns {any}
 */
function getUserList(username){
    var url = "http://localhost:8080/Twister/user/list?username="+username;
    return createRequest(url);
}

/**
 * Fonction qui va permettre à l'utilisateur connecté de follow une autre personne
 * @param from_key key de la personne connecté
 * @param to_id id de la personne à follow
 * @returns {any}
 */
function follow(from_key, to_id){
    var url = "http://localhost:8080/Twister/user/follow?key="+from_key+"&followedId="+to_id;
    return createRequest(url);
}

/**
 * Fonction qui va unfollow une personne qui a été follow
 * @param from_key key de la personne connecté
 * @param to_id id de la personne à unfollow
 * @returns {any}
 */
function unfollow(from_key, to_id){
    var url = "http://localhost:8080/Twister/user/unfollow?key="+from_key+"&followedId="+to_id;
    return createRequest(url);
}

/**
 * Fonction qui permet de récupérer la liste des personne actuellement follow par la personne connecté
 * @returns {HTMLElement}
 */
function getListFollowed(){
    var url = "http://localhost:8080/Twister/user/listFollowed?id="+localStorage.getItem("user_id");
    return createRequest(url).list;
}