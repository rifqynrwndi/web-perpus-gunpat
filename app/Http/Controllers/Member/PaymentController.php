<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Payment;
use App\Services\XenditService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function payFine($borrowingId, XenditService $xendit)
    {
        $borrowing = Borrowing::with('book')->findOrFail($borrowingId);
        $user = auth()->user();

        if ($borrowing->fine_amount <= 0 || $borrowing->is_fine_paid) {
            return back()->with('error', 'Tidak ada denda yang perlu dibayar.');
        }

        // Buat invoice di Xendit
        $invoice = $xendit->createInvoice($borrowing->fine_amount, $user, $borrowing);

        // Simpan ke DB
        Payment::create([
            'user_id' => $user->id,
            'borrowing_id' => $borrowing->id,
            'external_id' => $invoice['external_id'],
            'gateway' => 'xendit',
            'reference_id' => $invoice['id'],
            'amount' => $invoice['amount'],
            'status' => 'pending',
            'metadata' => json_encode($invoice),
        ]);

        return response()->json([
            'redirect_url' => $invoice['invoice_url']
        ]);
    }

    // public function payFine($borrowingId, XenditService $xendit)
    // {
    //     $borrowing = Borrowing::findOrFail($borrowingId);
    //     $user = auth()->user();

    //     if ($borrowing->fine_amount <= 0) {
    //         return back()->with('error', 'Tidak ada denda yang perlu dibayar.');
    //     }

    //     try {
    //         $result = $xendit->createVirtualAccount(
    //             $borrowing->fine_amount,
    //             $user,
    //             $borrowing
    //         );

    //         return redirect()
    //             ->back()
    //             ->with('success', 'Virtual Account berhasil dibuat. Silakan lakukan pembayaran sebelum kadaluarsa.')
    //             ->with('va', [
    //                 'bank' => $result['bank_code'] ?? '-',
    //                 'account_number' => $result['account_number'] ?? '-',
    //                 'amount' => $result['expected_amount'] ?? $borrowing->fine_amount,
    //                 'expiry_date' => $result['expiration_date'] ?? null,
    //             ]);
    //     } catch (\Exception $e) {
    //         return back()->with('error', 'Gagal membuat Virtual Account: ' . $e->getMessage());
    //     }
    // }
}
