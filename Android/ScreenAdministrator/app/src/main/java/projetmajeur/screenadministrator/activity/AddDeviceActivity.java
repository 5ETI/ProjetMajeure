package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class AddDeviceActivity extends AppCompatActivity {

    EditText identifiant;
    EditText orientation;
    EditText longeur;
    EditText hauteur;
    EditText latitude;
    EditText longitude;
    EditText ville;

    Button button_add;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_device);

        identifiant = (EditText) findViewById(R.id.identifiant);
        orientation =(EditText) findViewById(R.id.orientation);
        longeur = (EditText) findViewById(R.id.longueur);
        hauteur = (EditText) findViewById(R.id.hauteur);
        latitude = (EditText) findViewById(R.id.latitude);
        longitude = (EditText) findViewById(R.id.longitude);
        ville = (EditText) findViewById(R.id.ville);

        button_add = (Button) findViewById(R.id.button_add);




        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


               goToMainActivity();

            }
        });
    }

    private void goToMainActivity(){

        final Integer iden = parseInt(identifiant.getText().toString());
        final String port = orientation.getText().toString();
        final Integer longu = parseInt(longeur.getText().toString());
        final Double lat = parseDouble(latitude.getText().toString());
        final Double longi = parseDouble(longitude.getText().toString());
        final String vill = ville.getText().toString();

        Device device = new Device(iden,port,longu,33,lat,longi,vill);
        Log.i("teeeeeeest",device.toString());

        // FAIRE APPEL A AddDevice pour l ajouter de maniere asynchrone ayant pour retour un boolean
        Toast.makeText(getApplicationContext(), "Device add", Toast.LENGTH_SHORT).show();


        Intent intent = new Intent(AddDeviceActivity.this, ListeDeviceActivity.class);
        startActivity(intent);


    }
}
