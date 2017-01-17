package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.Adapter.ManagerAdapter;
import projetmajeur.screenadministrator.tasks.ManagerListTask;

public class ItemDeviceActivity extends AppCompatActivity  {


    TextView identifiant;
    TextView orientation;
    TextView ville;

    Button button_add;

    //private RecyclerView mRecyclerView ;
    private LinearLayoutManager mLinearLayoutManager;
     Device dene;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_device);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        identifiant = (TextView) findViewById(R.id.identifiant);
        orientation = (TextView) findViewById(R.id.orientation);
        ville = (TextView) findViewById(R.id.ville);
        button_add =(Button) findViewById(R.id.button_add);


        Intent i = getIntent();
         dene = (Device) i.getSerializableExtra("ItemSelected");
        if(dene == null){

            dene = (Device) i.getSerializableExtra("Device");
        }

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
                if(list != null){
                    ManagerAdapter mAdapter = new ManagerAdapter("device",list, new ManagerAdapter.OnItemClickListener() {
                        @Override
                        public void onItemClick(User item) {

                        }

                    });
                    mRecyclerView.setAdapter(mAdapter);
                }
                else
                {
                    Toast.makeText(getApplicationContext(), "Aucun manager disponible", Toast.LENGTH_SHORT).show();

                }

            }
        };

        managerListTask.setManagerListListener(managerListListener);
        managerListTask.execute("liste",String.valueOf(dene.getId()));

        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ItemDeviceActivity.this, AddManToDev.class);
                intent.putExtra("Device", dene);
                startActivity(intent);

            }
        });




    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                Intent intent = new Intent(ItemDeviceActivity.this, ListeDeviceActivity.class);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }


}
