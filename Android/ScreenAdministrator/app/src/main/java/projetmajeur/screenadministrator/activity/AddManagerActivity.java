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
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.AddDevice;
import projetmajeur.screenadministrator.tasks.AddManager;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;

public class AddManagerActivity extends AppCompatActivity {

    EditText email;
    EditText password;
    EditText name;

    Button button_add;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_manager);


        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
        name = (EditText) findViewById(R.id.name);

        button_add = (Button) findViewById(R.id.button_add);

        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goToMainActivity();

            }
        });
    }


    private void goToMainActivity(){
        final String mail = email.getText().toString();
        final String passw = password.getText().toString();
        final String nam = name.getText().toString();

        User user = new User(mail,passw,nam);


        AddManager addManager= new AddManager();
        AddManager.AddManagerListener addManagerListener = new AddManager.AddManagerListener() {

            @Override
            public void onAddManager(Boolean result) {
                if(result){
                    Toast.makeText(getApplicationContext(), "Manager add", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(AddManagerActivity.this, ListManagerActivity.class);
                    startActivity(intent);

                }

            }
        };

        addManager.setAddManagerListener(addManagerListener);
        addManager.execute(user);


    }
}
