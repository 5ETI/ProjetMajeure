package projetmajeur.screenadministrator.entity.enumeration;

/**
 * Created by benad on 22/12/2016.
 */

public enum Recherche {

    RECHERCHE_PAR_VILLE("Par ville",0),
    RECHERCHE_PAR_GEOLOCALISATION("Par geolocalisation",1);

    private String stringValue;
    private int intValue;

    Recherche(String toString, int value) {
        stringValue = toString;
        intValue = value;

    }

    @Override
    public String toString() {
        return "Recherche{" +
                "stringValue='" + stringValue + '\'' +
                ", intValue=" + intValue +
                '}';
    }
}


