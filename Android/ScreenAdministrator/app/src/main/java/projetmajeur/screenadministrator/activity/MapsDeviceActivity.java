package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.location.Geocoder;
import android.net.Uri;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.appindexing.Thing;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.identity.intents.Address;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.enumeration.EnumRecherche;
import projetmajeur.screenadministrator.entity.enumeration.EnumVille;
import projetmajeur.screenadministrator.entity.enumeration.Recherche;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.RechercheDevice;
import projetmajeur.screenadministrator.tasks.DeviceTask;

import static com.google.android.gms.maps.model.BitmapDescriptorFactory.HUE_GREEN;
import static com.google.android.gms.maps.model.BitmapDescriptorFactory.HUE_YELLOW;
import static com.google.android.gms.maps.model.BitmapDescriptorFactory.defaultMarker;
import static projetmajeur.screenadministrator.R.id.icon;
import static projetmajeur.screenadministrator.R.id.latitude;
import static projetmajeur.screenadministrator.R.id.longitude;

public class MapsDeviceActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    LatLng city;
    private double longCity;
    private double latCity;

    private double longUser;
    private double latUser;

    Marker markerUser = null;
    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    private GoogleApiClient client;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps_device);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {

        mMap = googleMap;

        final TextView id = (TextView) findViewById(R.id.identifiant);
        final TextView orientation = (TextView) findViewById(R.id.orientation);
        final TextView longueur = (TextView) findViewById(R.id.longueur);
        final TextView hauteur = (TextView) findViewById(R.id.hauteur);
        final TextView longitude = (TextView) findViewById(R.id.longitude);
        final TextView latitude = (TextView) findViewById(R.id.latitude);

        Double typeRecherche = 0.0;
        Double latUser = 0.0;
        Double longUser = 0.0;
        Marker marUser = null;


        if (RechercheDevice.getInstance().getTyperecherche().toString().equals("Par ville")) {

            typeRecherche = 1.0;
            LatLng lyon = new LatLng(45.764043, 4.835);
            LatLng paris = new LatLng(48.862725, 2.287592000000018);
            LatLng londres = new LatLng(51.5073509, -0.12775829999998223);
            LatLng newyork = new LatLng(40.7127837, -74.00594130000002);

            if (RechercheDevice.getInstance().getVillerecherche().toString().equals("Lyon")) {
                city = lyon;
            }
            if (RechercheDevice.getInstance().getVillerecherche().toString().equals("Paris")) {
                city = paris;
            }
            if (RechercheDevice.getInstance().getVillerecherche().toString().equals("Londres")) {
                city = londres;
            }
            if (RechercheDevice.getInstance().getVillerecherche().toString().equals("New York")) {
                city = newyork;
            }
            markerUser = mMap.addMarker(new MarkerOptions().position(city).title("Cherche ici").icon(BitmapDescriptorFactory.fromResource(R.drawable.amu_bubble_mask)));
            mMap.moveCamera(CameraUpdateFactory.newLatLng(city));
            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(city, 12));
        }
        if (RechercheDevice.getInstance().getTyperecherche().toString().equals("Par geolocalisation")) {
            typeRecherche = 2.0;
            Log.i("dans la boucle ", "a");
            Bundle bundle = this.getIntent().getExtras();
            longUser = bundle.getDouble("longUser");
            latUser = bundle.getDouble("latUser");

            LatLng user = new LatLng(latUser, longUser);
            markerUser = mMap.addMarker(new MarkerOptions().position(user).title("Vous etes ici").icon(BitmapDescriptorFactory.fromResource(R.drawable.amu_bubble_mask)));

            mMap.moveCamera(CameraUpdateFactory.newLatLng(user));


            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(user, 12));
        }



        mMap.getUiSettings().setZoomControlsEnabled(true);
        DeviceTask deviceTask = new DeviceTask();
        DeviceTask.DeviceListener deviceListener = new DeviceTask.DeviceListener() {
            @Override
            public void onDevice(ArrayList<Device> result) {
                for (int i = 0; i < result.size(); i++) {
                    LatLng lt = new LatLng(result.get(i).getLatitude(), result.get(i).getLongitude());
                    Marker marke = mMap.addMarker(new MarkerOptions().position(lt).title("Screen n° : " + result.get(i).getId()).icon(BitmapDescriptorFactory.fromResource(android.R.drawable.ic_menu_always_landscape_portrait)));
                    marke.setTag(result.get(i));
                }
            }
        };

        deviceTask.setDeviceListener(deviceListener);
        deviceTask.execute(typeRecherche, latUser, longUser);

        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker arg0) {

                Device pl = (Device) arg0.getTag();

                if(arg0.equals(markerUser)){
                    id.setVisibility(View.INVISIBLE);
                    orientation.setVisibility(View.INVISIBLE);
                    longueur.setVisibility(View.INVISIBLE);
                    hauteur.setVisibility(View.INVISIBLE);
                    longitude.setVisibility(View.INVISIBLE);
                    latitude.setVisibility(View.INVISIBLE);


                }
                else {
                    id.setText("Id du screen : " + pl.getId());
                    orientation.setText("Orientation du screen : " + pl.getOrientation());
                    longueur.setText("Longueur du screen" + pl.getLongueur());
                    hauteur.setText("Hauteur du screen : " + pl.getHauteur());
                    longitude.setText("Longitude du screen" + pl.getLongitude());
                    latitude.setText("Latitude du screen: " + pl.getLatitude());
                }
                return true;



            }


        });
    }
    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */

    public Action getIndexApiAction() {
        Thing object = new Thing.Builder()
                .setName("MapsDevice Page") // TODO: Define a title for the content shown.
                // TODO: Make sure this auto-generated URL is correct.
                .setUrl(Uri.parse("http://[ENTER-YOUR-URL-HERE]"))
                .build();
        return new Action.Builder(Action.TYPE_VIEW)
                .setObject(object)
                .setActionStatus(Action.STATUS_TYPE_COMPLETED)
                .build();
    }

    @Override
    public void onStart() {
        super.onStart();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client.connect();
        AppIndex.AppIndexApi.start(client, getIndexApiAction());
    }

    @Override
    public void onStop() {
        super.onStop();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        AppIndex.AppIndexApi.end(client, getIndexApiAction());
        client.disconnect();
    }
}

