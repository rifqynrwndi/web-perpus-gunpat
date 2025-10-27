<?php

use Illuminate\Support\Facades\Route;

Route::post('/xendit/callback', [\App\Http\Controllers\PaymentCallbackController::class, 'handle']);