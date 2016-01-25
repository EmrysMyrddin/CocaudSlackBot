# CocaudBot
Le CocaudBot permet de compter les points pour un jeu stupide. 

Il se connect à une team slack et ajoute un point à chaque reaction 
qu'un utilisateur reçois (parmis les réaction prsente dans le fichier de configuration.

# Installation

Créer un fichier `properties.json` contenant la configuration
nécéssaire en se basant sur le fichier `properties_sample.json`.

    $ git clone https://github.com/EmrysMyrddin/CocaudSlackBot.git && cd CocaudSlackBot
    $ npm install
    $ npm run installDatabase // Will create appropriate tables in the database 
    $ npm run bot
    
Votre bot est désormais en ligne sur votre team slack. Pour qu'il commence a réagoir et compter les
points, vous devez l'ajouter dans les salons à surveiller.

Dans le salon slack voulu, entrez `/invite @cocaudbot`

# Utilisation

Le bot compte tout seul les points.

Pour passer une commande au bot, il suffit de le mentioner directement :

    @cocaudbot: help
    
La liste des comandes est accessible via la commande `help`
              
