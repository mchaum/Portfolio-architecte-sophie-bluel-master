// Création d'une fonction login qui récupère les données de connexion, les envoie au serveur et redirige l'utilisateur s'il peut se connecter ou lui indique un message d'erreur //

async function login() {

    // Déclaration des variables //
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = {
        email: email,
        password: password,
    };

    // Fonction //
    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.ok) {
                res.json()
                    .then((data) => {
                        if (localStorage.user = data.token)
                            // Sauvegarde du token dans le session storage & redirection //
                            localStorage.setItem("token", data.token);
                            window.location.href = ("./index.html");
                    })
            } else {
                document.querySelector(".error").innerHTML = "L'identifiant ou le mot de passe est incorrect";
            }
        });
}

// Ajout d'un évènement au clic pour la connexion //

const btnLogin = document.querySelector(".submit");

btnLogin.addEventListener("click", (i) => {
    i.preventDefault();
    login();
});