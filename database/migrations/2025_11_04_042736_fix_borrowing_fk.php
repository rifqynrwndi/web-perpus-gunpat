<?php
// database/migrations/2025_11_03_000000_fix_borrowings_fk.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('borrowings', function (Blueprint $table) {
            $table->dropForeign(['book_id']);
            $table->foreign('book_id')
                ->references('id')
                ->on('books')
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('borrowings', function (Blueprint $table) {
            $table->dropForeign(['book_id']);
        });
    }
};
