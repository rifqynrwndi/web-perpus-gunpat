<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
}); 

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();
        return $user->role === 'admin'
            ? redirect()->route('admin.dashboard')
            : redirect()->route('member.dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
    ->name('dashboard');
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('books', \App\Http\Controllers\Admin\BookController::class);
    Route::resource('members', \App\Http\Controllers\Admin\MemberController::class)->except(['show']);
    Route::get('/borrowings', [\App\Http\Controllers\Admin\BorrowingController::class, 'index'])->name('borrowings.index');
    Route::patch('/borrowings/{borrowing}', [\App\Http\Controllers\Admin\BorrowingController::class, 'update'])->name('borrowings.update');
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    Route::get('/fines', [\App\Http\Controllers\Admin\FineController::class, 'index'])->name('fines.index');
    Route::post('/fines/{borrowing}/mark-paid', [\App\Http\Controllers\Admin\FineController::class, 'markPaid'])->name('fines.markPaid');
}); 

Route::middleware(['auth', 'role:member'])->prefix('member')->name('member.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Member/Dashboard'))->name('dashboard');
    Route::get('/profile', [\App\Http\Controllers\Member\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [\App\Http\Controllers\Member\ProfileController::class, 'update'])->name('profile.update');
    Route::get('/books', [\App\Http\Controllers\Member\BookController::class, 'index'])->name('books.index');
    Route::post('/books/{book}/reserve', [\App\Http\Controllers\Member\BookController::class, 'reserve'])->name('books.reserve');
    Route::get('/borrowings', [\App\Http\Controllers\Member\BorrowingController::class, 'index'])->name('borrowings.index');
    Route::post('/borrow', [\App\Http\Controllers\Member\BorrowingController::class, 'store'])->name('borrow.store');
    Route::delete('/borrowings/{borrowing}/cancel', [\App\Http\Controllers\Member\BorrowingController::class, 'cancel'])->name('borrowings.cancel');
    Route::get('/reservations', [\App\Http\Controllers\Member\ReservationController::class, 'index'])->name('reservations.index');
    Route::delete('/reservations/{reservation}', [\App\Http\Controllers\Member\ReservationController::class, 'destroy'])->name('reservations.destroy');
    Route::post('/payments/{borrowing}/pay', [\App\Http\Controllers\Member\PaymentController::class, 'payFine'])->name('payments.pay');
});

// Xendit
Route::get('/payment/success', function () {
    return Inertia::render('Payment/Success');
})->name('payment.success');
Route::get('/payment/failed', function () {
    return Inertia::render('Payment/Failed');
})->name('payment.failed');

require __DIR__.'/auth.php';
