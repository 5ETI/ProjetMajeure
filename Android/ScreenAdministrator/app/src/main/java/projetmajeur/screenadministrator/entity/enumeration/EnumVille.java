package projetmajeur.screenadministrator.entity.enumeration;

/**
 * Created by benad on 22/12/2016.
 */

public enum EnumVille {

    LYON("Lyon",0),
    PARIS("Paris",1),
    LONDRES("Londres",2),
    NEWYORK("New York",3) ;


    private String stringValue;
    private int intValue;

    EnumVille(String toString, int value) {
        stringValue = toString;
        intValue = value;

    }

    public static EnumVille fromString(String text) {
        if (text != null) {
            for (EnumVille b : EnumVille.values()) {
                if (text.equalsIgnoreCase(b.stringValue)) {
                    return b;
                }
            }
        }
        throw new IllegalArgumentException("No constant with value " + text + " found");
    }
    @Override
    public String toString() {
        return  stringValue;
    }
}
