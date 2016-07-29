package com.danielstallworth.servicesandnotifications;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.SystemClock;

import java.util.Calendar;

/**
 * Created by danie on 7/22/2016.
 */
public class Alarm {
    public void setAlarm(Context context) {
        //get reference to AlarmManager
        AlarmManager alarmMgr = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);

        //RTC alarm repeating
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(Calendar.HOUR_OF_DAY, 16);
        calendar.set(Calendar.MINUTE, 18);
        long milliseconds = calendar.getTimeInMillis();

        /*alarmMgr.setInexactRepeating(AlarmManager.RTC, milliseconds,
                AlarmManager.INTERVAL_DAY, getMainActivityPendingIntent(context));*/
        alarmMgr.setInexactRepeating(AlarmManager.ELAPSED_REALTIME,
                SystemClock.elapsedRealtime() + 10 * 1000,
                10 * 1000,
                getBroadcastActivityPendingIntent(context));
        /*alarmMgr.set(AlarmManager.ELAPSED_REALTIME,
                SystemClock.elapsedRealtime() + 10 * 1000,
                getMainActivityPendingIntent());*/

        ComponentName bootReceiver = new ComponentName(context, MyReceiver.class);
        PackageManager packageManager = context.getPackageManager();

        packageManager.setComponentEnabledSetting(bootReceiver,
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP);

    }
    protected void cancelAlarm(Context context) {
        AlarmManager alarmMgr = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
        alarmMgr.cancel(getBroadcastActivityPendingIntent(context));

        ComponentName receiver = new ComponentName(context, MyReceiver.class);
        PackageManager pm = context.getPackageManager();

        pm.setComponentEnabledSetting(receiver,
                PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                PackageManager.DONT_KILL_APP);
    }
    protected PendingIntent getMainActivityPendingIntent(Context context) {
        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        return(pendingIntent);
    }

    protected PendingIntent getBroadcastActivityPendingIntent(Context context) {
        Intent intent = new Intent(context, AlarmBroadcastReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, 0);

        return(pendingIntent);
    }
}
