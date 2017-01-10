package projetmajeur.screenadministrator.activity;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.ActionMenuView;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.DeviceListTask;
import projetmajeur.screenadministrator.tasks.ManagerAdapter;
import projetmajeur.screenadministrator.tasks.ManagerListTask;
import projetmajeur.screenadministrator.tasks.RecyclerAdapter;

import static projetmajeur.screenadministrator.R.id.button_add;
import static projetmajeur.screenadministrator.R.id.button_delete;

public class ListManagerActivity extends AppCompatActivity  {

    private Button button_add;
    private Button button_delete;



    //private RecyclerView mRecyclerView ;
    private LinearLayoutManager mLinearLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_manager);
        button_add = (Button) findViewById(R.id.button_add);
        button_delete = (Button) findViewById(R.id.button_delete);

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerViewManager);
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);

        ManagerListTask managerListTask = new ManagerListTask();
        ManagerListTask.ManagerListListener managerListListener = new ManagerListTask.ManagerListListener() {
            @Override
            public void onManager(ArrayList<User> result) {
                // specify an adapter
                ManagerAdapter mAdapter = new ManagerAdapter(result);
                mRecyclerView.setAdapter(mAdapter);
            }
        };

        managerListTask.setManagerListListener(managerListListener);
        managerListTask.execute();

      /*  mRecyclerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListManagerActivity.this, ManagerActivity.class);
                startActivity(intent);


            }

        });
*/
        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ListManagerActivity.this, AddDeviceActivity.class);
                startActivity(intent);

            }
        });
    }

    public void onCheckboxClicked(View view) {

    }
}
