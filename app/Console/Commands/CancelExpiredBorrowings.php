<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Borrowing;
use App\Models\Setting;

class CancelExpiredBorrowings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'borrowings:cancel-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Batalkan otomatis peminjaman yang belum dikonfirmasi admin dalam waktu tertentu';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $hours = (int) Setting::get('auto_cancel_hours', 24);

        $expired = Borrowing::with('book')
            ->where('status', 'requested')
            ->where('created_at', '<', now()->subHours($hours))
            ->get();

        if ($expired->isEmpty()) {
            $this->info('Tidak ada peminjaman yang perlu dibatalkan.');
            return 0;
        }

        foreach ($expired as $borrowing) {
            if ($borrowing->book) {
                $borrowing->book->increment('available_copies', 1);
            }

            $borrowing->update(['status' => 'cancelled']);
        }

        $this->info("{$expired->count()} peminjaman kedaluwarsa telah dibatalkan otomatis.");
        return 0;
    }
}
