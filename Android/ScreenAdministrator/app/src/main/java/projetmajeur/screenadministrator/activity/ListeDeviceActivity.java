package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.SelectDevice;
import projetmajeur.screenadministrator.tasks.DeleteDevice;
import projetmajeur.screenadministrator.tasks.DeviceListTask;
import projetmajeur.screenadministrator.Adapter.RecyclerAdapter;

public class ListeDeviceActivity extends AppCompatActivity {

    private Button button_add;
    private Button button_delete;

    //private RecyclerView mRecyclerView ;
    private LinearLayoutManager mLinearLayoutManager;

    ArrayList<Device> stockage = new ArrayList<Device>();



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_device);

        button_add = (Button) findViewById(R.id.button_add);
        button_delete = (Button) findViewById(R.id.button_delete);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);
        SelectDevice.getInstance().clean();
        // use a linear layout manager
        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);

        final DeviceListTask deviceListTask = new DeviceListTask();
        final DeviceListTask.DeviceListListener deviceListListener = new DeviceListTask.DeviceListListener() {
            @Override
            public void onListDevice(ArrayList<Device> result) {
                // specify an adapter
                stockage = result;
                final RecyclerAdapter mAdapter = new RecyclerAdapter("device",result, new RecyclerAdapter.OnItemClickListener() {
                    @Override public void onItemClick(Device item) {

                        Intent inte = new Intent(ListeDeviceActivity.this, ItemDeviceActivity.class);
                        Log.i("test item : ", item.toString());
                        inte.putExtra("ItemSelected", item);
                        startActivity(inte);


                    }
                });
                mRecyclerView.setAdapter(mAdapter);
            }
        };

        deviceListTask.setDeviceListListener(deviceListListener);
        deviceListTask.execute("listeall","0");




        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListeDeviceActivity.this, AddDeviceActivity.class);
                startActivity(intent);

            }
        });

        button_delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SelectDevice.getInstance().getStockage();
                Log.i("test checkbox : ", String.valueOf(SelectDevice.getInstance().getStockage()));
                DeleteDevice deleteDevice= new DeleteDevice();
                DeleteDevice.DeleteDeviceListener deleteDeviceListener = new DeleteDevice.DeleteDeviceListener() {
                    @Override
                    public void onDeleteDevice(Boolean result) {
                        if(result){
                            Log.i("dans la boucle","ahahahahah");

                            Intent intent = new Intent(getApplicationContext(), ListeDeviceActivity.class);
                            startActivity(intent);
                           // deviceListTask.setDeviceListListener(deviceListListener);
                           // deviceListTask.execute("listeall","0");
                            Toast.makeText(getApplicationContext(), "Devices delete", Toast.LENGTH_SHORT).show();
                        }

                    }


                };

                deleteDevice.setDeleteDeviceListener(deleteDeviceListener);
                deleteDevice.execute(SelectDevice.getInstance().getStockage());
            }


        });


    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                onBackPressed();
                Intent intent = new Intent(ListeDeviceActivity.this, DeviceActivity.class);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    public void onCheckboxClicked(View view) {



        }
    }


