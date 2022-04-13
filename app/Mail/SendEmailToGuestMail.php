<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailToGuestMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $participant, public $rooms, public $date, public $timeZone, public $guest, public $attributes)
    {
    }

    public function build(): SendEmailToGuestMail
    {
        return $this
            ->subject("Invitation to an Aperi Online Session")
            ->view('mails.guests', [
                'joins' => $this->participant,
                'room' => $this->rooms,
                'date' => $this->date,
                'timeZone' => $this->timeZone,
                'guest' => $this->guest,
                'attributes' => $this->attributes
            ]);
    }
}
