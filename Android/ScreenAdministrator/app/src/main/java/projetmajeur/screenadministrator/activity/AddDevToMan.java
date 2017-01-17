package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.SelectDevice;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.Assign;
import projetmajeur.screenadministrator.tasks.DeviceListTask;
import projetmajeur.screenadministrator.Adapter.RecyclerAdapter;

public class AddDevToMan extends AppCompatActivity {

    private Button button_add;
    private LinearLayoutManager mLinearLayoutManager;


    User user;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_dev_to_man);
        button_add = (Button) findViewById(R.id.button_add);

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerViewDeviceToMan);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        SelectDevice.getInstance().clean();

        mRecyclerView.setHasFixedSize(true);

       // Intent i = getIntent();
        //final Device dene = (Device) i.getSerializableExtra("Device");

        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);


        DeviceListTask deviceListTask = new DeviceListTask();
        DeviceListTask.DeviceListListener deviceListListener = new DeviceListTask.DeviceListListener() {
            @Override
            public void onListDevice(ArrayList<Device> result) {
                RecyclerAdapter mAdapter = new RecyclerAdapter("device",result, new RecyclerAdapter.OnItemClickListener() {
                    @Override
                    public void onItemClick(Device item) {

                    }
                });
                mRecyclerView.setAdapter(mAdapter);
            }
        };
        Intent i = getIntent();
        user = (User) i.getSerializableExtra("Manager");
        deviceListTask.setDeviceListListener(deviceListListener);
        deviceListTask.execute("listeformanager",String.valueOf(user.getId()));



        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ArrayList<Device> stock = SelectDevice.getInstance().getStockage();
                ArrayList<Integer> value = new ArrayList<Integer>();
                value.add(0);
                value.add(user.getId());
                for( int i = 0; i<stock.size() ;i++){
                    value.add(stock.get(i).getId());
                }
                Assign assignTask = new Assign();
                Assign.AssignListener assignListener = new Assign.AssignListener(){
                    @Override
                    public void onAssign(Boolean result) {
                        if(result){
                            Intent intent = new Intent(AddDevToMan.this, ItemManagerActivity.class);
                            intent.putExtra("Manager",user);
                            Toast.makeText(getApplicationContext(), "Devices add", Toast.LENGTH_SHORT).show();

                            startActivity(intent);

                        }
                        else{
                            Toast.makeText(getApplicationContext(), "Aucun device disponible", Toast.LENGTH_SHORT).show();

                        }

                    }
                };
                assignTask.setAssignListener(assignListener);
                assignTask.execute(value);
            }
        });



    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                Intent intent = new Intent(AddDevToMan.this, ItemManagerActivity.class);
                intent.putExtra("Manager",user);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }


}
