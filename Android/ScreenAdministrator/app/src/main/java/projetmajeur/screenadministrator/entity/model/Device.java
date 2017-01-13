package projetmajeur.screenadministrator.entity.model;

import org.json.JSONObject;

import java.io.Serializable;
import java.util.UUID;

/**
 * Created by benad on 03/01/2017.
 */

public class Device implements Serializable {

    private int id;
    private String orientation;
    private int longueur;
    private int hauteur;
    private double latitude;
    private double longitude;
    private String ville;
    private String type;

    private boolean isSelected;

    public Device(int id,String orientation, int longueur, int hauteur, double latitude, double longitude, String ville, String type) {
        this.id = id;
        this.orientation = orientation;
        this.longueur = longueur;
        this.hauteur = hauteur;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ville = ville;
        this.type = type;
    }

    public Device(String orientation, int longueur, int hauteur, double latitude, double longitude, String ville, String type) {
        this.orientation = orientation;
        this.longueur = longueur;
        this.hauteur = hauteur;
        this.latitude = latitude;
        this.longitude = longitude;
        this.ville = ville;
        this.type = type;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Device{" +
                "id=" + id +
                ", orientation='" + orientation + '\'' +
                ", longueur=" + longueur +
                ", hauteur=" + hauteur +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", ville='" + ville + '\'' +
                ", type='" + type + '\'' +
                '}';
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }
}
