package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.User;

public class ItemManagerActivity extends AppCompatActivity {

    TextView name;
    TextView mail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_manager);

        name = (TextView) findViewById(R.id.name);
        mail = (TextView) findViewById(R.id.mail) ;
        Intent i = getIntent();
        User user = (User) i.getSerializableExtra("SelectUser");

        name.setText("Name : " + user.getName());
        mail.setText("Email :" + user.getEmail());
    }
}
