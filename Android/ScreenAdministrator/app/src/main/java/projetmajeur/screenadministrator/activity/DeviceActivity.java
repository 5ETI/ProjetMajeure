package projetmajeur.screenadministrator.activity;

import android.app.LocalActivityManager;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TabHost;
import android.widget.Toast;

import com.google.android.gms.maps.model.LatLng;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.enumeration.EnumDistanceCherche;
import projetmajeur.screenadministrator.entity.enumeration.EnumRecherche;
import projetmajeur.screenadministrator.entity.enumeration.EnumVille;
import projetmajeur.screenadministrator.entity.enumeration.Recherche;
import projetmajeur.screenadministrator.entity.model.RechercheDevice;

import static android.R.attr.button;
import static android.R.attr.visibility;
import static android.R.attr.visible;

public class DeviceActivity extends GoogleLocationActivity {


    Button button_liste;
    Button button_maps;
    Spinner spinner_type;
    Spinner spinner_ville;
    Spinner spinner_rayon;
    Button button_save;

    private double longUser;
    private double latUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_device);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        button_liste =(Button) findViewById(R.id.button_liste);
        button_maps = (Button) findViewById(R.id.button_maps);
        button_save = (Button) findViewById(R.id.button_save);
        spinner_type = (Spinner) findViewById(R.id.paramRecherche);
        spinner_ville = (Spinner) findViewById(R.id.paramReVille);
        spinner_rayon = (Spinner) findViewById(R.id.paramReGeolo);

        //longUser = mLastLocation.getLatitude();



        spinner_type.setAdapter(new ArrayAdapter<EnumRecherche>(this, android.R.layout.simple_spinner_item, EnumRecherche.values()));
        spinner_ville.setAdapter(new ArrayAdapter<EnumVille>(this, android.R.layout.simple_spinner_item, EnumVille.values()));
        spinner_rayon.setAdapter(new ArrayAdapter<EnumDistanceCherche>(this, android.R.layout.simple_spinner_item, EnumDistanceCherche.values()));

        spinner_type.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                if (spinner_type.getSelectedItem().toString().equals("City")) {
                    RechercheDevice.getInstance().setTyperecherche(EnumRecherche.RECHERCHE_PAR_VILLE);
                    spinner_ville.setVisibility(parentView.VISIBLE);
                    spinner_rayon.setVisibility(parentView.INVISIBLE);


                }
                if (spinner_type.getSelectedItem().toString().equals("Use geolocation")) {
                    RechercheDevice.getInstance().setTyperecherche(EnumRecherche.RECHERCHE_PAR_GEOLOCALISATION);
                    spinner_rayon.setVisibility(parentView.VISIBLE);
                    spinner_ville.setVisibility(parentView.INVISIBLE);

                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parentView) {

            }

        });
        button_save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String ville = spinner_ville.getSelectedItem().toString();
                String rayon = spinner_rayon.getSelectedItem().toString();

                RechercheDevice.getInstance().setVillerecherche(EnumVille.fromString(ville));
                RechercheDevice.getInstance().setDistancerecherche(EnumDistanceCherche.fromString(rayon));
                Toast.makeText(getApplicationContext(), "Settings saved", Toast.LENGTH_SHORT).show();


                /*
                String villet = RechercheDevice.getInstance().getVillerecherche().toString();
                Log.i("test ville",villet);

                String typet = RechercheDevice.getInstance().getTyperecherche().toString();
                Log.i("test type",typet);

                String distancet = RechercheDevice.getInstance().getDistancerecherche().toString();
                Log.i("test distance",distancet);
                */





            }
        });

        button_maps.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                longUser = mLastLocation.getLongitude();
                latUser = mLastLocation.getLatitude();
                Intent intent = new Intent(DeviceActivity.this, MapsDeviceActivity.class);
               // Bundle extras = intent.getExtras();
                intent.putExtra("longUser",longUser);
                intent.putExtra("latUser",latUser);
                //intent.putExtras(extras);
                startActivity(intent);
            }
        });
        button_liste.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(DeviceActivity.this, ListeDeviceActivity.class);
                startActivity(intent);
            }
        });

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                Intent intent = new Intent(DeviceActivity.this, MainActivity.class);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    protected void updateUI() {


    }
}