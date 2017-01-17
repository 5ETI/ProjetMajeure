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
import projetmajeur.screenadministrator.tasks.DeviceListTask;
import projetmajeur.screenadministrator.Adapter.RecyclerAdapter;

public class ItemManagerActivity extends AppCompatActivity {

    TextView name;
    TextView mail;

    User user;
    Button button_add;
    private LinearLayoutManager mLinearLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_item_manager);

        name = (TextView) findViewById(R.id.name);
        mail = (TextView) findViewById(R.id.mail);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        button_add = (Button) findViewById(R.id.button_add);
        Intent i = getIntent();
        user = (User) i.getSerializableExtra("SelectUser");

        if(user == null){
             user = (User) i.getSerializableExtra("Manager");

        }

        name.setText("Name : " + user.getName());
        mail.setText("Email :" + user.getEmail());

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerViewDevice);
        mRecyclerView.setHasFixedSize(true);

        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);


        DeviceListTask deviceListTask = new DeviceListTask();
        DeviceListTask.DeviceListListener deviceListListener = new DeviceListTask.DeviceListListener() {
            @Override
            public void onListDevice(ArrayList<Device> list) {

                if (list != null)
                {
                    RecyclerAdapter mAdapter = new RecyclerAdapter("manager",list, new RecyclerAdapter.OnItemClickListener() {
                        @Override
                        public void onItemClick(Device item) {

                        }

                    });
                    mRecyclerView.setAdapter(mAdapter);
                }
                else
                {

                    Toast.makeText(getApplicationContext(), "Aucun device disponible", Toast.LENGTH_SHORT).show();

                }

            }
        };

        deviceListTask.setDeviceListListener(deviceListListener);
        deviceListTask.execute("liste", String.valueOf(user.getId()));

        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ItemManagerActivity.this, AddDevToMan.class);
                intent.putExtra("Manager", user);
                startActivity(intent);

            }

        });
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                Intent intent = new Intent(ItemManagerActivity.this, ListManagerActivity.class);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }
}
