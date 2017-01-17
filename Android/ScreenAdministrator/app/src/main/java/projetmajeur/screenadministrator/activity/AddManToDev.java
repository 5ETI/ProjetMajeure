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
import projetmajeur.screenadministrator.entity.model.SelectManager;
import projetmajeur.screenadministrator.entity.model.User;
import projetmajeur.screenadministrator.tasks.Assign;
import projetmajeur.screenadministrator.Adapter.ManagerAdapter;
import projetmajeur.screenadministrator.tasks.ManagerListTask;

public class AddManToDev extends AppCompatActivity {


    private Button button_add;
    private LinearLayoutManager mLinearLayoutManager;

    Device dene;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_man_to_dev);
        button_add = (Button) findViewById(R.id.button_add);

        final RecyclerView mRecyclerView = (RecyclerView) findViewById(R.id.recyclerViewManToDevice);
        mRecyclerView.setHasFixedSize(true);
        SelectManager.getInstance().clean();

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        Intent i = getIntent();
        dene = (Device) i.getSerializableExtra("Device");

        mLinearLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLinearLayoutManager);

        ManagerListTask managerListTask = new ManagerListTask();
        ManagerListTask.ManagerListListener managerListListener = new ManagerListTask.ManagerListListener() {
            @Override
            public void onManager(ArrayList<User> result) {
                // specify an adapter
                ManagerAdapter mAdapter = new ManagerAdapter("manager",result, new ManagerAdapter.OnItemClickListener() {
                    @Override
                    public void onItemClick(User item) {

                    }
                });
                mRecyclerView.setAdapter(mAdapter);
            }
        };

        managerListTask.setManagerListListener(managerListListener);
        managerListTask.execute("device",String.valueOf(dene.getId()));


        button_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ArrayList<User> stock = SelectManager.getInstance().getStockage();
                ArrayList<Integer> value = new ArrayList<Integer>();
                value.add(1);
                value.add(dene.getId());
                for( int i = 0; i<stock.size() ;i++){
                    value.add(stock.get(i).getId());
                }
                Assign assignTask = new Assign();
                Assign.AssignListener assignListener = new Assign.AssignListener(){
                    @Override
                    public void onAssign(Boolean result) {
                        if(result){
                            Intent intent = new Intent(AddManToDev.this, ItemDeviceActivity.class);
                            intent.putExtra("Device",dene);
                            Toast.makeText(getApplicationContext(), "Managers add", Toast.LENGTH_SHORT).show();

                            startActivity(intent);

                        }
                        else{
                            Toast.makeText(getApplicationContext(), "Aucun manager disponible", Toast.LENGTH_SHORT).show();

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
                Intent intent = new Intent(AddManToDev.this, ItemDeviceActivity.class);
                intent.putExtra("Device",dene);
                startActivity(intent);

                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }






}
