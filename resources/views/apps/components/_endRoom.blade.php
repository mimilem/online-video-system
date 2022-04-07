<form action="{{ route('room.end', $roomId) }}" method="POST">
    @csrf
    @method('PUT')
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="modal-title" id="exampleModalLongTitle">End Meeting?</h5>
                </div>
                <div id="load"></div>
                <div class="modal-body">
                    Are you sure you want to end this meeting?
                </div>
                <input type="hidden" name="roomId" value="{{ $roomId }}">
                <div class="modal-footer">
                    <button class="btn btn-primary">Yes</button>
                    <button type="button" class="btn btn-primary">No</button>
                </div>
            </div>
        </div>
    </div>
</form>
