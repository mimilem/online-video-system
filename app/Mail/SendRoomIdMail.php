<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRoomIdMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $user, public $roomId){}

    public function build()
    {
        return $this
            ->subject("Invitation to join the room")
            ->view('mails.room', [
                'user' => $this->user,
                'room_id' => $this->roomId
            ]);
    }
}
