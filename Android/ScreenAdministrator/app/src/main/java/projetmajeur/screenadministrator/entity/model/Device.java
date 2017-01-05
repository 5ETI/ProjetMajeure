package projetmajeur.screenadministrator.entity.model;

import java.util.UUID;

/**
 * Created by benad on 03/01/2017.
 */

public class Device {

    private int id;
    private String orientation;
    private int longueur;
    private int hauteur;
    private double latitude;
    private double longitude;
    private String ville;

    public Device(int id,String orientation, int longueur, int hauteur, double latitude, double longitude, String ville) {
        this.id = id;
        this.orientation = orientation;
        this.longueur = longueur;
        this.hauteur = hauteur;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ville = ville;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLongueur() {
        return longueur;
    }

    public void setLongueur(int longueur) {
        this.longueur = longueur;
    }

    public String getOrientation() {
        return orientation;
    }

    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    public int getHauteur() {
        return hauteur;
    }

    public void setHauteur(int hauteur) {
        this.hauteur = hauteur;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }
}
