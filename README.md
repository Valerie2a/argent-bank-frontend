# Argent Bank - Frontend

Ce projet a été réalisé dans le cadre du parcours **Intégrateur Web** chez OpenClassrooms.  
Ce dépôt contient le code source de l’interface utilisateur de l’application bancaire **Argent Bank**, développée avec **React** et **Redux**.

---

## Contexte

Vous venez d’intégrer **Argent Bank** comme développeur front-end.  
Argent Bank est une banque en ligne souhaitant se démarquer grâce à une application web moderne, sécurisée et responsive.  
Vous travaillez avec **Mila**, la cheffe de projet, sur la mise en place du **tableau de bord utilisateur**, qui s’est déroulée en deux phases :

- **Phase 1** : Authentification des utilisateurs, affichage et modification du profil  
- **Phase 2** : Spécification des routes API des transactions (via Swagger), puis implémentation complète de l’affichage et de l’édition des transactions

---

## Objectif du projet

- Créer l'application avec **React**
- Rendre le site **responsive**
- Gérer les routes avec **React Router**
- Gérer l'état global avec **Redux**
- Appliquer les **bonnes pratiques du Green IT**
- Spécifier les routes API des transactions avec **Swagger**

---

## Technologies utilisées

- **React 18** avec **Vite**  
- **React Router DOM**  
- **Redux**

---

## Installation

### Prérequis

- **Node.js v18+**  
- Le **backend** doit être installé et lancé séparément (voir ci-dessous)

---

### Cloner ce dépôt

```bash
git clone https://github.com/Valerie2a/argent-bank-frontend.git
cd argent-bank-frontend
```

---

### Installer les dépendances

```bash
yarn install
```

---

### Lancer le serveur de développement

```bash
yarn dev
```

L'application est accessible à l’adresse :  
http://localhost:5173

---

## Backend associé

Cloner également le dépôt backend :

```bash
git clone https://github.com/Valerie2a/ArgentBank-Backend.git
cd ArgentBank-Backend
```

---

### Installer les dépendances et démarrer le serveur

```bash
npm install
npm run dev:server
```

Le backend est accessible à l’adresse :  
http://localhost:3001


---

## Comptes de test

Identifiez-vous avec un des comptes de test suivants pour accéder au tableau de bord utilisateur :

| Prénom | Nom    | Email             | Mot de passe   |
|--------|--------|-------------------|----------------|
| Tony   | Stark  | tony@stark.com    | password123    |
| Steve  | Rogers | steve@rogers.com  | password456    |
