<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RoomNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $pinCode, public $rooms, public $participant)
    {
    }

    public function build(): RoomNotificationMail
    {
        return $this
            ->subject("Virtual meeting Created")
            ->view('mails.index', [
                'pinsCode' => $this->pinCode,
                'rooms' => $this->rooms,
                'participant' => $this->participant
            ]);
    }
}
