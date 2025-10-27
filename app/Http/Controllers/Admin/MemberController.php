<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = User::where('role', 'member')
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Members/Index', [
            'members' => $members,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'member',
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Member baru berhasil ditambahkan.');
    }

    public function edit(User $member)
    {
        if ($member->role !== 'member') {
            abort(403);
        }

        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, User $member)
    {
        if ($member->role !== 'member') {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $member->id,
            'password' => 'nullable|min:6',
        ]);

        $member->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
                ? Hash::make($validated['password'])
                : $member->password,
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Data member berhasil diperbarui.');
    }

    public function destroy(User $member)
    {
        if ($member->role !== 'member') {
            return back()->with('error', 'Hanya member yang bisa dihapus.');
        }

        $member->delete();

        return back()->with('success', 'Member berhasil dihapus.');
    }
}
