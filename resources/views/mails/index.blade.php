<h1>Hi</h1>
<p>You have created virtual meeting. The following information can be used to join room </p>
<p>RoomID : ".{{ $rooms['room']['room_id'] }}</p>
<p>Facilitator Room Pin : ".{{ $pinsCode }}</p>
<p>Student Room Pin : ".{{ $participant }}</p>
<a href="{{ route('room.getRoom', $rooms['room']['room_id']) }}">Join Event</a>

<p>Thank you to user Aperi</p>
