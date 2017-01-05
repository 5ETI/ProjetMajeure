package projetmajeur.screenadministrator.entity.model;

import java.util.UUID;

import projetmajeur.screenadministrator.entity.enumeration.EnumDistanceCherche;
import projetmajeur.screenadministrator.entity.enumeration.EnumRecherche;
import projetmajeur.screenadministrator.entity.enumeration.EnumVille;

/**
 * Created by benad on 03/01/2017.
 */
public class RechercheDevice {
    private static RechercheDevice ourInstance = new RechercheDevice();

    public static RechercheDevice getInstance() {
        return ourInstance;
    }

    private String uuid;
    private EnumRecherche typerecherche;
    private EnumDistanceCherche distancerecherche;
    private EnumVille villerecherche;


    private RechercheDevice() {
        this.uuid = UUID.randomUUID().toString();
        this.typerecherche = EnumRecherche.RECHERCHE_PAR_VILLE;
        this.distancerecherche = EnumDistanceCherche.DISTANCE_1_KM;
        this.villerecherche = EnumVille.LYON;
    }


    public EnumRecherche getTyperecherche() {
        return typerecherche;
    }

    public void setTyperecherche(EnumRecherche typerecherche) {
        this.typerecherche = typerecherche;
    }

    public EnumDistanceCherche getDistancerecherche() {
        return distancerecherche;
    }

    public void setDistancerecherche(EnumDistanceCherche distancerecherche) {
        this.distancerecherche = distancerecherche;
    }

    public EnumVille getVillerecherche() {
        return villerecherche;
    }

    public void setVillerecherche(EnumVille villerecherche) {
        this.villerecherche = villerecherche;
    }
}
