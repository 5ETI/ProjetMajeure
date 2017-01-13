package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.AddDevice;
import projetmajeur.screenadministrator.tasks.ManagerAdapter;
import projetmajeur.screenadministrator.tasks.ManagerListTask;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class AddDeviceActivity extends AppCompatActivity {

    EditText orientation;
    EditText longeur;
    EditText hauteur;
    EditText latitude;
    EditText longitude;
    EditText ville;
    EditText typet;

    Button button_add;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_device);

        orientation =(EditText) findViewById(R.id.orientation);
        longeur = (EditText) findViewById(R.id.longueur);
        hauteur = (EditText) findViewById(R.id.hauteur);
        latitude = (EditText) findViewById(R.id.latitude);
        longitude = (EditText) findViewById(R.id.longitude);
        ville = (EditText) findViewById(R.id.ville);
        typet = (EditText) findViewById(R.id.type);

        button_add = (Button) findViewById(R.id.button_add);




        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                goToMainActivity();

            }
        });
    }

    private void goToMainActivity(){

        final String port = orientation.getText().toString();
        final Integer longu = parseInt(longeur.getText().toString());
        final Integer haut = parseInt(hauteur.getText().toString());
        final Double lat = parseDouble(latitude.getText().toString());
        final Double longi = parseDouble(longitude.getText().toString());
        final String vill = ville.getText().toString();
        final String type = typet.getText().toString();

        Device device = new Device(port,longu,haut,lat,longi,vill,type);

        Log.i("device :",device.toString());
        AddDevice addDevice= new AddDevice();
        AddDevice.AddDeviceListener addDeviceListener = new AddDevice.AddDeviceListener() {

            @Override
            public void onAddDevice(Boolean result) {
                if(result){
                    Toast.makeText(getApplicationContext(), "Device add", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(AddDeviceActivity.this, ListeDeviceActivity.class);
                    startActivity(intent);

                }

            }
        };

        addDevice.setAddDeviceListener(addDeviceListener);
        addDevice.execute(device);

    }
}
