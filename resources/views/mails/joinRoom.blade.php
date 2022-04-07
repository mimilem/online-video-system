<h1>Hi</h1>
<p>You have created virtual meeting. The following information can be used to join room </p>
<p>Room Id: {{ $room_id }}</p>
<p>Your pin code : ".{{ $room['participantPin'] }}</p>
<a href="{{ route('room.getRoom', ['room' => $room_id]) }}">Join Room</a>

