<?php

namespace App\Http\Requests;

use App\Enum\EventStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class UpsertEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            //
            'title' => ['required', 'string', 'max:150', Rule::unique('events')->ignore($this->event)],
            'description' => 'nullable|string',
            'image' => 'nullable|file|image|max:10240',
            'start_at' => 'required|date',
            'end_at' => 'required|date|after:start_at',
            'tags' => 'nullable|array',
            'tags.*' => 'required|string',
            'speakers' => 'nullable|array',
            'speakers.*' => 'required|string',
            'status' => ['required', new Enum(EventStatus::class)]
        ];
    }

    public function validated($key = null, $default = null)
    {
        return array_merge(parent::validated(), [
            'slug' => str(parent::validated('name'))->slug(),
        ]);
    }
}
