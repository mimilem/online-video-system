<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailToGuestMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $participant, public $rooms, public $date)
    {
    }

    public function build()
    {
        return $this
            ->subject("Invitation to join the room")
            ->view('mails.guests', [
                'joins' => $this->participant,
                'room' => $this->rooms,
                'date' => $this->date
            ]);
    }
}
