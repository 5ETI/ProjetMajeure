package projetmajeur.screenadministrator.tasks;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.ArrayList;

import projetmajeur.screenadministrator.R;
import projetmajeur.screenadministrator.activity.ManagerActivity;
import projetmajeur.screenadministrator.entity.model.Device;
import projetmajeur.screenadministrator.entity.model.User;

/**
 * Created by benad on 08/01/2017.
 */

public class ManagerAdapter extends RecyclerView.Adapter<ManagerAdapter.ViewHolder>  {

    private ArrayList<User> dataset;
    private final ManagerAdapter.OnItemClickListener listener;


    public static class ViewHolder extends RecyclerView.ViewHolder
    {
        public TextView textViewId;
        public TextView textViewEmail;
        public TextView textViewName;
        public TextView textViewRole;
        public TextView textViewTime;



        public ViewHolder(View v) {
            super(v);
            textViewId = (TextView) v.findViewById(R.id.identifiant);
            textViewEmail = (TextView) v.findViewById(R.id.email);
            textViewName = (TextView) v.findViewById(R.id.name);
            textViewRole = (TextView) v.findViewById(R.id.role);
            textViewTime = (TextView) v.findViewById(R.id.time);
             // bind the listener


        }
        public void bind(final User item, final OnItemClickListener listener) {
            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    listener.onItemClick(item);
                }

            });

        }

    }

    public ManagerAdapter(ArrayList<User> dataset,  ManagerAdapter.OnItemClickListener listener) {

        this.dataset = dataset;
        this.listener = listener;
    }
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.recyclerview_item_manager, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.bind(dataset.get(position), listener);

        holder.textViewId.setText("Id : " + String.valueOf(dataset.get(position).getId()));
        holder.textViewEmail.setText("Email :" + String.valueOf(dataset.get(position).getEmail()));
        holder.textViewName.setText("Name : " + String.valueOf(dataset.get(position).getName()));
        //holder.textViewRole.setText("Role : " + String.valueOf(dataset.get(position).getRole()));
        //holder.textViewTime.setText("Time : " + String.valueOf(dataset.get(position).getTime()));
    }


    @Override
    public int getItemCount() {
        return dataset.size();
    }

    public interface OnItemClickListener {
        void onItemClick(User item);
    }


    }
