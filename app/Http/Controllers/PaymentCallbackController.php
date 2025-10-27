<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\XenditService;

class PaymentCallbackController extends Controller
{
    protected $xendit;

    public function __construct(XenditService $xendit)
    {
        $this->xendit = $xendit;
    }

    public function handle(Request $request)
    {
        $token = $request->header('x-callback-token');
        return $this->xendit->handleCallback($request->all(), $token);
    }
}