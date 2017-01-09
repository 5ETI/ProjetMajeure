package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.Adapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ListView;

import com.google.android.gms.maps.model.LatLng;

import java.util.ArrayList;
import java.util.List;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.tasks.DeviceListTask;
import projetmajeur.screenadministrator.tasks.RecyclerAdapter;

public class ListeDeviceActivity extends AppCompatActivity {

    private Button button_add;
    private Button button_delete;



    //private RecyclerView mRecyclerView ;
    private LinearLayoutManager mLinearLayoutManager;

    ArrayList<Device> stockage = new ArrayList<Device>();

    ArrayList<RecyclerView> selectedcheckBox = new ArrayList<RecyclerView>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_device);

        button_add = (Button) findViewById(R.id.button_add);
        button_delete = (Button) findViewById(R.id.button_delete);

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);

        DeviceListTask deviceListTask = new DeviceListTask();
        DeviceListTask.DeviceListListener deviceListListener = new DeviceListTask.DeviceListListener() {
            @Override
            public void onListDevice(ArrayList<Device> result) {
                // specify an adapter
                RecyclerAdapter mAdapter = new RecyclerAdapter(result);
                mRecyclerView.setAdapter(mAdapter);
            }
        };

        deviceListTask.setDeviceListListener(deviceListListener);
        deviceListTask.execute();


        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListeDeviceActivity.this, AddDeviceActivity.class);
                startActivity(intent);

            }
        });
    }

    public void onCheckboxClicked(View view) {

        }
    }


