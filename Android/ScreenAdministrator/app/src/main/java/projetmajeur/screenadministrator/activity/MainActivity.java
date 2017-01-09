package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.dd.processbutton.iml.ActionProcessButton;

import projetmajeur.screenadministrator.R;

public class MainActivity extends AppCompatActivity {

    private ActionProcessButton button_device;
    private Button button_manager;
    @Override
    protected void onCreate(Bundle savedInstanceState) {


        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        button_device = (ActionProcessButton) findViewById(R.id.button_device);
        button_manager = (Button) findViewById(R.id.button_managers);


        button_device.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, DeviceActivity.class);
                startActivity(intent);

            }
        });


        button_manager.setOnClickListener(new View.OnClickListener()  {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, ListManagerActivity.class);
                startActivity(intent);
            }
        });




    }
}
