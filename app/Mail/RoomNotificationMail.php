<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RoomNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $pinCode, public $rooms, public $date, public $timeZone, public $organiser, public $attributes)
    {
    }

    public function build(): RoomNotificationMail
    {
        return $this
            ->subject("Confirmation of an APERI Online Session Creation!")
            ->view('mails.index', [
                'pinsCode' => $this->pinCode,
                'rooms' => $this->rooms,
                'timeZone' => $this->timeZone,
                'organiser' => $this->organiser,
                'date' => $this->date,
                'attributes' => $this->attributes
            ]);
    }
}
