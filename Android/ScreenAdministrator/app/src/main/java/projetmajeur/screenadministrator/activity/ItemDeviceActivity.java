package projetmajeur.screenadministrator.activity;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.test.suitebuilder.TestMethod;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.ManagerAdapter;
import projetmajeur.screenadministrator.tasks.ManagerListTask;
import projetmajeur.screenadministrator.tasks.RecyclerAdapter;

public class ItemDeviceActivity extends AppCompatActivity {


    TextView identifiant;
    TextView orientation;
    TextView ville;

    Button button_add;

    //private RecyclerView mRecyclerView ;
    private LinearLayoutManager mLinearLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_device);

        identifiant = (TextView) findViewById(R.id.identifiant);
        orientation = (TextView) findViewById(R.id.orientation);
        ville = (TextView) findViewById(R.id.ville);
        button_add =(Button) findViewById(R.id.button_add);


        Intent i = getIntent();
        Device dene = (Device) i.getSerializableExtra("ItemSelected");

        identifiant.setText("Id : " + dene.getId());
        orientation.setText("Orientation : " + dene.getOrientation());
        ville.setText("Ville : " + dene.getVille());

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerViewDevice);
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);

        ManagerListTask managerListTask = new ManagerListTask();
        ManagerListTask.ManagerListListener managerListListener = new ManagerListTask.ManagerListListener() {
            @Override
            public void onManager(ArrayList<User> list) {
                // specify an adapter

                ManagerAdapter mAdapter = new ManagerAdapter(list, new ManagerAdapter.OnItemClickListener() {
                    @Override
                    public void onItemClick(User item) {
                       
                    }

                });
                mRecyclerView.setAdapter(mAdapter);
            }
        };

        managerListTask.setManagerListListener(managerListListener);
        managerListTask.execute(String.valueOf(dene.getId()));

        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ItemDeviceActivity.this, AddDeviceActivity.class);
                startActivity(intent);

            }
        });




    }
}
