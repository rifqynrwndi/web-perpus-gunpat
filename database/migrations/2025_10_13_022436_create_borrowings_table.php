<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('borrowings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('book_id', 10);
            $table->foreign('book_id')->references('id')->on('books')->cascadeOnDelete();
            $table->enum('status', ['requested', 'borrowed', 'returned', 'rejected', 'cancelled'])->default('requested');
            $table->date('borrow_date')->nullable();
            $table->date('return_date')->nullable();
            $table->integer('fine_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowings');
    }
};
