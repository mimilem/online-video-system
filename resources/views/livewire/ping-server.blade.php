<div style="margin-top: 10%; text-align: center">
    <button
        wire:click="showPing"
        style="padding: 10px 20px; margin-left: 40px; color: white; cursor:pointer; background: crimson; border: 0; border-radius: 4px;"
    >Ping Server</button>

    <div style="margin-top: 5%; padding-left: 40px">
        <p>Ping time is displayed: {{ $ping }} milliseconds</p>
    </div>
</div>
