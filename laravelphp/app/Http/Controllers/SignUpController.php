<?php

namespace App\Http\Controllers;
use App\Models\SignUp;

use Illuminate\Http\Request;

class SignUpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(SignUp::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SignUp $signUp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SignUp $signUp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SignUp $signUp)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SignUp $signUp)
    {
        //
    }
}