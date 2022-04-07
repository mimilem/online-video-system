<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SendRoomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            "username" => ['nullable', 'string'],
            "room_id" => ['required', Rule::exists('rooms', 'roomId')],
            "message" => ['nullable', 'string'],
            "inviteUsers" => ['required', 'array']
        ];
    }
}
