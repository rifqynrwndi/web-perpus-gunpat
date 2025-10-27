<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Models\Payment;
use App\Models\Borrowing;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class XenditService
{
    protected $secretKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->secretKey = config('services.xendit.secret_key');
        $this->baseUrl = config('services.xendit.api_base', 'https://api.xendit.co');
    }

    /**
     * Membuat Invoice checkout (redirect ke Xendit payment page)
     */
    public function createInvoice($amount, $user, $borrowing)
    {
        $externalId = 'fine_' . $borrowing->id . '_' . Str::random(6);

        $response = Http::withBasicAuth($this->secretKey, '')
            ->post($this->baseUrl . '/v2/invoices', [
                'external_id' => $externalId,
                'amount' => $amount,
                'payer_email' => $user->email,
                'description' => 'Pembayaran denda buku: ' . $borrowing->book->title,
                'success_redirect_url' => env('XENDIT_SUCCESS_URL'),
                'failure_redirect_url' => env('XENDIT_FAILURE_URL'),
                'currency' => 'IDR',
            ]);

        if ($response->failed()) {
            Log::error('Gagal membuat invoice Xendit', ['body' => $response->body()]);
            throw new \Exception('Gagal membuat invoice Xendit.');
        }

        return $response->json();
    }

    /**
     * (Opsional) Virtual Account manual, masih bisa dipakai juga
     */
    // public function createVirtualAccount($amount, $user, $borrowing)
    // {
    //     $externalId = 'fine_' . $borrowing->id . '_' . Str::random(6);

    //     $payment = Payment::create([
    //         'user_id' => $user->id,
    //         'borrowing_id' => $borrowing->id,
    //         'external_id' => $externalId,
    //         'amount' => $amount,
    //         'status' => 'pending',
    //     ]);

    //     $response = Http::withBasicAuth($this->secretKey, '')
    //         ->post("{$this->baseUrl}/callback_virtual_accounts", [
    //             'external_id' => $externalId,
    //             'bank_code' => 'BCA',
    //             'name' => $user->name,
    //             'expected_amount' => $amount,
    //             'is_closed' => true,
    //         ]);

    //     if ($response->failed()) {
    //         $payment->update(['status' => 'failed']);
    //         throw new \Exception('Gagal membuat VA: ' . $response->body());
    //     }

    //     $data = $response->json();

    //     $payment->update([
    //         'reference_id' => $data['id'] ?? null,
    //         'metadata' => $data,
    //     ]);

    //     return $data;
    // }

    /**
     * Handle callback untuk VA & Invoice
     */
    public function handleCallback($payload, $token)
    {
        if ($token !== config('services.xendit.callback_token')) {
            \Log::warning('Invalid callback token', ['received' => $token]);
            abort(403, 'Invalid callback token');
        }

        \Log::info('Callback diterima dari Xendit', $payload);

        $externalId = $payload['external_id'] ?? null;
        if (!$externalId) {
            abort(400, 'Missing external_id');
        }

        $payment = \App\Models\Payment::where('external_id', $externalId)->first();
        if (!$payment) {
            \Log::warning('Payment tidak ditemukan', ['external_id' => $externalId]);
            abort(404, 'Payment not found');
        }

        $status = strtoupper($payload['status'] ?? 'PENDING');

        if (in_array($status, ['PAID', 'SETTLED'])) {
            $payment->update([
                'status' => 'paid',
                'metadata' => $payload,
            ]);

            // Update borrowing
            $borrowing = $payment->borrowing;
            if ($borrowing) {
                $borrowing->update(['is_fine_paid' => 1]);
            }

            \Log::info('Pembayaran berhasil diperbarui', ['external_id' => $externalId]);
        } elseif (in_array($status, ['EXPIRED', 'FAILED'])) {
            $payment->update(['status' => 'failed']);
            \Log::info('Pembayaran gagal/expired', ['external_id' => $externalId]);
        }

        return response()->json(['message' => 'Callback processed']);
    }
}
