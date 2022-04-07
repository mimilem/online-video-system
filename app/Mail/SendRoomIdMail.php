<?php
declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendRoomIdMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public $user, public $roomId, public $room)
    {
    }

    public function build(): SendRoomIdMail
    {
        return $this
            ->subject("Invitation to join the room")
            ->view('mails.joinRoom', [
                'user' => $this->user,
                'room_id' => $this->roomId,
                'room' => $this->room
            ]);
    }
}
