<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::orderBy('username', 'asc')->get();
        return response()->json([
            'status' => true,
            'message'=> 'Data ditemukan',
            'data' => $data
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataUser = new User;

        $rules = [
            'username' => 'required',
            'password' => 'required',
            'email' => 'required',
            'nama' => 'required'
        ];

        $validator = Validator::make($request->all(), $rules);
        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Gagal memasukkan data',
                'data' => $validator->errors()
            ]);
        }

        $dataUser->username = $request->username;
        $dataUser->password = $request->password;
        $dataUser->email = $request->email;
        $dataUser->nama = $request->nama;

        $post = $dataUser->save();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Memasukkan Data'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = User::find($id);
        if($data){
            return response()->json([
                'status' => true,
                'message' => 'Data Ditemukan',
                'data'=>$data
            ], 200);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $dataUser = User::find($id);
    if(empty($dataUser)){
        return response()->json([
            'status' => false,
            'message' => 'Data tidak ditemukan',
        ], 404);
    } 

    $rules = [
        'username' => 'required',
        'email' => 'required',
        'nama' => 'required'
    ];

    if ($request->has('password')) {
        $rules['password'] = 'required|min:6';
    }

    $validator = Validator::make($request->all(), $rules);
    if($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => 'Gagal update data',
            'data' => $validator->errors()
        ]);
    }

    $dataUser->username = $request->username;
    $dataUser->email = $request->email;
    $dataUser->nama = $request->nama;

    // Update password hanya jika dikirim di request
    if ($request->has('password')) {
        $dataUser->password = bcrypt($request->password);
    }

    $dataUser->save();

    return response()->json([
        'status' => true,
        'message' => 'Sukses Update Data'
    ]);
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dataUser = User::find($id);
        if(empty($dataUser)){
            return response()->json([
                'status' => false,
                'message' => 'Data tidak ditemukan',
            ], 404);
        } 

       
        $post = $dataUser->delete();

        return response()->json([
            'status' => true,
            'message' => 'Sukses Delete Data'
        ]);
    }
}
