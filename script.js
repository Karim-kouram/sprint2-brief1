// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

const form = document.getElementById("creature-form");

// Expressions régulières
    const regex_numero = /^#\d{3}$/;
    const regex_nom = /^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/;
    const regex_statistique = /^\d{1,3}$/;
    const regex_image = /^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
    const regex_description = /^[\s\S]{10,200}$/;

    // Récupération des éléments
    const id = document.querySelector('[name="id"]');
    const name = document.querySelector('[name="name"]');
    const type = document.querySelector('[name="type"]');
    const level = document.querySelector('[name="level"]');
    const stat = document.querySelectorAll('[name="stat"]');
    const image = document.querySelector('[name="image"]');
    const description = document.querySelector('[name="description"]');

    const errorMessage = document.querySelectorAll(".error-message");

    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;

form.addEventListener("input", function() {

    let notValide = false;

    // Validation du numéro
    if (!regex_numero.test(id.value)) {
        id.style.border = "2px solid red";
        errorMessage[0].textContent = "Numéro invalide (exemple : #001)";
        notValide = true;
    } else {
        id.style.border = "2px solid green";
        errorMessage[0].textContent = "";
    }
    // Validation du nom
    if (!regex_nom.test(name.value)) {
        name.style.border = "2px solid red";
        errorMessage[1].textContent = "nom invalide (exemple : #001)";
        notValide = true;
    } else {
        name.style.border = "2px solid green";
        errorMessage[1].textContent = "";
    }
    // Validation du type
    if (type.value === "") {
        type.style.border = "2px solid red";
        errorMessage[2].textContent = "Veuillez sélectionner un type";
        notValide = true;
    } else {
        type.style.border = "2px solid green";
        errorMessage[2].textContent = "";
    }
    // Validation du level
    if (level.value === "") {
        level.style.border = "2px solid red";
        errorMessage[3].textContent = "Veuillez saisir un level";
        notValide = true;
    } else {
        level.style.border = "2px solid green";
        errorMessage[3].textContent = "";
    }
    // Validation du statistique
    if (!regex_statistique.test(stat[0].value)) {
        stat[0].style.border = "2px solid red";
        errorMessage[4].textContent = "statistique invalide (exemple : 0 à 999)";
        notValide = true;
    } else {
        stat[0].style.border = "2px solid green";
        errorMessage[4].textContent = "";
    }
    // Validation du statistique
    if (!regex_statistique.test(stat[1].value)) {
        stat[1].style.border = "2px solid red";
        errorMessage[5].textContent = "statistique invalide (exemple : 0 à 999)";
        notValide = true;
    } else {
        stat[1].style.border = "2px solid green";
        errorMessage[5].textContent = "";
    }
    // Validation du statistique
    if (!regex_statistique.test(stat[2].value)) {
        stat[2].style.border = "2px solid red";
        errorMessage[6].textContent = "statistique invalide (exemple : 0 à 999)";
        notValide = true;
    } else {
        stat[2].style.border = "2px solid green";
        errorMessage[6].textContent = "";
    }
    // Validation du limage
    if (!regex_image.test(image.value)) {
        image.style.border = "2px solid red";
        errorMessage[7].textContent = "limage invalide (ex: https://…/image.png)";
        notValide = true;
    } else {
        image.style.border = "2px solid green";
        errorMessage[7].textContent = "";
    }
    // Validation du description
    if (!regex_description.test(description.value)) {
        description.style.border = "2px solid red";
        errorMessage[8].textContent = "description invalide (exemple: 10 à 200 caractères)";
        notValide = true;
    } else {
        description.style.border = "2px solid green";
        errorMessage[8].textContent = "";
    }

    // Activation / désactivation du bouton
    button.disabled = notValide;

});


// -------------------------------------------------------------
// 1. AFFICHAGE
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------
import { creatures } from "./data.js";

let section = document.getElementById("grid");
const AFFICHAGE = () =>{
    creatures.forEach((pokemon) => {
        section.innerHTML += `
        <article data-id="${pokemon.id}" class="card flex flex-col gap-3 rounded-card bg-white p-3 pb-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
          <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
            <img src="${pokemon.image}" alt="logo" class="h-[150px] w-[150px] text-muted">
            <span class="absolute left-3 top-2 font-mono text-sm text-muted">${pokemon.id}</span>
          </div>
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-display text-xl font-semibold">${pokemon.name}</h3>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold text-ink">${pokemon.type}</span>
          </div>
          <p class="text-sm text-muted">${pokemon.level} · Total 309</p>
          <button type="button" class="btn-outline">Ajouter à l'équipe</button>
        </article>`;
    })
}
AFFICHAGE();


// -------------------------------------------------------------
// 2. DÉTAIL
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------
let cards = document.querySelectorAll(".card");

let Section = document.getElementById("detail");
Section.innerHTML ='<div class="text-center"><p class="font-display text-xl font-extrabold">Accune pokémon selecionnè .</p></div>';
cards.forEach((card) => {
    card.addEventListener("click", function(){

        const isActive = card.classList.contains("active");

        cards.forEach(a => {
            a.classList.remove("active");
        });

        if(!isActive){
            card.classList.add("active");
        }


    let id = card.getAttribute("data-id");
    creatures.forEach((pokemon) => {
        if(pokemon.id === id){
            Section.innerHTML =`<div class="flex items-center justify-between">
            <span class="font-mono text-sm text-muted">${pokemon.id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="Annule btn-outline w-11 px-0">✕</button>
          </div>
          <div class="flex h-[155px] items-center justify-center rounded-2xl bg-brand-light">
            <img src="${pokemon.image}" alt="logo" class="h-[170px] w-[170px] text-muted">
          </div>
          <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold">${pokemon.name}</h2>
            <span class="rounded-full bg-brand-light px-3 py-1 text-sm font-bold">${pokemon.type}</span>
          </div>
          <p class="text-gray-700">${pokemon.description}.</p>
          <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">PV</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width: ${pokemon.stats.hp}%;"></span></span><span class="text-right font-mono">${pokemon.stats.hp}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Attaque</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width: ${pokemon.stats.attack}%;"></span></span><span class="text-right font-mono">${pokemon.stats.attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold">Défense</span><span class="h-3 rounded-full bg-ground"><span class="block h-3  rounded-full bg-brand" style="width: ${pokemon.stats.defence}%;"></span></span><span class="text-right font-mono">${pokemon.stats.defence}</span></div>
          </div>
          <button type="button" class="btn-primary">Ajouter à l'équipe</button>`;
        };
    });

    let btn = document.querySelector(".Annule");

    btn.addEventListener("click", function(){
        Section.innerHTML ='<div class="text-center"><p class="font-display text-xl font-extrabold">Accune pokémon selecionnè .</p></div>';
    })
});

});


// -------------------------------------------------------------
// 3. RECHERCHE
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
