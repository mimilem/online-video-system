<h1>Hi</h1>
<p>Your email address has been added to a room with the following credentials</p>
<p>room: {{ $rooms['room']['room_id'] }}</p>
<p>Your pin code : ".{{ $joins }}</p>
<p>date : {{ $date }}</p>
<a href="{{ route('room.getRoom', ['room' => $rooms['room']['room_id']]) }}">Join Room</a>

