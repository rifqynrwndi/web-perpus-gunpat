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
        $members = User::whereIn('role', ['member', 'admin'])
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
            'role' => 'nullable|string|in:member,admin', // tambahkan validasi role opsional
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'] ?? 'member', // default member
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Member baru berhasil ditambahkan.');
    }

    public function edit(User $member)
    {
        // if ($member->role === 'admin') {
        //     abort(403, 'Tidak dapat mengedit admin.');
        // }
        return Inertia::render('Admin/Members/Edit', [
            'member' => $member,
        ]);
    }

    public function update(Request $request, User $member)
    {
        // Pastikan hanya admin yang bisa ubah data member
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Hanya admin yang dapat mengubah data member.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email,' . $member->id,
            'password' => 'nullable|min:6',
            'role' => 'required',
        ]);

        // Update data user
        $member->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'],
        ]);

        if (!empty($validated['password'])) {
            $member->password = Hash::make($validated['password']);
        }

        $member->save();

        return redirect()
            ->route('admin.members.index')
            ->with('success', 'Data member berhasil diperbarui.');
    }

    public function destroy(User $member)
    {
        if ($member->role === 'admin') {
            return back()->with('error', 'Admin tidak dapat dihapus.');
        }

        $member->delete();

        return back()->with('success', 'Member berhasil dihapus.');
    }
}
