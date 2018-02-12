# Projet3_OpenClassRooms
Projet n°3 Formation Développeur web junior



## Énoncé

* Diaporama
La page d’accueil de l’application affichera un diaporama de photos et de textes expliquant le fonctionnement de l'application. Ce diaporama réagit également au clavier avec les touches gauche et droite pour reculer et avancer manuellement.

* Carte des vélos
En-dessous du diaporama se trouve une carte exploitant l'API GoogleMaps avec la localisation de toutes les stations de vélos, positionnées à l’aide de marqueurs.
Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et
CSS à côté de la carte Google Maps.

La localisation et l'état de chaque station (ouverte, en travaux, combien de vélos et de places sont disponibles, etc.) est fourni via l'API de JCDecaux. Les données doivent provenir de l'API temps réel.

* Réservation d'un vélo
Il doit être possible de réserver un vélo disponible à la station sélectionnée en signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas. Une fois la signature validée, un vélo est marqué comme réservé à cette station.
Les données de réservation seront stockées dans le navigateur à l’aide de l’API HTML5 Web Storage et affichées dans un pied de page en­-dessous du panneau.

La réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme.

Le pied de page affiche en permanence l’état de la réservation (s’il y en a une), avec un décompte dynamique du temps restant avant expiration de la réservation.

Il ne peut y avoir qu'une réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.



## Compétences à valider
* Interagir avec la page et l'utilisateur
* Programmer en langage JavaScript



