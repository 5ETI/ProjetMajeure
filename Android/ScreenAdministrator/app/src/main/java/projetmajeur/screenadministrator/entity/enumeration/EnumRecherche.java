package projetmajeur.screenadministrator.entity.enumeration;

/**
 * Created by benad on 22/12/2016.
 */

public enum EnumRecherche {

    RECHERCHE_TYPE("Type of research",0),
    RECHERCHE_PAR_VILLE("City",1),
    RECHERCHE_PAR_GEOLOCALISATION("Use geolocation",2);

    private String stringValue;
    private int intValue;

    EnumRecherche(String toString, int value) {
        stringValue = toString;
        intValue = value;

    }

    @Override
    public String toString() {
        return  stringValue;
    }
}
