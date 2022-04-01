<?php
declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateTokenRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required', 'string'],
            'meetingId' => ['required', 'string', Rule::exists('rooms', 'roomId')],
            'roomPins' => ['required', 'string']
        ];
    }
}
