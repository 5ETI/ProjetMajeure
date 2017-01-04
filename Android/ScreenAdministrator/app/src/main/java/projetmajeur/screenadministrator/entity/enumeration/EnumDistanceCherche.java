package projetmajeur.screenadministrator.entity.enumeration;

/**
 * Created by benad on 25/10/2016.
 */

public enum EnumDistanceCherche {

    DISTANCE_500_METRE("500 mètres",0),
    DISTANCE_1_KM("1 Km",1),
    DISTANCE_2_KM("2 Km",2),
    DISTANCE_3_KM("3 Km",3),
    DISTANCE_4_KM("4 Km",4),
    DISTANCE_5_KM("5 Km",5);


    private String stringValue;
    private int intValue;
    EnumDistanceCherche(String toString, int value) {
        stringValue = toString;
        intValue = value;
    }

    @Override
    public String toString() {
        return stringValue;
    }

    public static EnumDistanceCherche fromString(String text) {
        if (text != null) {
            for (EnumDistanceCherche b : EnumDistanceCherche.values()) {
                if (text.equalsIgnoreCase(b.stringValue)) {
                    return b;
                }
            }
        }
        throw new IllegalArgumentException("No constant with value " + text + " found");
    }

}
