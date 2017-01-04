package projetmajeur.screenadministrator.entity.enumeration;

/**
 * Created by benad on 22/12/2016.
 */

public enum EnumRecherche {

    RECHERCHE_TYPE("Selectionner un type de recherche",0),
    RECHERCHE_PAR_VILLE("Par ville",1),
    RECHERCHE_PAR_GEOLOCALISATION("Par geolocalisation",2);

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
