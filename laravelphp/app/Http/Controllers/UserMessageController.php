<?php

namespace App\Http\Controllers;

use App\Models\UserMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class UserMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserMessage::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'cpf'           => 'sometimes|integer',               
            'email'         => 'required|string|max:255|unique:user_messages,email',
            'phone'         => 'required|numeric|unique:user_messages,phone',
            'cep'           => 'required|numeric',
            'state'         => 'required|string|max:255',
            'city'          => 'required|string|max:255',
            'neighborhood'  => 'required|string|max:255',
            'street'        => 'required|string|max:255',
            'number'        => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages());
        }

        $validated = $validator->validated();

        $model = UserMessage::create($validated);

        return response()->json($model);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserMessage $userMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserMessage $userMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserMessage $userMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserMessage $userMessage)
    {
        //
    }
}
