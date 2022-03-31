<?php
declare(strict_types=1);

namespace App\Traits;

trait CalculationEvent
{
    private function calculationDateOfEvent($attributes): array
    {
        $dateOld = $attributes->input('date');
        $time = $attributes->input('startTime');
        $currentTime = strtotime("".$dateOld." ".$time."");
        $hoursToAdd = -2;
        $secondsToAdd = $hoursToAdd * (60 * 60);
        $newTime = $currentTime + $secondsToAdd;
        $date =  date("Y-m-d H:i:s", $newTime);
        $time1 = $attributes->input('startTime');
        $time2 = $attributes->input('endTime');
        $array1 = explode(':', $time1);
        $array2 = explode(':', $time2);
        $minutes1 = ($array1[0] * 60.0 + $array1[1]);
        $minutes2 = ($array2[0] * 60.0 + $array2[1]);
        $difference = $minutes2 - $minutes1;
        return [$date, $difference];
    }
}
