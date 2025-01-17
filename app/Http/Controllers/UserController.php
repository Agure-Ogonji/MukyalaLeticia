<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
// use App\Http\Resources\UserResource;
// use App\Http\Resources\UserResource;
use App\Http\Resources\UserCRUDResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if(request("email")){
            $query->where("email", "like", "%" . request("email") . "%");
        }
        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia("User/Index", [
            "users" => UserCRUDResource::collection($users),
            "queryParams" => request()->query(),
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']); 
        // dd($data);
        // $image = $data['image'] ?? null;
        // $data['created_by'] = Auth::id();
        // $data['updated_by'] = Auth::id();

        // if($image){
        //     $data['image_path'] = $image->store('user/'.Str::random(), 'public');
        // }
        User::create($data);

        return to_route("user.index")->with('success', 'THE USER IS CREATED');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user->tasks();
        
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if(request("name")){
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }
        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return inertia('User/Show', [
            'user' => new UserResource($user),
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserCRUDResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {

        $data = $request->validated();
        $password = $data['password'] ?? null;
        if($password){
            $data['password'] = bcrypt($password);
        }

        else{
            unset($data['password']);
        }
        // $image = $data['image'] ?? null;
        // $data['updated_by'] = Auth::id();

        // if($image){
        //     if($user->image_path){
        //         Storage::disk('public')->deleteDirectory(dirname($user->image_path));
        //     }
        //     $data['image_path'] = $image->store('user/' . Str::random(), 'public');
        // }
        $user->update($data);

        return to_route('user.index')->with('success', "USER \"$user->name\" IS UPDATED");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        
        $user->delete();
        // if($user->image_path){
        //     Storage::disk('public')->deleteDirectory(dirname($user->image_path));
        // }
        return to_route('user.index')->with('success', "USER \"$name\"  IS DELETED");
    }
}
