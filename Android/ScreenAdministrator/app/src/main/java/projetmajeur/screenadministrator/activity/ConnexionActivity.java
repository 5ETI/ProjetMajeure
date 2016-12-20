package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.dd.processbutton.iml.ActionProcessButton;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.tasks.LoginTask;

public class ConnexionActivity extends AppCompatActivity {

    private EditText login;
    private EditText password;
    private ActionProcessButton buttonConnect;
    //ActionProcessButton btnSignIn = (ActionProcessButton) findViewById(R.id.btnSignIn);


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_connexion);

       // btnSignIn.setMode(ActionProcessButton.Mode.PROGRESS);


        login= (EditText) findViewById(R.id.loginEntry);
        password= (EditText) findViewById(R.id.passwordEntry);
        buttonConnect = (ActionProcessButton) findViewById(R.id.btnSignIn);
        buttonConnect.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonConnect.setProgress(50);
                goToMainActivity();
            }
        });
    }

    private void goToMainActivity(){
        LoginTask loginTask = new LoginTask();
        LoginTask.LoginListener loginListener = new LoginTask.LoginListener() {
            @Override
            public void onLogin(boolean result) {
                if (result) {
                    buttonConnect.setProgress(100);
                    Intent intent = new Intent(ConnexionActivity.this, MainActivity.class);
                    //intent.putExtra(TAGLOGIN,loginET.getText().toString());
                    startActivity(intent);
                }
                else{
                    Toast.makeText(ConnexionActivity.this, "Opération impossible : Pas de connectivité ou mauvais couple Login/Password", Toast.LENGTH_SHORT).show();
                }
            }
        };

        loginTask.setLoginListener(loginListener);
        String log = login.getText().toString();
        String pwd = password.getText().toString();
        loginTask.execute(log,pwd);

    }





    }
